export interface Blog {
  _id: string;
  title: string;
  content: string;
  author: string; // user email
  likers?: string[];
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
