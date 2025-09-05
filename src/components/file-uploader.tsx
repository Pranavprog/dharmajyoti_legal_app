'use client';

import React from 'react';
import { UploadCloud } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Label } from './ui/label';
import { cn } from '@/lib/utils';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface FileUploaderProps {
  onFileLoad: (file: File) => void;
  disabled?: boolean;
}

export function FileUploader({ onFileLoad, disabled }: FileUploaderProps) {
  const { toast } = useToast();
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [isPdfAlertOpen, setIsPdfAlertOpen] = React.useState(false);
  const [pdfFile, setPdfFile] = React.useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type === 'application/pdf') {
        setPdfFile(file);
        setIsPdfAlertOpen(true);
      } else if (file.type.startsWith('text/')) {
        onFileLoad(file);
      } else {
        toast({
          variant: 'destructive',
          title: 'Unsupported File Type',
          description: 'Please upload a plain text (.txt) or PDF file.',
        });
      }
    }
    // Reset file input to allow re-uploading the same file
    if(fileInputRef.current) {
        fileInputRef.current.value = '';
    }
  };
  
  const handlePdfConfirm = () => {
    if (pdfFile) {
        onFileLoad(pdfFile);
    }
    setIsPdfAlertOpen(false);
    setPdfFile(null);
  }

  return (
    <>
      <div className={cn("flex flex-col gap-2", disabled && "cursor-not-allowed opacity-50")}>
          <h3 className="font-semibold">Upload Document</h3>
          <p className="text-sm text-muted-foreground">Upload a document (.txt, .pdf) to get started.</p>
          <Label
              htmlFor="file-upload"
              className={cn("flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-card hover:bg-secondary transition-colors", disabled && "pointer-events-none")}
          >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <UploadCloud className="w-8 h-8 mb-3 text-muted-foreground" />
                  <p className="mb-2 text-sm text-muted-foreground">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-muted-foreground">TXT or PDF files</p>
              </div>
              <Input id="file-upload" ref={fileInputRef} type="file" className="hidden" onChange={handleFileChange} accept=".txt,.pdf" disabled={disabled} />
          </Label>
      </div>
      <AlertDialog open={isPdfAlertOpen} onOpenChange={setIsPdfAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>PDF Processing Information</AlertDialogTitle>
            <AlertDialogDescription>
              PDF files are processed on the server to extract text, which may include using OCR for scanned documents. This can take a bit longer. By proceeding, you consent to this process. The file will be sent to the AI for analysis.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={handlePdfConfirm}>
              Got it
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
