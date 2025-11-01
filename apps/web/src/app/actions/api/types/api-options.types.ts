export type ApiRequestOptions = {
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  path: string;
  body?: Record<string, any>;
  tags?: string[];
  cache?: RequestCache;
};
