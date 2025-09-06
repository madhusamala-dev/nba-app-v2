import { Institution, User, SARApplication, Department, Application } from './types';

// Mock data for institutions - complete structure with all required fields
export const institutions: Institution[] = [
  {
    id: '1',
    name: 'RGUKT Basar',
    aisheCode: 'U-0001',
    institutionCode: 'RGUKT',
    tierCategory: 'Tier I',
    institutionCategory: 'Engineering',
    email: 'rgukt@example.com',
    address: 'Basar, Telangana',
    registeredDate: '2024-01-15T00:00:00.000Z',
    status: 'registered',
    establishedYear: 2008,
    coordinatorName: 'Dr. Rajesh Kumar',
    coordinatorEmail: 'coordinator@rgukt.ac.in',
    coordinatorPhone: '+91-9876543210',
    preQualifiersCompleted: true,
    nbaCoordinator: {
      name: 'Dr. Rajesh Kumar',
      contactNumber: '+91-9876543210',
      email: 'coordinator@rgukt.ac.in',
      designation: 'Professor'
    }
  },
  {
    id: '2',
    name: 'VIT University',
    aisheCode: 'U-0002',
    institutionCode: 'VIT',
    tierCategory: 'Tier I',
    institutionCategory: 'Engineering',
    email: 'vit@example.com',
    address: 'Vellore, Tamil Nadu',
    registeredDate: '2024-01-10T00:00:00.000Z',
    status: 'registered',
    establishedYear: 1984,
    coordinatorName: 'Dr. Priya Sharma',
    coordinatorEmail: 'coordinator@vit.ac.in',
    coordinatorPhone: '+91-9876543211',
    preQualifiersCompleted: true,
    nbaCoordinator: {
      name: 'Dr. Priya Sharma',
      contactNumber: '+91-9876543211',
      email: 'coordinator@vit.ac.in',
      designation: 'Professor'
    }
  },
  {
    id: '3',
    name: 'IIT Delhi',
    aisheCode: 'U-0003',
    institutionCode: 'IITD',
    tierCategory: 'Tier I',
    institutionCategory: 'Engineering',
    email: 'iit@example.com',
    address: 'New Delhi',
    registeredDate: '2024-01-05T00:00:00.000Z',
    status: 'registered',
    establishedYear: 1961,
    coordinatorName: 'Dr. Amit Singh',
    coordinatorEmail: 'coordinator@iitd.ac.in',
    coordinatorPhone: '+91-9876543212',
    preQualifiersCompleted: true,
    nbaCoordinator: {
      name: 'Dr. Amit Singh',
      contactNumber: '+91-9876543212',
      email: 'coordinator@iitd.ac.in',
      designation: 'Professor'
    }
  }
];

// Mock departments data
export const departments: Department[] = [
  // Engineering Departments
  { id: 'CSE', name: 'Computer Science and Engineering', category: 'Engineering' },
  { id: 'ECE', name: 'Electronics and Communication Engineering', category: 'Engineering' },
  { id: 'EEE', name: 'Electrical and Electronics Engineering', category: 'Engineering' },
  { id: 'MECH', name: 'Mechanical Engineering', category: 'Engineering' },
  { id: 'CIVIL', name: 'Civil Engineering', category: 'Engineering' },
  { id: 'CHEM', name: 'Chemical Engineering', category: 'Engineering' },
  { id: 'AERO', name: 'Aeronautical Engineering', category: 'Engineering' },
  { id: 'AUTO', name: 'Automobile Engineering', category: 'Engineering' },
  { id: 'BIOTECH', name: 'Biotechnology', category: 'Engineering' },
  { id: 'IT', name: 'Information Technology', category: 'Engineering' },
  
  // MBA Departments
  { id: 'MBA-FIN', name: 'MBA - Finance', category: 'MBA' },
  { id: 'MBA-MKT', name: 'MBA - Marketing', category: 'MBA' },
  { id: 'MBA-HR', name: 'MBA - Human Resources', category: 'MBA' },
  { id: 'MBA-OPS', name: 'MBA - Operations', category: 'MBA' },
  { id: 'MBA-IT', name: 'MBA - Information Technology', category: 'MBA' },
  { id: 'MBA-IB', name: 'MBA - International Business', category: 'MBA' }
];

