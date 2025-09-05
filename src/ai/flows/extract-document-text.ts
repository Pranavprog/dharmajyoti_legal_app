'use server';
/**
 * @fileOverview Extracts text content from a document image.
 *
 * - extractDocumentText - A function that takes a document image and returns the text.
 * - ExtractDocumentTextInput - The input type for the extractDocumentText function.
 * - ExtractDocumentTextOutput - The return type for the extractDocumentText function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ExtractDocumentTextInputSchema = z.object({
  documentDataUri: z
    .string()
    .describe(
      "An image of a document, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type ExtractDocumentTextInput = z.infer<
  typeof ExtractDocumentTextInputSchema
>;

const ExtractDocumentTextOutputSchema = z.object({
  text: z.string().describe('The extracted text from the document.'),
});
export type ExtractDocumentTextOutput = z.infer<
  typeof ExtractDocumentTextOutputSchema
>;

export async function extractDocumentText(
  input: ExtractDocumentTextInput
): Promise<ExtractDocumentTextOutput> {
  return extractDocumentTextFlow(input);
}

const prompt = ai.definePrompt({
  name: 'extractDocumentTextPrompt',
  input: {schema: ExtractDocumentTextInputSchema},
  output: {schema: ExtractDocumentTextOutputSchema},
  prompt: `You are an OCR (Optical Character Recognition) tool. Your task is to extract all text from the given document image.

  Return only the text content of the document. Do not add any commentary or explanation.

  Document: {{media url=documentDataUri}}`,
});

const extractDocumentTextFlow = ai.defineFlow(
  {
    name: 'extractDocumentTextFlow',
    inputSchema: ExtractDocumentTextInputSchema,
    outputSchema: ExtractDocumentTextOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
