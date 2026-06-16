import { apiClient } from "@/lib/apiClient";

export interface ArticleMedia {
  id: number;
  url: string;
  filename: string;
  type: "image" | "video";
  order: number;
}

export interface ArticleAPI {
  id: number;
  slug: string;
  titre: string;
  extrait: string | null;
  contenu: string | null;
  auteur: string;
  temps_lecture: string | null;
  date_publication: string | null;
  a_la_une: boolean;
  tendance: boolean;
  image_principale: string | null;
  categorie: string | null;
  medias: ArticleMedia[];
  has_gallery: boolean;
}

interface ArticlesResponse { data: ArticleAPI[]; }
interface ArticleResponse  { data: ArticleAPI; related: ArticleAPI[]; }

export const fetchArticles = (): Promise<ArticleAPI[]> =>
  apiClient.get<ArticlesResponse>("/articles").then((r) => r.data);

export const fetchArticleBySlug = (slug: string): Promise<ArticleResponse> =>
  apiClient.get<ArticleResponse>(`/articles/${slug}`);