// Mock SAR applications data - initial sample data
const mockSARApplications: SARApplication[] = [
  // RGUKT Applications
  {
    id: 'institute-info-1-sample',
    applicationId: 'RGUKT-IS-20240901',
    institutionId: '1',
    departmentId: 'institute-info',
    departmentName: 'Institute Information',
    status: 'in-progress',
    completionPercentage: 45,
    applicationStartDate: '2024-09-01T00:00:00.000Z',
    lastModifiedDate: '2024-09-05T10:30:00.000Z',
    lastModifiedBy: 'coordinator@rgukt.ac.in'
  },
  {
    id: '1-CSE-sample',
    applicationId: 'RGUKT-CSE-20240901',
    institutionId: '1',
    departmentId: 'CSE',
    departmentName: 'Computer Science and Engineering',
    status: 'in-progress',
    completionPercentage: 65,
    applicationStartDate: '2024-09-01T00:00:00.000Z',
    lastModifiedDate: '2024-09-06T14:20:00.000Z',
    lastModifiedBy: 'cse.hod@rgukt.ac.in'
  },
  {
    id: '1-ECE-sample',
    applicationId: 'RGUKT-ECE-20240901',
    institutionId: '1',
    departmentId: 'ECE',
    departmentName: 'Electronics and Communication Engineering',
    status: 'draft',
    completionPercentage: 25,
    applicationStartDate: '2024-09-01T00:00:00.000Z',
    lastModifiedDate: '2024-09-03T09:15:00.000Z',
    lastModifiedBy: 'ece.hod@rgukt.ac.in'
  },
  {
    id: '1-MECH-sample',
    applicationId: 'RGUKT-MECH-20240901',
    institutionId: '1',
    departmentId: 'MECH',
    departmentName: 'Mechanical Engineering',
    status: 'in-progress',
    completionPercentage: 80,
    applicationStartDate: '2024-09-01T00:00:00.000Z',
    lastModifiedDate: '2024-09-06T16:45:00.000Z',
    lastModifiedBy: 'mech.hod@rgukt.ac.in'
  },

  // VIT Applications
  {
    id: 'institute-info-2-sample',
    applicationId: 'VIT-IS-20240902',
    institutionId: '2',
    departmentId: 'institute-info',
    departmentName: 'Institute Information',
    status: 'completed',
    completionPercentage: 100,
    applicationStartDate: '2024-09-02T00:00:00.000Z',
    lastModifiedDate: '2024-09-05T18:00:00.000Z',
    lastModifiedBy: 'coordinator@vit.ac.in'
  },
  {
    id: '2-CSE-sample',
    applicationId: 'VIT-CSE-20240902',
    institutionId: '2',
    departmentId: 'CSE',
    departmentName: 'Computer Science and Engineering',
    status: 'submitted',
    completionPercentage: 100,
    applicationStartDate: '2024-09-02T00:00:00.000Z',
    lastModifiedDate: '2024-09-06T12:30:00.000Z',
    lastModifiedBy: 'cse.hod@vit.ac.in'
  },
  {
    id: '2-IT-sample',
    applicationId: 'VIT-IT-20240902',
    institutionId: '2',
    departmentId: 'IT',
    departmentName: 'Information Technology',
    status: 'in-progress',
    completionPercentage: 75,
    applicationStartDate: '2024-09-02T00:00:00.000Z',
    lastModifiedDate: '2024-09-06T11:20:00.000Z',
    lastModifiedBy: 'it.hod@vit.ac.in'
  },

  // IIT Delhi Applications
  {
    id: 'institute-info-3-sample',
    applicationId: 'IITD-IS-20240903',
    institutionId: '3',
    departmentId: 'institute-info',
    departmentName: 'Institute Information',
    status: 'in-progress',
    completionPercentage: 90,
    applicationStartDate: '2024-09-03T00:00:00.000Z',
    lastModifiedDate: '2024-09-06T15:45:00.000Z',
    lastModifiedBy: 'coordinator@iitd.ac.in'
  },
  {
    id: '3-CSE-sample',
    applicationId: 'IITD-CSE-20240903',
    institutionId: '3',
    departmentId: 'CSE',
    departmentName: 'Computer Science and Engineering',
    status: 'in-progress',
    completionPercentage: 55,
    applicationStartDate: '2024-09-03T00:00:00.000Z',
    lastModifiedDate: '2024-09-06T13:10:00.000Z',
    lastModifiedBy: 'cse.hod@iitd.ac.in'
  },
  {
    id: '3-EEE-sample',
    applicationId: 'IITD-EEE-20240903',
    institutionId: '3',
    departmentId: 'EEE',
    departmentName: 'Electrical and Electronics Engineering',
    status: 'draft',
    completionPercentage: 15,
    applicationStartDate: '2024-09-03T00:00:00.000Z',
    lastModifiedDate: '2024-09-04T10:30:00.000Z',
    lastModifiedBy: 'eee.hod@iitd.ac.in'
  }
];

