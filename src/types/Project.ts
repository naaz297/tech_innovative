export interface Project {
  id: string;
  name: string;
  type: 'rice' | 'agroforestry';
  area: number; // in acres
  location: string;
  status: 'active' | 'pending' | 'completed';
  carbonCredits: number;
  lastUpdated: Date;
  photos: string[];
  description?: string;
}