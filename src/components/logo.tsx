
import Image from 'next/image';

export function Logo() {
  return (
    <div className="flex items-center gap-3">
      <Image src="https://picsum.photos/32/32" alt="DharmaJyoti Logo" width={32} height={32} data-ai-hint="logo scales" />
      <h1 className="text-xl font-bold tracking-tight text-foreground">DharmaJyoti</h1>
    </div>
  );
}
