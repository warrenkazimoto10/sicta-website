import { apiClient } from "@/lib/apiClient";

export type PageSections = Record<string, string>;

interface PageSectionsResponse {
  success: boolean;
  data: PageSections;
}

export const fetchPageSections = (page: string): Promise<PageSections> =>
  apiClient
    .get<PageSectionsResponse>(`/page-sections/${page}`)
    .then((r) => r.data ?? {});
