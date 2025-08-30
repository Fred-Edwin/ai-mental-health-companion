import { Mic, MicOff, Square, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { SessionStatus } from '@/types';

interface MicrophoneButtonProps {
  status: SessionStatus;
  onConnect: () => void;
  onDisconnect: () => void;
  onStop: () => void;
  error?: string | null;
  className?: string;
}

export function MicrophoneButton({
  status,
  onConnect,
  onDisconnect,
  onStop,
  error,
  className
}: MicrophoneButtonProps) {
  const handleClick = () => {
    switch (status) {
      case 'disconnected':
      case 'error':
        onConnect();
        break;
      case 'connected':
        onDisconnect();
        break;
      case 'connecting':
        // Do nothing while connecting
        break;
    }
  };

  const getButtonContent = () => {
    switch (status) {
      case 'connecting':
        return (
          <>
            <Loader2 className="h-6 w-6 animate-spin" />
            <span className="ml-2">Connecting...</span>
          </>
        );
      case 'connected':
        return (
          <>
            <Mic className="h-6 w-6" />
            <span className="ml-2">Connected</span>
          </>
        );
      case 'error':
        return (
          <>
            <MicOff className="h-6 w-6" />
            <span className="ml-2">Connect</span>
          </>
        );
      default:
        return (
          <>
            <MicOff className="h-6 w-6" />
            <span className="ml-2">Connect</span>
          </>
        );
    }
  };

  const getButtonVariant = () => {
    switch (status) {
      case 'connected':
        return 'default';
      case 'error':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  return (
    <div className={cn("flex flex-col items-center space-y-2", className)}>
      <div className="flex space-x-2">
        <Button
          onClick={handleClick}
          disabled={status === 'connecting'}
          variant={getButtonVariant()}
          size="lg"
          className={cn(
            "transition-all duration-200",
            status === 'connected' && "bg-green-600 hover:bg-green-700",
            status === 'connecting' && "cursor-not-allowed"
          )}
          aria-label={`Microphone ${status}`}
        >
          {getButtonContent()}
        </Button>

        {status === 'connected' && (
          <Button
            onClick={onStop}
            variant="outline"
            size="lg"
            className="transition-all duration-200"
            aria-label="Stop current response"
          >
            <Square className="h-4 w-4" />
            <span className="ml-2">Stop</span>
          </Button>
        )}
      </div>

      {/* Status indicator */}
      <div className="text-sm text-center min-h-[20px]">
        {status === 'connected' && (
          <div className="flex items-center justify-center text-green-600">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2" />
            Ready to listen
          </div>
        )}
        {status === 'connecting' && (
          <span className="text-gray-600">Establishing connection...</span>
        )}
        {error && (
          <span className="text-red-600 text-xs">{error}</span>
        )}
      </div>
    </div>
  );
}