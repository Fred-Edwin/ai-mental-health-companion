export interface Task {
  id: string;
  text: string;
  priority: 'low' | 'medium' | 'high';
  completed: boolean;
  createdAt: Date;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  type: 'text' | 'audio';
}

export interface WeatherData {
  city: string;
  temperature: number;
  description: string;
  humidity: number;
  message: string;
}

export interface EphemeralKeyResponse {
  clientSecret: string;
  expiresAt: number;
}

export type SessionStatus = 'disconnected' | 'connecting' | 'connected' | 'error';

export interface Persona {
  id: string;
  name: string;
  instructions: string;
  description: string;
}

export const PERSONAS: Persona[] = [
  {
    id: 'Therapy',
    name: 'Therapist',
    instructions: 'You are a compassionate therapist. Always listen actively, reflect back, and ask gentle questions. Avoid giving direct life advice — instead, guide the user to self-discovery.',
    description: 'Warm and conversational helper',
    
  },
  {
    id: 'productivity',
    name: 'Productivity Coach',
    instructions: 'You are a productivity-focused AI coach. Help users stay organized, manage tasks efficiently, and achieve their goals. Be encouraging but direct. Focus on actionable advice and time management.',
    description: 'Focused on getting things done'
  },
  {
    id: 'tutor',
    name: 'Learning Tutor',
    instructions: 'You are an educational AI tutor. Explain concepts clearly, ask clarifying questions, and adapt your teaching style to help users learn. Break down complex topics into digestible parts.',
    description: 'Patient teacher and explainer'
  }
];

