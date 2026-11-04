export interface Character {
  id: string;
  name: string;
  role: string;
  image: string;
  status: "selected" | "locked";
}
