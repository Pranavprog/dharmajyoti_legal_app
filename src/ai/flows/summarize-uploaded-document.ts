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
  language: z.string().optional().describe('The language for the AI to respond in.'),
});
export type SummarizeUploadedDocumentInput = z.infer<typeof SummarizeUploadedDocumentInputSchema>;

const SummarizeUploadedDocumentOutputSchema = z.object({
  summary: z
    .string()
    .describe(
      'A very small and crisp summary of the legal document (2-3 sentences max).'
    ),
  keywords: z.array(z.string()).describe('A list of important keywords from the document.'),
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
  prompt: `You are an AI legal assistant. Analyze the following legal document.

  1.  Provide a very small and crisp summary (2-3 sentences maximum) in clear, plain language.
  2.  Extract a list of the most important keywords or terms.

  Please provide the response in the following language: {{language}}.

  Document:
  {{{documentText}}}`,
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
