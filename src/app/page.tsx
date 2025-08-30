'use client';

import { useState, useCallback, useEffect } from 'react';
import { Bot, Settings } from 'lucide-react';
import { useVoiceAgent } from '@/hooks/useVoiceAgent';
import { useTasks } from '@/hooks/useTasks';
import { ChatHistory } from '@/components/ChatHistory';
import { MicrophoneButton } from '@/components/MicrophoneButton';
import { TaskList } from '@/components/TaskList';
import { PersonaSelector } from '@/components/PersonaSelector';
import { StatusIndicator } from '@/components/StatusIndicator';
import { Button } from '@/components/ui/button';
import type { ChatMessage, Persona } from '@/types';
import { PERSONAS } from '@/types';

export default function HomePage() {
  const [selectedPersona, setSelectedPersona] = useState<Persona>(PERSONAS[0]);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [showSidebar, setShowSidebar] = useState(true);

  const {
    tasks,
    addTask,
    toggleTask,
    removeTask,
    clearCompleted,
    completedCount,
    pendingCount,
  } = useTasks();

  const {
    status,
    error,
    isGuardrailTripped,
    connect,
    disconnect,
    interrupt,
    sendMessage,
  } = useVoiceAgent({
    persona: selectedPersona,
    onTaskAdded: addTask,
    onHistoryUpdate: setChatMessages,
  });

  const handlePersonaChange = useCallback((persona: Persona) => {
    // Disconnect current session when changing persona
    if (status === 'connected') {
      disconnect();
    }
    setSelectedPersona(persona);
  }, [status, disconnect]);

  // Load saved persona from localStorage
  useEffect(() => {
    const savedPersonaId = localStorage.getItem('ai-companion-persona');
    if (savedPersonaId) {
      const savedPersona = PERSONAS.find(p => p.id === savedPersonaId);
      if (savedPersona) {
        setSelectedPersona(savedPersona);
      }
    }
  }, []);

  // Save persona to localStorage when changed
  useEffect(() => {
    localStorage.setItem('ai-companion-persona', selectedPersona.id);
  }, [selectedPersona]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
              <Bot className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">AI Mental Health Companion</h1>
              <p className="text-sm text-gray-500">Your intelligent wellness assistant</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <StatusIndicator
              status={status}
              isGuardrailTripped={isGuardrailTripped}
              error={error}
            />
            
            <Button
              onClick={() => setShowSidebar(!showSidebar)}
              variant="outline"
              size="sm"
              className="lg:hidden"
            >
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto flex h-[calc(100vh-80px)]">
        {/* Chat Area */}
        <div className="flex-1 flex flex-col bg-white">
          {/* Persona Selector */}
          <div className="p-4 border-b border-gray-200">
            <PersonaSelector
              selectedPersona={selectedPersona}
              onPersonaChange={handlePersonaChange}
              disabled={status === 'connected' || status === 'connecting'}
            />
          </div>

          {/* Chat History */}
          <div className="flex-1 overflow-hidden">
            <ChatHistory messages={chatMessages} />
          </div>

          {/* Controls */}
          <div className="border-t border-gray-200 p-6 bg-gray-50">
            <div className="flex flex-col items-center space-y-4">
              <MicrophoneButton
                status={status}
                onConnect={connect}
                onDisconnect={disconnect}
                onStop={interrupt}
                error={error}
              />
              
              {/* Usage hint */}
              {status === 'disconnected' && chatMessages.length === 0 && (
                <div className="text-center text-sm text-gray-500 max-w-md">
                  <p className="mb-2">Click the microphone button to start talking with your AI companion.</p>
                  <p className="text-xs">
                    Try saying: "Add buy groceries to my tasks" or "What's the weather in Nairobi?"
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <aside className={`
          ${showSidebar ? 'w-80' : 'w-0'} 
          transition-all duration-300 overflow-hidden
          border-l border-gray-200 bg-gray-50
          lg:w-80 lg:block
        `}>
          <div className="h-full p-4">
            <TaskList
              tasks={tasks}
              onToggleTask={toggleTask}
              onRemoveTask={removeTask}
              onClearCompleted={clearCompleted}
              completedCount={completedCount}
              pendingCount={pendingCount}
              className="h-full"
            />
          </div>
        </aside>
      </div>
    </div>
  );
}