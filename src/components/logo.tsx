
import Image from 'next/image';

export function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div className="bg-primary p-2 rounded-md shadow-md">
        <Image
            src="https://picsum.photos/24/24"
            alt="DharmaJyoti Logo"
            width={24}
            height={24}
            data-ai-hint="scales justice"
        />
      </div>
      <h1 className="text-xl font-bold tracking-tight text-foreground">DharmaJyoti</h1>
    </div>
  );
}
