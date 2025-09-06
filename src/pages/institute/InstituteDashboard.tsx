import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import InstituteLayout from '@/components/InstituteLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { getCurrentUser } from '@/lib/auth';
import { getInstitutionById, getSARApplicationsByInstitution } from '@/lib/data';
import { Institution, SARApplication } from '@/lib/types';

export default function InstituteDashboard() {
  const navigate = useNavigate();
  const [institution, setInstitution] = useState<Institution | null>(null);
  const [sarApplications, setSarApplications] = useState<SARApplication[]>([]);
  const currentUser = getCurrentUser();

  useEffect(() => {
    if (currentUser?.institutionId) {
      const inst = getInstitutionById(currentUser.institutionId);
      setInstitution(inst);
      
      if (inst) {
        const apps = getSARApplicationsByInstitution(inst.id);
        setSarApplications(apps);
      }
    }
  }, [currentUser]);

  const calculateOverallProgress = () => {
    if (sarApplications.length === 0) return 0;
    const totalProgress = sarApplications.reduce((sum, app) => sum + app.completionPercentage, 0);
    return Math.round(totalProgress / sarApplications.length);
  };

  const getEarliestStartDate = () => {
    if (sarApplications.length === 0) return null;
    
    const dates = sarApplications.map(app => new Date(app.applicationStartDate));
    const earliestDate = new Date(Math.min(...dates.map(date => date.getTime())));
    return earliestDate;
  };

  const calculateEndDate = (startDate: Date) => {
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 90); // 90 days for SAR completion
    return endDate;
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const overallProgress = calculateOverallProgress();
  const startDate = getEarliestStartDate();
  const endDate = startDate ? calculateEndDate(startDate) : null;

  // Sort applications to show Institute Information first
  const sortedApplications = [...sarApplications].sort((a, b) => {
    if (a.departmentId === 'institute-info') return -1;
    if (b.departmentId === 'institute-info') return 1;
    return 0;
  });

  if (!institution) {
    return (
      <InstituteLayout title="Dashboard">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading dashboard...</p>
          </div>
        </div>
      </InstituteLayout>
    );
  }

  return (
    <InstituteLayout title="Dashboard">
      <div className="space-y-6">
        {/* Welcome Section */}
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Welcome to {institution.name}
                </h2>
                <p className="text-gray-600">
                  Institution Code: {institution.institutionCode} • Category: {institution.institutionCategory}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Manage your NBA accreditation applications and track progress
                </p>
              </div>
              <div className="text-right">
                <Badge variant="outline" className="mb-2">
                  {institution.tierCategory || 'Tier II'}
                </Badge>
                <p className="text-sm text-gray-600">
                  Est. {institution.establishedYear}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* SAR Application Stage Dashboard */}
        {sarApplications.length > 0 && (
          <>
            {/* SAR Application Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  SAR Application Stage
                </CardTitle>
                <CardDescription>
                  Track your Self Assessment Report application progress
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                  {/* Application Start Date */}
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600 mb-1">
                      {startDate ? formatDate(startDate) : 'N/A'}
                    </div>
                    <p className="text-sm text-gray-600">Application Start Date</p>
                  </div>

                  {/* End Date */}
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600 mb-1">
                      {endDate ? formatDate(endDate) : 'N/A'}
                    </div>
                    <p className="text-sm text-gray-600">End Date</p>
                  </div>

                  {/* Total Applications */}
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600 mb-1">
                      {sarApplications.length}
                    </div>
                    <p className="text-sm text-gray-600">Total Applications</p>
                  </div>

                  {/* Overall Progress */}
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600 mb-1">
                      {overallProgress}%
                    </div>
                    <p className="text-sm text-gray-600">Overall Progress</p>
                  </div>
                </div>

                {/* Overall Progress Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Overall Progress</span>
                    <span>{overallProgress}%</span>
                  </div>
                  <Progress value={overallProgress} className="h-3" />
                </div>
              </CardContent>
            </Card>

            {/* SAR Applications List */}
            <Card>
              <CardHeader>
                <CardTitle>SAR Applications</CardTitle>
                <CardDescription>
                  Your Self Assessment Report applications
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {sortedApplications.map((app, index) => (
                    <Card key={app.id} className={`${app.departmentId === 'institute-info' ? 'bg-blue-50 border-blue-200' : 'bg-gray-50'}`}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white border-2 border-gray-300 text-sm font-semibold">
                              {index + 1}
                            </div>
                            <div>
                              <h4 className="font-semibold text-lg text-gray-900">
                                {app.departmentName}
                              </h4>
                              <p className="text-sm text-gray-600 mt-1">
                                Start Date: {new Date(app.applicationStartDate).toLocaleDateString('en-US', {
                                  year: 'numeric',
                                  month: 'short',
                                  day: 'numeric'
                                })}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center space-x-2 mb-2">
                              <span className="text-sm text-gray-600">Progress:</span>
                              <span className="font-semibold text-gray-900">{app.completionPercentage}%</span>
                            </div>
                            <div className="w-32">
                              <Progress value={app.completionPercentage} className="h-2" />
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>SAR Applications</CardTitle>
              <CardDescription>Manage your Self Assessment Reports</CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                className="w-full" 
                onClick={() => navigate('/institute/sar')}
              >
                <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                View SAR Applications
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Institution Profile</CardTitle>
              <CardDescription>View and manage institution details</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>AISHE Code:</span>
                  <span className="font-medium">{institution.aisheCode || 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Coordinator:</span>
                  <span className="font-medium">{institution.coordinatorName}</span>
                </div>
                <div className="flex justify-between">
                  <span>Email:</span>
                  <span className="font-medium">{institution.coordinatorEmail}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </InstituteLayout>
  );
}