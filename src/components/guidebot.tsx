
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { MessageSquareQuote, Bot, Search, ShieldCheck, HelpCircle, Upload } from 'lucide-react';
import { useTranslations } from '@/hooks/use-translations';
import { ScrollArea } from './ui/scroll-area';
import Image from 'next/image';

export function Guidebot() {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations();

  const sections = [
    {
      id: 'upload',
      title: t.home.features.upload.title,
      icon: <Upload className="h-5 w-5 mr-3 text-primary" />,
      content: <p>{t.guidebot.upload}</p>,
    },
    {
      id: 'lawyer',
      title: t.home.features.lawyer.title,
      icon: <Bot className="h-5 w-5 mr-3 text-primary" />,
      content: <p>{t.guidebot.lawyer}</p>,
    },
    {
      id: 'future',
      title: t.home.features.future.title,
      icon: <Search className="h-5 w-5 mr-3 text-primary" />,
      content: <p>{t.guidebot.future}</p>,
    },
    {
      id: 'trap',
      title: t.home.features.trap.title,
      icon: <ShieldCheck className="h-5 w-5 mr-3 text-primary" />,
      content: <p>{t.guidebot.trap}</p>,
    },
    {
        id: 'faq',
        title: t.guidebot.faq.title,
        icon: <HelpCircle className="h-5 w-5 mr-3 text-primary" />,
        content: (
            <Accordion type="single" collapsible className="w-full">
              {t.guidebot.faq.questions.map((faq, index) => (
                <AccordionItem key={index} value={`faq-${index}`}>
                  <AccordionTrigger className="text-sm text-left">{faq.question}</AccordionTrigger>
                  <AccordionContent className="whitespace-pre-line text-sm text-foreground/70">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
        )
    }
  ];

  return (
    <>
      <Button
        className="fixed bottom-6 right-6 h-16 w-16 rounded-full shadow-2xl z-50 glitter-button"
        onClick={() => setIsOpen(true)}
        aria-label="Open Guide"
      >
        <MessageSquareQuote className="h-8 w-8" />
      </Button>

      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent className="w-full sm:max-w-md flex flex-col">
          <SheetHeader className="text-left mb-6">
            <SheetTitle className="text-2xl flex items-center">
                <Bot className="h-7 w-7 mr-3 text-primary" />
                {t.guidebot.title}
            </SheetTitle>
            <SheetDescription>
              {t.guidebot.description}
            </SheetDescription>
          </SheetHeader>
          <ScrollArea className="flex-1 pr-6">
            <Accordion type="single" collapsible className="w-full">
                {sections.map((section) => (
                <AccordionItem key={section.id} value={section.id}>
                    <AccordionTrigger className="text-lg font-medium hover:no-underline">
                        <div className="flex items-center">
                            {section.icon}
                            {section.title}
                        </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-base text-foreground/80 pl-4 border-l-2 border-primary/20 ml-4">
                    {section.content}
                    </AccordionContent>
                </AccordionItem>
                ))}
            </Accordion>
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </>
  );
}
