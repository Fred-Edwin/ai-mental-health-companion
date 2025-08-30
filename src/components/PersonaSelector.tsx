import { ChevronDown, User, Target, GraduationCap, Heart } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { Persona } from '@/types';
import { PERSONAS } from '@/types';

interface PersonaSelectorProps {
  selectedPersona: Persona;
  onPersonaChange: (persona: Persona) => void;
  disabled?: boolean;
  className?: string;
}

const PersonaIcons = {
  friendly: User,
  productivity: Target,
  tutor: GraduationCap,
  wellness_therapist: Heart,
};

export function PersonaSelector({
  selectedPersona,
  onPersonaChange,
  disabled = false,
  className
}: PersonaSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handlePersonaSelect = (persona: Persona) => {
    onPersonaChange(persona);
    setIsOpen(false);
  };

  const SelectedIcon = PersonaIcons[selectedPersona.id as keyof typeof PersonaIcons] || User;

  return (
    <div className={cn("relative", className)}>
      <Button
        onClick={() => setIsOpen(!isOpen)}
        disabled={disabled}
        variant="outline"
        className={cn(
          "w-full justify-between text-left h-auto py-3",
          disabled && "opacity-50 cursor-not-allowed"
        )}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
            <SelectedIcon className="h-4 w-4 text-blue-600" />
          </div>
          <div className="text-left">
            <div className="font-medium text-sm">{selectedPersona.name}</div>
            <div className="text-xs text-gray-500">{selectedPersona.description}</div>
          </div>
        </div>
        <ChevronDown className={cn(
          "h-4 w-4 transition-transform flex-shrink-0",
          isOpen && "transform rotate-180"
        )} />
      </Button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
          
          {/* Dropdown */}
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-20 max-h-60 overflow-auto">
            <div className="py-1" role="listbox">
              {PERSONAS.map((persona) => {
                const Icon = PersonaIcons[persona.id as keyof typeof PersonaIcons] || User;
                const isSelected = persona.id === selectedPersona.id;
                
                return (
                  <button
                    key={persona.id}
                    onClick={() => handlePersonaSelect(persona)}
                    className={cn(
                      "w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-center space-x-3",
                      isSelected && "bg-blue-50 text-blue-900"
                    )}
                    role="option"
                    aria-selected={isSelected}
                  >
                    <div className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
                      isSelected ? "bg-blue-200" : "bg-gray-100"
                    )}>
                      <Icon className={cn(
                        "h-4 w-4",
                        isSelected ? "text-blue-700" : "text-gray-600"
                      )} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm">{persona.name}</div>
                      <div className="text-xs text-gray-500 mt-0.5">{persona.description}</div>
                    </div>
                    {isSelected && (
                      <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}