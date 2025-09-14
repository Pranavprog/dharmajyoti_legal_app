'use server';
/**
 * @fileOverview Identifies loopholes, problems, and cautions in a legal document.
 *
 * - spotTraps - A function that takes document text and identifies potential issues.
 * - SpotTrapsInput - The input type for the spotTraps function.
 * - SpotTrapsOutput - The return type for the spotTraps function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SpotTrapsInputSchema = z.object({
  documentText: z
    .string()
    .describe('The text content of the legal document.'),
  language: z.string().optional().describe('The language for the AI to respond in.'),
});
export type SpotTrapsInput = z.infer<typeof SpotTrapsInputSchema>;

const SpotTrapsOutputSchema = z.object({
  loopholes: z.array(z.string()).describe('A list of potential loopholes or ambiguities in the document. Each item should be a string in the format "Clause/Section Name: Explanation".'),
  problems: z.array(z.string()).describe('A list of clauses that could be problematic or unfair to the user. Each item should be a string in the format "Clause/Section Name: Explanation".'),
  cautions: z.array(z.string()).describe('A list of general cautions or things to be aware of in the document. Each item should be a string in the format "Topic: Explanation".'),
});
export type SpotTrapsOutput = z.infer<typeof SpotTrapsOutputSchema>;

export async function spotTraps(input: SpotTrapsInput): Promise<SpotTrapsOutput> {
  return spotTrapsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'spotTrapsPrompt',
  input: {schema: SpotTrapsInputSchema},
  output: {schema: SpotTrapsOutputSchema},
  prompt: `You are an AI legal expert with a talent for identifying risks in legal documents. Your task is to analyze the provided document and identify potential "traps" for the user.

  Please provide the response in the following language: {{language}}.

  Analyze the following document text:
  {{documentText}}

  Please identify the following, providing your output as a JSON object:
  1.  **Loopholes**: Ambiguous language or clauses that could be exploited. For each, identify the clause or section and explain the potential loophole.
  2.  **Problems**: Clauses that are unusually harsh, unfair, or problematic for the party signing the document. For each, identify the clause and explain why it's a problem.
  3.  **Cautions**: General warnings or things the user should be particularly mindful of, even if they aren't explicit loopholes or problems. This could include missing clauses, or obligations the user needs to be prepared for.

  Structure each item in the arrays as a single string with the clause or topic, a colon, and then the explanation. For example: "Termination Clause: The notice period is unusually short, giving you little time to react."
`,
});

const spotTrapsFlow = ai.defineFlow(
  {
    name: 'spotTrapsFlow',
    inputSchema: SpotTrapsInputSchema,
    outputSchema: SpotTrapsOutputSchema,
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
    throw new Error('Failed to spot traps after multiple retries.');
  }
);
