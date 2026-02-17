export interface Blog {
  _id: string;
  title: string;
  content: string;
  author: string; // user email
  createdAt: string;
  updatedAt?: string;
}

export interface BlogResponse {
  data: Blog[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
