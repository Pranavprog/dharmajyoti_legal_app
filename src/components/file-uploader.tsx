'use client';

import React from 'react';
import { UploadCloud } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Label } from './ui/label';
import { cn } from '@/lib/utils';
import { useTranslations } from '@/hooks/use-translations';
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
  const t = useTranslations();
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
          title: t.toast.unsupportedFile,
          description: t.toast.unsupportedFileDesc,
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
          <h3 className="font-semibold">{t.fileUploader.title}</h3>
          <p className="text-sm text-muted-foreground">{t.fileUploader.description}</p>
          <Label
              htmlFor="file-upload"
              className={cn("flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-card hover:bg-secondary transition-colors", disabled && "pointer-events-none")}
          >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <UploadCloud className="w-8 h-8 mb-3 text-muted-foreground" />
                  <p className="mb-2 text-sm text-muted-foreground">
                      <span className="font-semibold">{t.fileUploader.clickToUpload}</span> {t.fileUploader.dragAndDrop}
                  </p>
                  <p className="text-xs text-muted-foreground">{t.fileUploader.fileTypes}</p>
              </div>
              <Input id="file-upload" ref={fileInputRef} type="file" className="hidden" onChange={handleFileChange} accept=".txt,.pdf" disabled={disabled} />
          </Label>
      </div>
      <AlertDialog open={isPdfAlertOpen} onOpenChange={setIsPdfAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t.pdfAlert.title}</AlertDialogTitle>
            <AlertDialogDescription>
              {t.pdfAlert.description}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={handlePdfConfirm}>
              {t.pdfAlert.confirm}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
