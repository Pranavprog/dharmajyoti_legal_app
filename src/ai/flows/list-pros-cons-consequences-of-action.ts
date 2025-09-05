'use server';

/**
 * @fileOverview This flow lists the pros, cons, and potential consequences of a legal action.
 *
 * - listProsConsConsequencesOfAction - A function that handles the process of listing pros, cons, and consequences of an action.
 * - ListProsConsConsequencesOfActionInput - The input type for the listProsConsConsequencesOfAction function.
 * - ListProsConsConsequencesOfActionOutput - The return type for the listProsConsConsequencesOfAction function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ListProsConsConsequencesOfActionInputSchema = z.object({
  action: z.string().describe('The legal action being considered (e.g., signing a contract).'),
  context: z.string().optional().describe('Additional context or details about the action.'),
});
export type ListProsConsConsequencesOfActionInput = z.infer<typeof ListProsConsConsequencesOfActionInputSchema>;

const ListProsConsConsequencesOfActionOutputSchema = z.object({
  pros: z.array(z.string()).describe('A list of pros associated with the action.'),
  cons: z.array(z.string()).describe('A list of cons associated with the action.'),
  consequences: z.array(z.string()).describe('A list of potential consequences (financial, legal, personal) associated with the action.'),
});
export type ListProsConsConsequencesOfActionOutput = z.infer<typeof ListProsConsConsequencesOfActionOutputSchema>;

export async function listProsConsConsequencesOfAction(input: ListProsConsConsequencesOfActionInput): Promise<ListProsConsConsequencesOfActionOutput> {
  return listProsConsConsequencesOfActionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'listProsConsConsequencesOfActionPrompt',
  input: {schema: ListProsConsConsequencesOfActionInputSchema},
  output: {schema: ListProsConsConsequencesOfActionOutputSchema},
  prompt: `You are an AI legal assistant. Your task is to provide a list of pros, cons, and potential consequences for a given legal action.

  Action: {{{action}}}
  Context: {{{context}}}

  Provide the output in JSON format. The JSON object should have three keys: "pros", "cons", and "consequences". Each key should have an array of strings as its value.
`,
});

const listProsConsConsequencesOfActionFlow = ai.defineFlow(
  {
    name: 'listProsConsConsequencesOfActionFlow',
    inputSchema: ListProsConsConsequencesOfActionInputSchema,
    outputSchema: ListProsConsConsequencesOfActionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
