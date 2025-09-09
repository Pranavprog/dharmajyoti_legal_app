
import Image from 'next/image';

export function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div className="bg-primary p-2 rounded-md shadow-md w-10 h-10">
      </div>
      <h1 className="text-xl font-bold tracking-tight text-foreground">DharmaJyoti</h1>
    </div>
  );
}
