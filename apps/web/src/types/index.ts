export type LinkResponse = {
  id: number;
  url: string;
  title: string | null;
  createdAt: string;
};

export type CreateLinkPayload = {
  url: string;
  title?: string;
};

export type ApiErrorResponse = {
  statusCode: number;
  message: string | string[];
  error?: string;
  errors?: Record<string, string[]>;
};
