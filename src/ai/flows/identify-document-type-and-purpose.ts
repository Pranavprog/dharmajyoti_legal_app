'use server';
/**
 * @fileOverview Identifies the type and purpose of a legal document.
 *
 * - identifyDocumentTypeAndPurpose - A function that takes document text and returns the document type and purpose.
 * - IdentifyDocumentTypeAndPurposeInput - The input type for the identifyDocumentTypeAndPurpose function.
 * - IdentifyDocumentTypeAndPurposeOutput - The return type for the identifyDocumentTypeAndPurpose function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const IdentifyDocumentTypeAndPurposeInputSchema = z.object({
  documentText: z
    .string()
    .describe('The text content of the legal document.'),
  language: z.string().optional().describe('The language for the AI to respond in.'),
});
export type IdentifyDocumentTypeAndPurposeInput = z.infer<typeof IdentifyDocumentTypeAndPurposeInputSchema>;

const IdentifyDocumentTypeAndPurposeOutputSchema = z.object({
  documentType: z.string().describe('The type of the document (e.g., contract, agreement, policy).'),
  purpose: z.string().describe('A one-sentence summary of the document\'s purpose.'),
});
export type IdentifyDocumentTypeAndPurposeOutput = z.infer<typeof IdentifyDocumentTypeAndPurposeOutputSchema>;

export async function identifyDocumentTypeAndPurpose(input: IdentifyDocumentTypeAndPurposeInput): Promise<IdentifyDocumentTypeAndPurposeOutput> {
  return identifyDocumentTypeAndPurposeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'identifyDocumentTypeAndPurposePrompt',
  input: {schema: IdentifyDocumentTypeAndPurposeInputSchema},
  output: {schema: IdentifyDocumentTypeAndPurposeOutputSchema},
  prompt: `You are an AI legal assistant tasked with analyzing legal documents.

  Your goal is to identify the type of document and summarize its purpose in a single, clear sentence.

  Please provide the response in the following language: {{language}}.

  Analyze the following document text:
  {{documentText}}

  Respond with the document type and a one-sentence summary of its purpose.
  Ensure that the document type and purpose are easily understood by a lay person.
`,
});

const identifyDocumentTypeAndPurposeFlow = ai.defineFlow(
  {
    name: 'identifyDocumentTypeAndPurposeFlow',
    inputSchema: IdentifyDocumentTypeAndPurposeInputSchema,
    outputSchema: IdentifyDocumentTypeAndPurposeOutputSchema,
  },
  async input => {
    const maxRetries = 3;
    let attempt = 0;
    while (attempt < maxRetries) {
      try {
        const {output} = await prompt(input);
        if (!output) {
          throw new Error('No output received from the AI model.');
        }
        return output;
      } catch (error) {
        attempt++;
        if (error instanceof Error && error.message.includes('503') && attempt < maxRetries) {
          console.log(`Attempt ${attempt} failed with 503 error. Retrying in 1 second...`);
          await new Promise(resolve => setTimeout(resolve, 1000));
        } else {
          console.error(`An error occurred on attempt ${attempt}:`, error);
          throw error;
        }
      }
    }
    throw new Error('Failed to identify document type after multiple retries.');
  }
);
