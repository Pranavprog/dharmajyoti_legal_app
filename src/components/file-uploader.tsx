'use client';

import React from 'react';
import { UploadCloud } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Label } from './ui/label';
import { cn } from '@/lib/utils';

interface FileUploaderProps {
  onFileLoad: (content: string, name: string) => void;
  disabled?: boolean;
}

export function FileUploader({ onFileLoad, disabled }: FileUploaderProps) {
  const { toast } = useToast();
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // For now we only support text files for simplicity, as per implementation plan
      if (file.type.startsWith('text/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const text = e.target?.result as string;
          onFileLoad(text, file.name);
        };
        reader.readAsText(file);
      } else {
        toast({
          variant: 'destructive',
          title: 'Unsupported File Type',
          description: 'For this demo, please upload a plain text (.txt) file.',
        });
      }
    }
    // Reset file input to allow re-uploading the same file
    if(fileInputRef.current) {
        fileInputRef.current.value = '';
    }
  };

  return (
    <div className={cn("flex flex-col gap-2", disabled && "cursor-not-allowed opacity-50")}>
        <h3 className="font-semibold">Upload Document</h3>
        <p className="text-sm text-muted-foreground">Upload a document (.txt) to get started.</p>
        <Label
            htmlFor="file-upload"
            className={cn("flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-card hover:bg-secondary transition-colors", disabled && "pointer-events-none")}
        >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <UploadCloud className="w-8 h-8 mb-3 text-muted-foreground" />
                <p className="mb-2 text-sm text-muted-foreground">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-muted-foreground">TXT files only (demo)</p>
            </div>
            <Input id="file-upload" ref={fileInputRef} type="file" className="hidden" onChange={handleFileChange} accept=".txt" disabled={disabled} />
        </Label>
    </div>
  );
}
