// src/ai/flows/summarize-uploaded-document.ts
'use server';

/**
 * @fileOverview Summarizes an uploaded legal document into plain language while preserving its structure.
 *
 * - summarizeUploadedDocument - A function that handles the document summarization process.
 * - SummarizeUploadedDocumentInput - The input type for the summarizeUploadedDocument function.
 * - SummarizeUploadedDocumentOutput - The return type for the summarizeUploadedDocument function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeUploadedDocumentInputSchema = z.object({
  documentText: z
    .string()
    .describe('The text content of the legal document to summarize.'),
});
export type SummarizeUploadedDocumentInput = z.infer<typeof SummarizeUploadedDocumentInputSchema>;

const SummarizeUploadedDocumentOutputSchema = z.object({
  summary: z
    .string()
    .describe(
      'A clear, plain-language summary of the legal document, preserving the original structure.'
    ),
});
export type SummarizeUploadedDocumentOutput = z.infer<typeof SummarizeUploadedDocumentOutputSchema>;

export async function summarizeUploadedDocument(
  input: SummarizeUploadedDocumentInput
): Promise<SummarizeUploadedDocumentOutput> {
  return summarizeUploadedDocumentFlow(input);
}

const summarizeUploadedDocumentPrompt = ai.definePrompt({
  name: 'summarizeUploadedDocumentPrompt',
  input: {schema: SummarizeUploadedDocumentInputSchema},
  output: {schema: SummarizeUploadedDocumentOutputSchema},
  prompt: `You are an AI legal assistant. Summarize the following legal document into clear, plain language. Preserve the original structure (titles, sections, clauses) while simplifying legal or complex wording into clear, plain layman’s terms.\n\nDocument:\n{{{documentText}}}`,
});

const summarizeUploadedDocumentFlow = ai.defineFlow(
  {
    name: 'summarizeUploadedDocumentFlow',
    inputSchema: SummarizeUploadedDocumentInputSchema,
    outputSchema: SummarizeUploadedDocumentOutputSchema,
  },
  async input => {
    const {output} = await summarizeUploadedDocumentPrompt(input);
    return output!;
  }
);
