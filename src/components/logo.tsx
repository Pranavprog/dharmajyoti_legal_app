import { Scale } from 'lucide-react';

export function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div className="bg-primary p-2 rounded-md shadow-md">
        <Scale className="h-6 w-6 text-primary-foreground" />
      </div>
      <h1 className="text-xl font-bold tracking-tight text-foreground">DharmaJyoti</h1>
    </div>
  );
}
