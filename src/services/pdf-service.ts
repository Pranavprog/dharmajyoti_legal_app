'use server';

/**
 * @fileOverview A service for processing PDF documents.
 *
 * - processPdf - A function that takes a PDF data URI and returns the extracted text.
 */

import {extractDocumentText} from '@/ai/flows/extract-document-text';

interface ProcessPdfInput {
  dataUri: string;
}

interface ProcessPdfOutput {
  text: string;
}

export async function processPdf(
  input: ProcessPdfInput
): Promise<ProcessPdfOutput> {
  const result = await extractDocumentText({documentDataUri: input.dataUri});
  return {text: result.text};
}
