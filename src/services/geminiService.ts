import { SermonRequest } from "../types";

async function callGeminiFunction(payload: unknown): Promise<string> {
  const response = await fetch('/.netlify/functions/gemini', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data?.error || 'فشل الاتصال بخدمة الذكاء الاصطناعي.');
  }

  return data.text || '';
}

export async function generateSermon(request: SermonRequest): Promise<string> {
  try {
    return await callGeminiFunction({ mode: 'generate', request });
  } catch (error) {
    console.error('Error generating sermon:', error);
    throw new Error(error instanceof Error ? error.message : 'فشل في توليد الخطبة. يرجى المحاولة مرة أخرى.');
  }
}

export async function editSermonAction(content: string, action: string): Promise<string> {
  try {
    return await callGeminiFunction({ mode: 'edit', content, action });
  } catch (error) {
    console.error('Error editing sermon:', error);
    throw new Error(error instanceof Error ? error.message : 'فشل في تعديل الخطبة.');
  }
}