// Storage key for SAR applications
const SAR_APPLICATIONS_KEY = 'compliedu_sar_applications';

// Initialize localStorage with mock data if empty
const initializeMockData = (): void => {
  try {
    const existing = localStorage.getItem(SAR_APPLICATIONS_KEY);
    if (!existing || JSON.parse(existing).length === 0) {
      localStorage.setItem(SAR_APPLICATIONS_KEY, JSON.stringify(mockSARApplications));
      console.log('Initialized mock SAR applications data');
    }
  } catch (error) {
    console.error('Error initializing mock data:', error);
    localStorage.setItem(SAR_APPLICATIONS_KEY, JSON.stringify(mockSARApplications));
  }
};

// Initialize mock data on module load
initializeMockData();

// Get SAR applications from localStorage
const getSARApplicationsFromStorage = (): SARApplication[] => {
  try {
    const stored = localStorage.getItem(SAR_APPLICATIONS_KEY);
    if (!stored) {
      // If no data in storage, return mock data and save it
      localStorage.setItem(SAR_APPLICATIONS_KEY, JSON.stringify(mockSARApplications));
      return mockSARApplications;
    }
    return JSON.parse(stored);
  } catch (error) {
    console.error('Error reading SAR applications from storage:', error);
    return mockSARApplications;
  }
};

// Save SAR applications to localStorage
const saveSARApplicationsToStorage = (applications: SARApplication[]): void => {
  try {
    localStorage.setItem(SAR_APPLICATIONS_KEY, JSON.stringify(applications));
    console.log('SAR applications saved to storage:', applications.length);
  } catch (error) {
    console.error('Error saving SAR applications to storage:', error);
  }
};

// Export sarApplications as a getter function that reads from localStorage
export const sarApplications = getSARApplicationsFromStorage();

export const getInstitutionById = (id: string): Institution | undefined => {
  console.log('getInstitutionById called with ID:', id);
  console.log('Available institutions:', institutions.map(i => ({ id: i.id, name: i.name })));
  
  const found = institutions.find(inst => inst.id === id);
  console.log('Found institution:', found);
  return found;
};

export const getInstitutions = (): Institution[] => {
  return institutions;
};

export const addInstitution = (institution: Omit<Institution, 'id'>): Institution => {
  const newInstitution: Institution = {
    ...institution,
    id: (institutions.length + 1).toString()
  };
  
  institutions.push(newInstitution);
  console.log('Added new institution:', newInstitution);
  return newInstitution;
};

export const getDepartmentsByCategory = (category: string): Department[] => {
  return departments.filter(dept => dept.category === category);
};

export const getSARApplicationsByInstitution = (institutionId: string): SARApplication[] => {
  const allApplications = getSARApplicationsFromStorage();
  const institutionApps = allApplications.filter(app => app.institutionId === institutionId);
  console.log(`Found ${institutionApps.length} applications for institution ${institutionId}:`, institutionApps);
  return institutionApps;
};

// Function to get applications (for backward compatibility with InstituteDashboard)
export const getApplications = (): Application[] => {
  // Convert SAR applications to Application format for dashboard
  const sarApplications = getSARApplicationsFromStorage();
  return sarApplications.map(sarApp => ({
    id: sarApp.id,
    institutionId: sarApp.institutionId,
    applicationId: sarApp.applicationId,
    title: sarApp.departmentName,
    type: sarApp.departmentId === 'institute-info' ? 'Institute Information' : 'Department SAR',
    status: sarApp.status,
    progress: sarApp.completionPercentage,
    dueDate: new Date(new Date(sarApp.applicationStartDate).getTime() + 90 * 24 * 60 * 60 * 1000).toISOString(), // 90 days from start
    lastModified: sarApp.lastModifiedDate,
    createdDate: sarApp.applicationStartDate
  }));
};

