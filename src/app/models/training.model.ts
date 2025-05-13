export interface Training {
  id?: number;
  clientId: number;
  horseId: number;
  instructorId: number;
  dateTime: string; // ISO string, e.g. '2025-05-12T10:00:00'
  duration: number; // minutes
}
