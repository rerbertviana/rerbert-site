export interface CharacterProfile {
  seniority: string;
  experience: string;
  education: string;
  location: string;
  isAvailable: boolean;
}

export interface Character {
  id: string;
  name: string;
  role: string;
  image: string;
  status: "available" | "locked";
  profile?: CharacterProfile;
}
