export interface Document {
  id: number;
  title: string;
  emotionTagNames: string[];
  htmlContent: string;
}

export interface PagedResponse<T> {
  content: T[];
  page: number;
  size: number;
  totalPages: number;
  totalElements: number;
  last: boolean;
}

export interface SubmitPayload {
  title: string;
  html: string;
  tags: string[];
}