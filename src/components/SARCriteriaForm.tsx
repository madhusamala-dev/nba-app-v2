import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import RichTextEditor from './RichTextEditor';
import { 
  ArrowLeft, 
  Save, 
  Upload, 
  FileText, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  X,
  Plus
} from 'lucide-react';
import type { SARApplication, Criteria, SectionData } from '@/lib/types';

interface SARCriteriaFormProps {
  isOpen: boolean;
  onClose: () => void;
  application: SARApplication | null;
  onUpdate: (applicationId: string, updates: Partial<SARApplication>) => void;
}

const SARCriteriaForm: React.FC<SARCriteriaFormProps> = ({
  isOpen,
  onClose,
  application,
  onUpdate
}) => {
  const [selectedCriteria, setSelectedCriteria] = useState<Criteria | null>(null);
  const [selectedSection, setSelectedSection] = useState<SectionData | null>(null);
  const [sectionContent, setSectionContent] = useState('');
  const [attachments, setAttachments] = useState<string[]>([]);
  const [newAttachment, setNewAttachment] = useState('');

  useEffect(() => {
    if (selectedSection) {
      setSectionContent(selectedSection.content);
      setAttachments(selectedSection.attachments);
    }
  }, [selectedSection]);

  if (!application) return null;

  const handleCriteriaSelect = (criteria: Criteria) => {
    setSelectedCriteria(criteria);
    setSelectedSection(null);
  };

  const handleSectionSelect = (section: SectionData) => {
    setSelectedSection(section);
  };

  const handleSaveSection = () => {
    if (!selectedSection || !selectedCriteria || !application) return;

    const updatedSection: SectionData = {
      ...selectedSection,
      content: sectionContent,
      attachments: attachments,
      isCompleted: sectionContent.trim().length > 0,
      lastModified: new Date().toISOString()
    };

    const updatedCriteria = {
      ...selectedCriteria,
      sections: selectedCriteria.sections.map(s => 
        s.id === selectedSection.id ? updatedSection : s
      )
    };

    // Update completed sections count
    updatedCriteria.completedSections = updatedCriteria.sections.filter(s => s.isCompleted).length;

    const updatedApplication: SARApplication = {
      ...application,
      criteria: application.criteria.map(c => 
        c.id === selectedCriteria.id ? updatedCriteria : c
      ),
      lastModified: new Date().toISOString()
    };

    // Calculate overall completion percentage
    const totalSections = updatedApplication.criteria.reduce((sum, c) => sum + c.sections.length, 0);
    const completedSections = updatedApplication.criteria.reduce((sum, c) => sum + c.completedSections, 0);
    updatedApplication.completionPercentage = totalSections > 0 ? Math.round((completedSections / totalSections) * 100) : 0;

    // Update status based on completion
    if (updatedApplication.completionPercentage === 100) {
      updatedApplication.status = 'completed';
    } else if (updatedApplication.completionPercentage > 0) {
      updatedApplication.status = 'in-progress';
    }

    onUpdate(application.id, updatedApplication);
    setSelectedCriteria(updatedCriteria);
    setSelectedSection(updatedSection);
  };

  const handleAddAttachment = () => {
    if (newAttachment.trim()) {
      setAttachments([...attachments, newAttachment.trim()]);
      setNewAttachment('');
    }
  };

  const handleRemoveAttachment = (index: number) => {
    setAttachments(attachments.filter((_, i) => i !== index));
  };

  const getStatusIcon = (isCompleted: boolean) => {
    if (isCompleted) {
      return <CheckCircle className="w-4 h-4 text-green-600" />;
    }
    return <Clock className="w-4 h-4 text-gray-400" />;
  };

  const getCriteriaProgress = (criteria: Criteria) => {
    return criteria.sections.length > 0 
      ? Math.round((criteria.completedSections / criteria.sections.length) * 100)
      : 0;
  };

  // Main criteria selection view
  if (!selectedCriteria) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              {application.departmentName} - SAR Criteria
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {/* Application Info */}
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold text-blue-900">{application.applicationId}</h3>
                  <p className="text-blue-700 text-sm">Overall Progress: {application.completionPercentage}%</p>
                </div>
                <Progress value={application.completionPercentage} className="w-32" />
              </div>
            </div>

            {/* Criteria Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {application.criteria.map((criteria) => {
                const progress = getCriteriaProgress(criteria);
                return (
                  <Card 
                    key={criteria.id} 
                    className="cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => handleCriteriaSelect(criteria)}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <CardTitle className="text-lg">
                            Criteria {criteria.criteriaNumber}
                          </CardTitle>
                          <p className="text-sm text-gray-600 mt-1">
                            {criteria.title}
                          </p>
                        </div>
                        <Badge variant="outline" className="ml-2">
                          {criteria.maxMarks} marks
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <p className="text-sm text-gray-700">
                          {criteria.description}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">
                            {criteria.completedSections} of {criteria.sections.length} sections
                          </span>
                          <span className="text-sm font-medium">{progress}%</span>
                        </div>
                        
                        <Progress value={progress} className="h-2" />
                        
                        <div className="flex items-center gap-2 text-sm">
                          {progress === 100 ? (
                            <>
                              <CheckCircle className="w-4 h-4 text-green-600" />
                              <span className="text-green-600">Completed</span>
                            </>
                          ) : progress > 0 ? (
                            <>
                              <Clock className="w-4 h-4 text-blue-600" />
                              <span className="text-blue-600">In Progress</span>
                            </>
                          ) : (
                            <>
                              <AlertCircle className="w-4 h-4 text-gray-400" />
                              <span className="text-gray-500">Not Started</span>
                            </>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  // Section selection view
  if (selectedCriteria && !selectedSection) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedCriteria(null)}
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <DialogTitle>
                Criteria {selectedCriteria.criteriaNumber}: {selectedCriteria.title}
              </DialogTitle>
            </div>
          </DialogHeader>

          <div className="space-y-6">
            {/* Criteria Info */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700 mb-3">{selectedCriteria.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">
                  Progress: {selectedCriteria.completedSections} of {selectedCriteria.sections.length} sections completed
                </span>
                <Badge variant="outline">{selectedCriteria.maxMarks} marks total</Badge>
              </div>
              <Progress 
                value={getCriteriaProgress(selectedCriteria)} 
                className="mt-2" 
              />
            </div>

            {/* Sections List */}
            <div className="grid grid-cols-1 gap-3">
              {selectedCriteria.sections.map((section) => (
                <Card 
                  key={section.id}
                  className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => handleSectionSelect(section)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {getStatusIcon(section.isCompleted)}
                        <div>
                          <h4 className="font-medium">
                            Section {section.sectionNumber}: {section.title}
                          </h4>
                          <p className="text-sm text-gray-600">
                            Max Marks: {section.maxMarks}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {section.attachments.length > 0 && (
                          <Badge variant="secondary" className="text-xs">
                            {section.attachments.length} files
                          </Badge>
                        )}
                        <Badge 
                          variant={section.isCompleted ? "default" : "secondary"}
                          className={section.isCompleted ? "bg-green-100 text-green-800" : ""}
                        >
                          {section.isCompleted ? "Completed" : "Pending"}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  // Section editing view
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedSection(null)}
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <DialogTitle>
              Section {selectedSection?.sectionNumber}: {selectedSection?.title}
            </DialogTitle>
          </div>
        </DialogHeader>

        {selectedSection && (
          <div className="space-y-6">
            {/* Section Info */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-medium">Section {selectedSection.sectionNumber}</h4>
                  <p className="text-gray-600">{selectedSection.title}</p>
                </div>
                <Badge variant="outline">{selectedSection.maxMarks} marks</Badge>
              </div>
            </div>

            <Tabs defaultValue="content" className="w-full">
              <TabsList>
                <TabsTrigger value="content">Content</TabsTrigger>
                <TabsTrigger value="attachments">Attachments</TabsTrigger>
              </TabsList>

              <TabsContent value="content" className="space-y-4">
                <div>
                  <Label className="text-base font-medium">Section Content</Label>
                  <p className="text-sm text-gray-600 mb-3">
                    Provide detailed information for this section. Use the rich text editor to format your content.
                  </p>
                  <RichTextEditor
                    content={sectionContent}
                    onChange={setSectionContent}
                    placeholder="Enter section content..."
                  />
                </div>
              </TabsContent>

              <TabsContent value="attachments" className="space-y-4">
                <div>
                  <Label className="text-base font-medium">Attachments</Label>
                  <p className="text-sm text-gray-600 mb-3">
                    Add supporting documents, images, or other files for this section.
                  </p>
                  
                  {/* Add Attachment */}
                  <div className="flex gap-2 mb-4">
                    <Input
                      placeholder="Enter file name or URL"
                      value={newAttachment}
                      onChange={(e) => setNewAttachment(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleAddAttachment()}
                    />
                    <Button onClick={handleAddAttachment} disabled={!newAttachment.trim()}>
                      <Plus className="w-4 h-4 mr-2" />
                      Add
                    </Button>
                  </div>

                  {/* Attachments List */}
                  <div className="space-y-2">
                    {attachments.map((attachment, index) => (
                      <div 
                        key={index}
                        className="flex items-center justify-between p-3 border rounded-lg bg-gray-50"
                      >
                        <div className="flex items-center gap-2">
                          <Upload className="w-4 h-4 text-gray-500" />
                          <span className="text-sm">{attachment}</span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveAttachment(index)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                    {attachments.length === 0 && (
                      <p className="text-gray-500 text-center py-8">
                        No attachments added yet
                      </p>
                    )}
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            {/* Save Button */}
            <div className="flex justify-end gap-2 pt-4 border-t">
              <Button variant="outline" onClick={() => setSelectedSection(null)}>
                Cancel
              </Button>
              <Button onClick={handleSaveSection}>
                <Save className="w-4 h-4 mr-2" />
                Save Section
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default SARCriteriaForm;