export interface Training {
  id?: number;
  clientId: number;
  clientName?: string;
  horseId: number;
  horseName?: string;
  instructorId: number;
  instructorName?: string;
  dateTime: string; // ISO string, e.g. '2025-05-12T10:00:00'
  duration: number; // minutes
}
