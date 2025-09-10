
import Image from 'next/image';

export function Logo() {
  return (
    <div className="flex items-center gap-3">
      <Image src="https://i.postimg.cc/hjpVWXjj/Gemini-generated-image-7d0awu7d0awu7d0a-1-1.png" data-ai-hint="scales justice" alt="DharmaJyoti Logo" width={40} height={40} />
      <h1 className="text-2xl font-bold tracking-tight text-foreground">DharmaJyoti</h1>
    </div>
  );
}
