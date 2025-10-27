import type { ApiErrorResponse } from '../types';

export async function getErrorMessage(res: Response): Promise<string> {
  try {
    const payload = (await res.json()) as ApiErrorResponse;
    if (Array.isArray(payload.message)) return payload.message.join(', ');
    if (payload.message) return payload.message;
  } catch (error) {
    console.warn('Failed to parse API error response', error);
  }

  return `Request failed with status ${res.status}`;
}
