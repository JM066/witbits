interface Image {
  id: string;
  title: string;
  created_at: string;
  updated_at: string;
  description: string | null;
  alt_description: string | null;
  categories: string[];
  likes: number;
  url: string;
}
