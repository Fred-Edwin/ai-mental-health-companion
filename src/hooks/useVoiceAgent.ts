import { useState, useCallback, useRef, useEffect } from 'react';
import { RealtimeAgent, RealtimeSession, tool, RealtimeOutputGuardrail } from '@openai/agents/realtime';
import { z } from 'zod';
import type { SessionStatus, Task, Persona, ChatMessage, WeatherData, EphemeralKeyResponse, MoodEntry, BreathingExercise, JournalPrompt, CrisisResource } from '@/types';

interface UseVoiceAgentProps {
  persona: Persona;
  onTaskAdded: (task: Task) => void;
  onHistoryUpdate: (messages: ChatMessage[]) => void;
}

export function useVoiceAgent({ persona, onTaskAdded, onHistoryUpdate }: UseVoiceAgentProps) {
  const [status, setStatus] = useState<SessionStatus>('disconnected');
  const [error, setError] = useState<string | null>(null);
  const [isGuardrailTripped, setIsGuardrailTripped] = useState(false);
  
  const sessionRef = useRef<RealtimeSession | null>(null);
  const agentRef = useRef<RealtimeAgent | null>(null);

  // Create tools
  const addTaskTool = tool({
    name: 'add_task',
    description: 'Add a task to the user\'s task list',
    parameters: z.object({
      task: z.string().describe('The task to add'),
      priority: z.enum(['low', 'medium', 'high']).default('medium').describe('Task priority level')
    }),
    async execute({ task, priority }) {
      const newTask: Task = {
        id: Date.now().toString(),
        text: task,
        priority,
        completed: false,
        createdAt: new Date()
      };
      
      onTaskAdded(newTask);
      return `I've added "${task}" to your task list with ${priority} priority.`;
    },
  });

  const weatherTool = tool({
    name: 'get_weather',
    description: 'Get current weather information for a city',
    parameters: z.object({
      city: z.string().describe('The city to get weather for')
    }),
    async execute({ city }) {
      try {
        const response = await fetch(`/api/weather?city=${encodeURIComponent(city)}`);
        if (!response.ok) {
          throw new Error('Weather data not available');
        }
        const weatherData: WeatherData = await response.json();
        return weatherData.message;
      } catch (error) {
        return `Sorry, I couldn't get weather information for ${city} right now.`;
      }
    },
  });

  // Wellness Therapy Tools
  const moodTrackerTool = tool({
    name: 'track_mood',
    description: 'Help users track their emotional state and mood patterns',
    parameters: z.object({
      mood: z.enum(['very_low', 'low', 'neutral', 'good', 'excellent']).describe('Current mood level'),
      energy: z.number().min(1).max(10).describe('Energy level from 1-10'),
      anxiety: z.number().min(1).max(10).describe('Anxiety level from 1-10'),
      notes: z.string().nullable().optional().describe('Optional notes about current feelings'),
      triggers: z.array(z.string()).nullable().optional().describe('Optional list of mood triggers')
    }),
    async execute({ mood, energy, anxiety, notes, triggers }) {
      const moodEntry: MoodEntry = {
        id: Date.now().toString(),
        mood,
        energy,
        anxiety,
        notes,
        triggers,
        timestamp: new Date()
      };
      
      // Store in localStorage for persistence
      const existingMoods = JSON.parse(localStorage.getItem('mood_entries') || '[]');
      existingMoods.push(moodEntry);
      localStorage.setItem('mood_entries', JSON.stringify(existingMoods));
      
      let response = `I've recorded your mood as ${mood} with energy level ${energy}/10 and anxiety level ${anxiety}/10.`;
      if (notes) response += ` Thank you for sharing: "${notes}"`;
      if (triggers && triggers.length > 0) response += ` I've noted these triggers: ${triggers.join(', ')}.`;
      
      response += ' How does it feel to acknowledge these feelings?';
      return response;
    }
  });

  const breathingExerciseTool = tool({
    name: 'breathing_exercise',
    description: 'Guide users through calming breathing exercises',
    parameters: z.object({
      type: z.enum(['4-7-8', 'box', 'simple', 'anxiety_relief']).describe('Type of breathing exercise'),
      duration: z.number().nullable().optional().default(60).describe('Exercise duration in seconds')
    }),
    async execute({ type, duration = 60 }) {
      const exercises: Record<string, BreathingExercise> = {
        '4-7-8': {
          name: '4-7-8 Breathing',
          description: 'A calming technique that helps reduce anxiety and promote relaxation',
          duration: duration,
          pattern: { inhale: 4, hold: 7, exhale: 8 },
          benefits: ['Reduces anxiety', 'Promotes sleep', 'Calms nervous system']
        },
        'box': {
          name: 'Box Breathing',
          description: 'Equal count breathing used by Navy SEALs for focus and calm',
          duration: duration,
          pattern: { inhale: 4, hold: 4, exhale: 4, pause: 4 },
          benefits: ['Increases focus', 'Reduces stress', 'Balances nervous system']
        },
        'simple': {
          name: 'Simple Deep Breathing',
          description: 'Basic deep breathing for instant calm',
          duration: duration,
          pattern: { inhale: 4, exhale: 6 },
          benefits: ['Quick stress relief', 'Easy to do anywhere', 'Lowers heart rate']
        },
        'anxiety_relief': {
          name: 'Anxiety Relief Breathing',
          description: 'Longer exhales to activate the parasympathetic nervous system',
          duration: duration,
          pattern: { inhale: 4, exhale: 8 },
          benefits: ['Reduces anxiety', 'Activates relaxation response', 'Grounds you in the present']
        }
      };

      const exercise = exercises[type];
      let instructions = `Let's do the ${exercise.name}. ${exercise.description}\n\n`;
      instructions += `For the next ${duration} seconds, we'll breathe together:\n`;
      instructions += `• Inhale for ${exercise.pattern.inhale} counts\n`;
      if (exercise.pattern.hold) instructions += `• Hold for ${exercise.pattern.hold} counts\n`;
      instructions += `• Exhale for ${exercise.pattern.exhale} counts\n`;
      if (exercise.pattern.pause) instructions += `• Pause for ${exercise.pattern.pause} counts\n`;
      instructions += `\nLet's begin. Find a comfortable position and close your eyes if you'd like. I'll guide you through each breath...`;

      return instructions;
    }
  });

  const journalPromptTool = tool({
    name: 'journal_prompt',
    description: 'Provide therapeutic journal prompts for self-reflection',
    parameters: z.object({
      category: z.enum(['reflection', 'gratitude', 'goals', 'emotions', 'growth']).describe('Type of journaling focus'),
      difficulty: z.enum(['easy', 'moderate', 'deep']).nullable().optional().default('moderate').describe('Depth of reflection')
    }),
    async execute({ category, difficulty = 'moderate' }) {
      const prompts: Record<string, Record<string, JournalPrompt[]>> = {
        reflection: {
          easy: [
            { id: '1', prompt: 'What went well for you today?', category: 'reflection', difficulty: 'easy' },
            { id: '2', prompt: 'What made you smile recently?', category: 'reflection', difficulty: 'easy' },
            { id: '3', prompt: 'What are you looking forward to?', category: 'reflection', difficulty: 'easy' }
          ],
          moderate: [
            { id: '4', prompt: 'What patterns do you notice in your daily habits? Which ones serve you well?', category: 'reflection', difficulty: 'moderate' },
            { id: '5', prompt: 'When did you feel most like yourself this week?', category: 'reflection', difficulty: 'moderate' },
            { id: '6', prompt: 'What would you tell your younger self about handling difficult emotions?', category: 'reflection', difficulty: 'moderate' }
          ],
          deep: [
            { id: '7', prompt: 'What beliefs about yourself are you ready to question or release?', category: 'reflection', difficulty: 'deep' },
            { id: '8', prompt: 'How has your relationship with yourself changed over the past year?', category: 'reflection', difficulty: 'deep' },
            { id: '9', prompt: 'What would your life look like if you fully trusted yourself?', category: 'reflection', difficulty: 'deep' }
          ]
        },
        gratitude: {
          easy: [
            { id: '10', prompt: 'List three small things you\'re grateful for right now.', category: 'gratitude', difficulty: 'easy' },
            { id: '11', prompt: 'Who in your life are you most thankful for and why?', category: 'gratitude', difficulty: 'easy' }
          ],
          moderate: [
            { id: '12', prompt: 'What challenge from your past are you now grateful for experiencing?', category: 'gratitude', difficulty: 'moderate' },
            { id: '13', prompt: 'How has someone\'s kindness changed your day recently?', category: 'gratitude', difficulty: 'moderate' }
          ],
          deep: [
            { id: '14', prompt: 'What aspects of your struggles have taught you the most about yourself?', category: 'gratitude', difficulty: 'deep' }
          ]
        },
        emotions: {
          easy: [
            { id: '15', prompt: 'What emotion are you feeling most strongly right now?', category: 'emotions', difficulty: 'easy' },
            { id: '16', prompt: 'What helps you feel calm when you\'re stressed?', category: 'emotions', difficulty: 'easy' }
          ],
          moderate: [
            { id: '17', prompt: 'What emotions do you find most difficult to sit with, and why?', category: 'emotions', difficulty: 'moderate' },
            { id: '18', prompt: 'How do your emotions show up in your body?', category: 'emotions', difficulty: 'moderate' }
          ],
          deep: [
            { id: '19', prompt: 'What would happen if you allowed yourself to feel your emotions fully without trying to fix or change them?', category: 'emotions', difficulty: 'deep' }
          ]
        }
      };

      const categoryPrompts = prompts[category]?.[difficulty] || prompts.reflection.moderate;
      const randomPrompt = categoryPrompts[Math.floor(Math.random() * categoryPrompts.length)];
      
      return `Here's a ${difficulty} ${category} prompt for you:\n\n"${randomPrompt.prompt}"\n\nTake your time with this. There's no right or wrong answer. What comes up for you when you read this?`;
    }
  });

  const crisisResourcesTool = tool({
    name: 'crisis_resources',
    description: 'Provide immediate crisis support resources and emergency contacts',
    parameters: z.object({
      urgency: z.enum(['immediate', 'support', 'information']).describe('Level of crisis support needed'),
      location: z.string().nullable().optional().describe('User location for local resources')
    }),
    async execute({ urgency, location }) {
      const resources: CrisisResource[] = [
        {
          name: 'National Suicide Prevention Lifeline',
          type: 'hotline',
          contact: '988',
          description: '24/7 free and confidential support for people in distress',
          availability: '24/7',
          urgent: true
        },
        {
          name: 'Crisis Text Line',
          type: 'text',
          contact: 'Text HOME to 741741',
          description: '24/7 crisis support via text message',
          availability: '24/7',
          urgent: true
        },
        {
          name: 'SAMHSA National Helpline',
          type: 'hotline',
          contact: '1-800-662-HELP (4357)',
          description: 'Treatment referral and information service for mental health and substance use disorders',
          availability: '24/7',
          urgent: false
        },
        {
          name: 'Warmline Directory',
          type: 'website',
          contact: 'warmline.org',
          description: 'Non-crisis emotional support lines',
          availability: 'Varies',
          urgent: false
        }
      ];

      let response = '';
      
      if (urgency === 'immediate') {
        response = '🚨 If you are in immediate danger, please call 911 or go to your nearest emergency room.\n\n';
        response += 'For immediate crisis support:\n\n';
        resources.filter(r => r.urgent).forEach(resource => {
          response += `• **${resource.name}**: ${resource.contact}\n  ${resource.description}\n\n`;
        });
        response += 'You are not alone. These trained counselors are here to help you right now.';
      } else {
        response = 'Here are some helpful mental health resources:\n\n';
        resources.forEach(resource => {
          response += `• **${resource.name}**: ${resource.contact}\n  ${resource.description}\n  Available: ${resource.availability}\n\n`;
        });
        response += 'Remember: Seeking help is a sign of strength, not weakness.';
      }

      return response;
    }
  });

  // Create guardrails
  const bannedWordsGuardrail: RealtimeOutputGuardrail = {
    name: 'Banned Words Filter',
    async execute({ agentOutput }) {
      const bannedWords = ['inappropriate', 'banned', 'forbidden']; // Example banned words
      const containsBannedWord = bannedWords.some(word => 
        agentOutput.toLowerCase().includes(word.toLowerCase())
      );
      
      return {
        tripwireTriggered: containsBannedWord,
        outputInfo: { containsBannedWord, agentOutput: agentOutput.substring(0, 50) }
      };
    },
  };

  // Create agent and session
  const createAgent = useCallback(() => {
    // Base tools available to all personas
    const baseTools = [addTaskTool, weatherTool];
    
    // Add wellness tools for the wellness therapist persona
    const tools = persona.id === 'wellness_therapist' 
      ? [...baseTools, moodTrackerTool, breathingExerciseTool, journalPromptTool, crisisResourcesTool]
      : baseTools;

    return new RealtimeAgent({
      name: persona.name,
      instructions: persona.instructions,
      tools,
    });
  }, [persona, addTaskTool, weatherTool, moodTrackerTool, breathingExerciseTool, journalPromptTool, crisisResourcesTool]);

  const createSession = useCallback((agent: RealtimeAgent) => {
    return new RealtimeSession(agent, {
      model: 'gpt-realtime',
      outputGuardrails: [bannedWordsGuardrail],
      outputGuardrailSettings: {
        debounceTextLength: 100,
      },
      config: {
        inputAudioFormat: 'pcm16',
        outputAudioFormat: 'pcm16',
        inputAudioTranscription: {
          model: 'whisper-1',
        },
        turnDetection: {
          type: 'server_vad',
          threshold: 0.5,
          prefixPaddingMs: 300,
          silenceDurationMs: 200,
        },
      },
    });
  }, []);

  // Convert session history to chat messages
  const convertHistoryToChatMessages = useCallback((history: any[]): ChatMessage[] => {
    return history
      .filter(item => item.type === 'message' && (item.role === 'user' || item.role === 'assistant'))
      .map((item, index) => ({
        id: item.id || `msg-${index}`,
        role: item.role as 'user' | 'assistant',
        content: item.content?.[0]?.transcript || item.content?.[0]?.text || 'Audio message',
        timestamp: new Date(item.createdAt || Date.now()),
        type: item.content?.[0]?.type === 'input_text' ? 'text' : 'audio'
      }));
  }, []);

  // Connect to voice session
  const connect = useCallback(async () => {
    if (status === 'connecting' || status === 'connected') {
      return;
    }

    setStatus('connecting');
    setError(null);

    try {
      // Get ephemeral key
      const keyResponse = await fetch('/api/auth/ephemeral', {
        method: 'POST',
      });

      if (!keyResponse.ok) {
        throw new Error('Failed to get ephemeral key');
      }

      const keyData = await keyResponse.json();
      console.log('Received key data:', keyData);
      
      const clientSecret = keyData.client_secret;
      
      if (!clientSecret) {
        throw new Error('No client secret received from API');
      }
      
      console.log('Using client secret:', clientSecret.substring(0, 20) + '...');

      // Create new agent and session
      const agent = createAgent();
      const session = createSession(agent);

      // Set up event listeners
      session.on('history_updated', (history) => {
        const messages = convertHistoryToChatMessages(history);
        onHistoryUpdate(messages);
      });

      session.on('guardrail_tripped', (context, agent, details) => {
        console.log('Guardrail tripped:', details);
        setIsGuardrailTripped(true);
        setTimeout(() => setIsGuardrailTripped(false), 3000);
      });

      session.on('audio_interrupted', () => {
        console.log('Audio interrupted');
      });

      session.on('error', (error) => {
        console.error('Session error:', error);
        setError('message' in error ? (error as any).message : 'Session error occurred');
        setStatus('error');
      });

      // Connect to the session using ephemeral client secret
      // Ensure we have a proper ephemeral key (starts with 'ek_')
      if (!clientSecret.startsWith('ek_')) {
        throw new Error(`Invalid ephemeral key format. Expected key starting with 'ek_', got: ${clientSecret.substring(0, 10)}...`);
      }

      await session.connect({ apiKey: clientSecret });

      sessionRef.current = session;
      agentRef.current = agent;
      
      // Log available methods for debugging
      console.log('Session methods:', Object.getOwnPropertyNames(Object.getPrototypeOf(session)));
      console.log('Transport methods:', session.transport ? Object.getOwnPropertyNames(Object.getPrototypeOf(session.transport)) : 'No transport');
      
      setStatus('connected');

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to connect';
      setError(errorMessage);
      setStatus('error');
      console.error('Connection error:', err);
    }
  }, [status, createAgent, createSession, convertHistoryToChatMessages, onHistoryUpdate]);

  // Disconnect from session
  const disconnect = useCallback(async () => {
    if (sessionRef.current) {
      try {
        // Try different possible disconnect methods
        const session = sessionRef.current as any; // Type assertion to avoid TS errors
        if (typeof session.disconnect === 'function') {
          await session.disconnect();
        } else if (typeof session.close === 'function') {
          await session.close();
        } else if (session.transport && typeof session.transport.disconnect === 'function') {
          await session.transport.disconnect();
        } else if (session.transport && typeof session.transport.close === 'function') {
          await session.transport.close();
        } else {
          console.log('No disconnect method found, setting session to null');
        }
      } catch (err) {
        console.error('Error disconnecting:', err);
      }
      sessionRef.current = null;
      agentRef.current = null;
    }
    setStatus('disconnected');
    setError(null);
  }, []);

  // Interrupt current response
  const interrupt = useCallback(() => {
    if (sessionRef.current && status === 'connected') {
      sessionRef.current.interrupt();
    }
  }, [status]);

  // Send text message
  const sendMessage = useCallback((message: string) => {
    if (sessionRef.current && status === 'connected') {
      sessionRef.current.sendMessage(message);
    }
  }, [status]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      disconnect();
    };
  }, [disconnect]);

  return {
    status,
    error,
    isGuardrailTripped,
    connect,
    disconnect,
    interrupt,
    sendMessage,
    session: sessionRef.current,
  };
}