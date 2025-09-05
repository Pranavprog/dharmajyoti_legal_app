'use server';

/**
 * @fileOverview This file defines a Genkit flow for providing interactive legal guidance to users in a chatbot mode.
 *
 * - interactiveLegalGuidance - An async function that takes a user's question as input and returns legal guidance.
 * - InteractiveLegalGuidanceInput - The input type for the interactiveLegalGuidance function (a string).
 * - InteractiveLegalGuidanceOutput - The return type for the interactiveLegalGuidanceOutput function (a string).
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const InteractiveLegalGuidanceInputSchema = z.object({
  message: z.string().describe('The user\'s message or question.'),
  language: z.string().optional().describe('The language for the AI to respond in.'),
});
type InteractiveLegalGuidanceInput = z.infer<typeof InteractiveLegalGuidanceInputSchema>;

const InteractiveLegalGuidanceOutputSchema = z.string().describe("The AI's response.");
type InteractiveLegalGuidanceOutput = z.infer<typeof InteractiveLegalGuidanceOutputSchema>;

export async function interactiveLegalGuidance(
  input: InteractiveLegalGuidanceInput
): Promise<InteractiveLegalGuidanceOutput> {
  return interactiveLegalGuidanceFlow(input);
}

const interactiveLegalGuidancePrompt = ai.definePrompt({
  name: 'interactiveLegalGuidancePrompt',
  input: {schema: InteractiveLegalGuidanceInputSchema},
  output: {schema: InteractiveLegalGuidanceOutputSchema.nullable()},
  prompt: `You are MiniLawyer, an AI assistant that provides short, clear, everyday-language answers about legal texts or problems.
Respond in the following language: {{language}}.

Your Core Task:

1.  **Check for Location**: First, check if the user has provided a location (city, state, country).
    *   **If NO location is given, your ONLY response must be to politely ask for it.** Example: "I can help with that. To give you the most accurate advice, could you please tell me which city and state (or country) this applies to?"
    *   **If location IS given, proceed with the analysis.**

2.  **Analyze and Respond (Once Location is Known):**
    *   **Local Law Check**: Match the text/problem with relevant local rules. Clearly state if a clause is ✅ valid, ⚠️ risky, or ❌ invalid in that location.
    *   **Plain-Language Rewrite**: Rewrite complex legal text into simple sentences.
    *   **Quick Risk Alerts**: Flag hidden traps (e.g., penalties, auto-renewals).
    *   **Interactive Guidance**: Ask essential follow-up questions if details are missing.

3.  **Escalation**:
    *   If the issue is too complex, say: “This case requires a deeper review. I’ll switch you to **Full Lawyer Mode** for pros/cons and future consequences.”

**Style Guidelines:**
*   Keep answers short (2–4 sentences).
*   NO legal jargon. Be empathetic and neutral.

**User's Request:**
{{message}}
`,
});

const interactiveLegalGuidanceFlow = ai.defineFlow(
  {
    name: 'interactiveLegalGuidanceFlow',
    inputSchema: InteractiveLegalGuidanceInputSchema,
    outputSchema: InteractiveLegalGuidanceOutputSchema,
  },
  async (input) => {
    const {output} = await interactiveLegalGuidancePrompt(input);
    return output ?? "I'm sorry, I couldn't process that. Could you try rephrasing?";
  }
);
