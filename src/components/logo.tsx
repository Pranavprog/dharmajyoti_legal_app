import { Scale } from 'lucide-react';

export function Logo() {
  return (
    <div className="flex items-center gap-2 py-2">
      <div className="bg-primary p-2 rounded-lg">
        <Scale className="h-6 w-6 text-primary-foreground" />
      </div>
      <h1 className="text-xl font-bold tracking-tight">DharmaJyoti</h1>
    </div>
  );
}