export const createSARApplications = (
  institutionId: string,
  departmentIds: string[],
  createdBy: string
): SARApplication[] => {
  const institution = getInstitutionById(institutionId);
  if (!institution) {
    throw new Error('Institution not found');
  }

  const today = new Date();
  const dateString = today.toISOString().split('T')[0].replace(/-/g, '');
  
  const newApplications: SARApplication[] = departmentIds.map(departmentId => {
    const department = departments.find(d => d.id === departmentId);
    if (!department) {
      throw new Error(`Department ${departmentId} not found`);
    }

    return {
      id: `${institutionId}-${departmentId}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      applicationId: `${institution.institutionCode}-${departmentId}-${dateString}`,
      institutionId,
      departmentId,
      departmentName: department.name,
      status: 'draft',
      completionPercentage: 0,
      applicationStartDate: today.toISOString(),
      lastModifiedDate: today.toISOString(),
      lastModifiedBy: createdBy
    };
  });

  // Get existing applications and add new ones
  const existingApplications = getSARApplicationsFromStorage();
  const updatedApplications = [...existingApplications, ...newApplications];
  
  // Save to localStorage
  saveSARApplicationsToStorage(updatedApplications);
  
  console.log('Created new SAR applications:', newApplications);
  return newApplications;
};

// New function to create institute information application
export const createInstituteInfoApplication = (
  institutionId: string,
  createdBy: string
): SARApplication => {
  const institution = getInstitutionById(institutionId);
  if (!institution) {
    throw new Error('Institution not found');
  }

  const today = new Date();
  const dateString = today.toISOString().split('T')[0].replace(/-/g, '');
  
  const instituteInfoApp: SARApplication = {
    id: `institute-info-${institutionId}-${Date.now()}`,
    applicationId: `${institution.institutionCode}-IS-${dateString}`,
    institutionId,
    departmentId: 'institute-info',
    departmentName: 'Institute Information',
    status: 'draft',
    completionPercentage: 0,
    applicationStartDate: today.toISOString(),
    lastModifiedDate: today.toISOString(),
    lastModifiedBy: createdBy
  };

  // Get existing applications and add new one
  const existingApplications = getSARApplicationsFromStorage();
  const updatedApplications = [...existingApplications, instituteInfoApp];
  
  // Save to localStorage
  saveSARApplicationsToStorage(updatedApplications);
  
  console.log('Created institute information application:', instituteInfoApp);
  return instituteInfoApp;
};

// Function to update SAR application
export const updateSARApplication = (
  applicationId: string,
  updates: Partial<SARApplication>
): SARApplication | null => {
  const existingApplications = getSARApplicationsFromStorage();
  const applicationIndex = existingApplications.findIndex(app => app.id === applicationId);
  
  if (applicationIndex === -1) {
    console.error('Application not found:', applicationId);
    return null;
  }
  
  const updatedApplication = {
    ...existingApplications[applicationIndex],
    ...updates,
    lastModifiedDate: new Date().toISOString()
  };
  
  existingApplications[applicationIndex] = updatedApplication;
  saveSARApplicationsToStorage(existingApplications);
  
  console.log('Updated SAR application:', updatedApplication);
  return updatedApplication;
};

// Dashboard stats function for admin
export const getDashboardStats = () => {
  const allApplications = getSARApplicationsFromStorage();
  
  const stats = {
    totalInstitutions: institutions.length,
    totalRegistered: institutions.length,
    totalApplications: allApplications.length,
    completedApplications: allApplications.filter(app => app.status === 'completed').length,
    inProgressApplications: allApplications.filter(app => app.status === 'in-progress').length,
    draftApplications: allApplications.filter(app => app.status === 'draft').length,
    submittedApplications: allApplications.filter(app => app.status === 'submitted').length,
    preQualifiersOngoing: 0,
    preQualifiersCompleted: institutions.filter(inst => inst.preQualifiersCompleted).length,
    sarOngoing: allApplications.filter(app => app.status === 'in-progress').length,
    sarCompleted: allApplications.filter(app => app.status === 'completed').length
  };
  
  return stats;
};