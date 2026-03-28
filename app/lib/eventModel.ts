export interface Event {
  $id?: string;
  name: string;
  chineseName: string;
  images: string[];
  thumbnail?: string;
  isVideo?: boolean;
  date: string;
  category: "recent" | "past";
}
