'use server';
/**
 * @fileOverview Provides explanations of a specific clause or section in both legal and layman's terms.
 *
 * - assessClauseAndProvideExplanations - A function that assesses a clause and provides explanations.
 * - AssessClauseAndProvideExplanationsInput - The input type for the assessClauseAndProvideExplanations function.
 * - AssessClauseAndProvideExplanationsOutput - The return type for the assessClauseAndProvideExplanations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AssessClauseAndProvideExplanationsInputSchema = z.object({
  documentText: z
    .string()
    .describe('The full text content of the legal document.'),
  clause: z.string().describe('The specific clause or section to be explained.'),
});
export type AssessClauseAndProvideExplanationsInput = z.infer<
  typeof AssessClauseAndProvideExplanationsInputSchema
>;

const AssessClauseAndProvideExplanationsOutputSchema = z.object({
  legalExplanation: z.string().describe('Explanation in legal terms.'),
  laymanExplanation: z.string().describe('Explanation in plain layman terms.'),
});

export type AssessClauseAndProvideExplanationsOutput = z.infer<
  typeof AssessClauseAndProvideExplanationsOutputSchema
>;

export async function assessClauseAndProvideExplanations(
  input: AssessClauseAndProvideExplanationsInput
): Promise<AssessClauseAndProvideExplanationsOutput> {
  return assessClauseAndProvideExplanationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'assessClauseAndProvideExplanationsPrompt',
  input: {schema: AssessClauseAndProvideExplanationsInputSchema},
  output: {schema: AssessClauseAndProvideExplanationsOutputSchema},
  prompt: `You are an AI legal assistant. A user has selected a clause from a legal document and wants it explained in both legal and layman's terms.

  Here is the document:
  {{documentText}}

  Here is the clause:
  {{clause}}

  Provide two explanations:
  a. In legal terms (short, precise, professional).
  b. In plain layman’s terms (easy to understand, everyday examples).
  `,
});

const assessClauseAndProvideExplanationsFlow = ai.defineFlow(
  {
    name: 'assessClauseAndProvideExplanationsFlow',
    inputSchema: AssessClauseAndProvideExplanationsInputSchema,
    outputSchema: AssessClauseAndProvideExplanationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
