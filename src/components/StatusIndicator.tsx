import { AlertTriangle, Shield, Wifi, WifiOff } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { SessionStatus } from '@/types';

interface StatusIndicatorProps {
  status: SessionStatus;
  isGuardrailTripped: boolean;
  error?: string | null;
  className?: string;
}

export function StatusIndicator({
  status,
  isGuardrailTripped,
  error,
  className
}: StatusIndicatorProps) {
  if (isGuardrailTripped) {
    return (
      <div className={cn(
        "flex items-center space-x-2 px-3 py-2 bg-yellow-50 border border-yellow-200 rounded-lg",
        className
      )}>
        <Shield className="h-4 w-4 text-yellow-600" />
        <span className="text-sm text-yellow-800">
          Safety filter activated
        </span>
      </div>
    );
  }

  if (error) {
    return (
      <div className={cn(
        "flex items-center space-x-2 px-3 py-2 bg-red-50 border border-red-200 rounded-lg",
        className
      )}>
        <AlertTriangle className="h-4 w-4 text-red-600" />
        <span className="text-sm text-red-800">{error}</span>
      </div>
    );
  }

  switch (status) {
    case 'connected':
      return (
        <div className={cn(
          "flex items-center space-x-2 px-3 py-2 bg-green-50 border border-green-200 rounded-lg",
          className
        )}>
          <Wifi className="h-4 w-4 text-green-600" />
          <span className="text-sm text-green-800">Connected</span>
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
        </div>
      );

    case 'connecting':
      return (
        <div className={cn(
          "flex items-center space-x-2 px-3 py-2 bg-blue-50 border border-blue-200 rounded-lg",
          className
        )}>
          <Wifi className="h-4 w-4 text-blue-600 animate-pulse" />
          <span className="text-sm text-blue-800">Connecting...</span>
        </div>
      );

    case 'disconnected':
      return (
        <div className={cn(
          "flex items-center space-x-2 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg",
          className
        )}>
          <WifiOff className="h-4 w-4 text-gray-600" />
          <span className="text-sm text-gray-800">Disconnected</span>
        </div>
      );

    default:
      return null;
  }
}