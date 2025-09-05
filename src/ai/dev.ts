import { config } from 'dotenv';
config();

import '@/ai/flows/identify-document-type-and-purpose.ts';
import '@/ai/flows/list-pros-cons-consequences-of-action.ts';
import '@/ai/flows/assess-clause-and-provide-explanations.ts';
import '@/ai/flows/summarize-uploaded-document.ts';
import '@/ai/flows/interactive-legal-guidance.ts';
import '@/ai/flows/extract-document-text.ts';
import '@/ai/flows/spot-trap.ts';
import '@/ai/flows/text-to-speech.ts';
import '@/ai/flows/generate-future-scenarios.ts';
