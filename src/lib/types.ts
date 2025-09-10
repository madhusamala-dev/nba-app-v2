export interface User {
  id: string;
  email: string;
  password: string;
  role: 'admin' | 'institute';
  institutionId?: string;
}

export interface Institution {
  id: string;
  name: string;
  aisheCode?: string;
  institutionCode: string;
  tierCategory?: string;
  institutionCategory: string;
  email?: string;
  password?: string;
  nbaCoordinator?: {
    name: string;
    designation: string;
    email: string;
    contactNumber: string;
  };
  chairman?: {
    name: string;
    designation: string;
    email: string;
    contactNumber: string;
  };
  address: string;
  registeredDate?: string;
  status?: string;
  completionPercentage?: number;
  lastUpdated?: string;
  establishedYear: number;
  coordinatorName: string;
  coordinatorEmail: string;
  coordinatorPhone: string;
  preQualifiersCompleted?: boolean;
}

export interface Application {
  id: string;
  institutionId?: string;
  applicationId?: string;
  title?: string;
  type?: string;
  programs?: string[];
  sars?: string[];
  createdDate: string;
  status: string;
  progress?: number;
  dueDate?: string;
  lastModified?: string;
}

export interface SectionData {
  id: string;
  sectionNumber: string;
  title: string;
  content: string;
  maxMarks: number;
  obtainedMarks: number; // User can input their own marks
  attachments: string[];
  isCompleted: boolean;
  lastModified: string;
}

export interface Criteria {
  id: string;
  criteriaNumber: number;
  title: string;
  description: string;
  maxMarks: number;
  obtainedMarks: number; // Sum of all section marks
  sections: SectionData[];
  completedSections: number;
}

export interface SARApplication {
  id: string;
  institutionId: string;
  applicationId: string;
  departmentName: string;
  applicationStartDate: string;
  applicationEndDate: string;
  status: 'draft' | 'in-progress' | 'completed' | 'submitted';
  completionPercentage: number;
  criteria: Criteria[];
  overallMarks: number;
  maxOverallMarks: number;
  lastModified: string;
}

export interface Department {
  id: string;
  name: string;
  category: string;
}