'use client';

import { useLanguage } from '@/context/language-context';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Languages } from 'lucide-react';
import { useTranslations } from '@/hooks/use-translations';

const languages = [
  { value: 'English', label: 'English' },
  { value: 'Spanish', label: 'Español' },
  { value: 'French', label: 'Français' },
  { value: 'German', label: 'Deutsch' },
  { value: 'Hindi', label: 'हिन्दी' },
  { value: 'Mandarin', label: '中文' },
  { value: 'Bengali', label: 'বাংলা' },
  { value: 'Gujarati', label: 'ગુજરાતી' },
  { value: 'Kannada', label: 'ಕನ್ನಡ' },
  { value: 'Malayalam', label: 'മലയാളം' },
  { value: 'Marathi', label: 'मराठी' },
  { value: 'Punjabi', label: 'ਪੰਜਾਬੀ' },
  { value: 'Tamil', label: 'தமிழ்' },
  { value: 'Telugu', label: 'తెలుగు' },
  { value: 'Urdu', label: 'اردو' },
];

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  const t = useTranslations();

  return (
    <div className="flex items-center gap-2">
      <Languages className="h-5 w-5 text-muted-foreground" />
      <Select value={language} onValueChange={setLanguage}>
        <SelectTrigger className="w-[120px]">
          <SelectValue placeholder={t.languageSwitcher.placeholder} />
        </SelectTrigger>
        <SelectContent>
          {languages.map((lang) => (
            <SelectItem key={lang.value} value={lang.value}>
              {lang.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
