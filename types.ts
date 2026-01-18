
export enum ReportSeverity {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL'
}

export interface PatientReport {
  id: string;
  patientInitials: string;
  incidentDate: string;
  behaviorType: string;
  severity: ReportSeverity;
  description: string;
  doctorName: string;
  clinicId: string;
  aiSummary?: string;
}

export interface Comment {
  id: string;
  author: string;
  content: string;
  timestamp: string;
}

export interface CommunityPost {
  id: string;
  author: string;
  content: string;
  timestamp: string;
  likes: number;
  comments: Comment[];
  tags: string[];
}

export interface User {
  name: string;
  role: string;
  medicalId: string;
  isAuthenticated: boolean;
}
