'use server';

/**
 * @fileOverview This flow generates two future scenarios based on a legal document.
 *
 * - generateFutureScenarios - A function that handles the process of generating future scenarios.
 * - GenerateFutureScenariosInput - The input type for the generateFutureScenarios function.
 * - GenerateFutureScenariosOutput - The return type for the generateFutureScenarios function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateFutureScenariosInputSchema = z.object({
  documentText: z
    .string()
    .describe('The text content of the legal document.'),
  language: z.string().optional().describe('The language for the AI to respond in.'),
});
export type GenerateFutureScenariosInput = z.infer<
  typeof GenerateFutureScenariosInputSchema
>;

const GenerateFutureScenariosOutputSchema = z.object({
  bestCase: z
    .string()
    .describe(
      'A short, narrative story describing the best-case scenario if everything goes smoothly with this document.'
    ),
  worstCase: z
    .string()
    .describe(
      'A short, narrative story describing the worst-case scenario if things go wrong with this document.'
    ),
  advice: z
    .string()
    .describe(
      'Actionable advice on how to mitigate or handle the worst-case scenario.'
    ),
});
export type GenerateFutureScenariosOutput = z.infer<
  typeof GenerateFutureScenariosOutputSchema
>;

export async function generateFutureScenarios(
  input: GenerateFutureScenariosInput
): Promise<GenerateFutureScenariosOutput> {
  return generateFutureScenariosFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateFutureScenariosPrompt',
  input: {schema: GenerateFutureScenariosInputSchema},
  output: {schema: GenerateFutureScenariosOutputSchema},
  prompt: `You are an AI legal analyst and storyteller. Your task is to analyze a legal document and create two brief, narrative future scenarios for the user.

  Please provide the response in the following language: {{language}}.

  Document Text:
  {{{documentText}}}

  Based on this document, please generate the following:
  1.  **Best Case Scenario**: Write a short story (2-4 sentences) depicting a positive future where the agreement in this document unfolds perfectly for the user. Describe their status and success.
  2.  **Worst Case Scenario**: Write a short story (2-4 sentences) depicting a negative future where the agreement leads to problems. Describe their status and the challenges they face.
  3.  **Advice**: Based on the worst-case scenario, provide a few sentences of clear, actionable advice on what the user could do to prevent or resolve this situation.
`,
});

const generateFutureScenariosFlow = ai.defineFlow(
  {
    name: 'generateFutureScenariosFlow',
    inputSchema: GenerateFutureScenariosInputSchema,
    outputSchema: GenerateFutureScenariosOutputSchema,
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
    throw new Error('Failed to generate future scenarios after multiple retries.');
  }
);
