import { Loader2 } from 'lucide-react';

export function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center p-16 animate-fade-in">
      <Loader2 className="w-12 h-12 animate-spin text-blue-400 mb-4" />
      <p className="text-slate-400 font-medium">Loading projects...</p>
    </div>
  );
}