
import Image from 'next/image';

export function Logo() {
  return (
    <div className="flex items-center gap-3">
      <Image src="https://storage.googleapis.com/studiostack-איικο-assets/user-provided-image-2b9a7f34-e408-4177-a8bf-1234567890ab.png" alt="DharmaJyoti Logo" width={32} height={32} />
      <h1 className="text-xl font-bold tracking-tight text-foreground">DharmaJyoti</h1>
    </div>
  );
}
