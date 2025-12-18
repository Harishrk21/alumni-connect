import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  MapPin,
  Building2,
  Clock,
  DollarSign,
  Briefcase,
  Filter,
  Bookmark,
  ExternalLink,
  CheckCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import AlumniLayout from '@/layouts/AlumniLayout';
import { jobsData, Job } from '@/data/mockData';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { formatDistanceToNow } from 'date-fns';

export default function JobsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [appliedJobs, setAppliedJobs] = useState<string[]>([]);
  const [savedJobs, setSavedJobs] = useState<string[]>([]);
  const { user } = useAuth();
  const { toast } = useToast();

  const filteredJobs = jobsData.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesType = selectedType === 'all' || job.type === selectedType;
    return matchesSearch && matchesType;
  });

  const handleApply = (jobId: string) => {
    setAppliedJobs([...appliedJobs, jobId]);
    setShowApplyModal(false);
    setSelectedJob(null);
    toast({
      title: 'Application Submitted!',
      description: 'Your application has been sent successfully.',
    });
  };

  const handleSave = (jobId: string) => {
    if (savedJobs.includes(jobId)) {
      setSavedJobs(savedJobs.filter(id => id !== jobId));
      toast({ title: 'Job removed from saved' });
    } else {
      setSavedJobs([...savedJobs, jobId]);
      toast({ title: 'Job saved successfully!' });
    }
  };

  const jobTypeColors: Record<string, string> = {
    'full-time': 'success',
    'part-time': 'info',
    'internship': 'warning',
    'contract': 'secondary',
  };

  return (
    <AlumniLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-display font-bold mb-2">Job Opportunities</h1>
            <p className="text-muted-foreground">
              Discover career opportunities from alumni network and partner companies
            </p>
          </div>

          {/* Search & Filters */}
          <Card className="card-elevated mb-8">
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search jobs, companies, or skills..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="Job Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="full-time">Full-time</SelectItem>
                    <SelectItem value="part-time">Part-time</SelectItem>
                    <SelectItem value="internship">Internship</SelectItem>
                    <SelectItem value="contract">Contract</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Results count */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-muted-foreground">
              Showing {filteredJobs.length} jobs
            </p>
          </div>

          {/* Job Listings */}
          <div className="space-y-4">
            {filteredJobs.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="card-elevated hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setSelectedJob(job)}>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-start gap-4">
                      {/* Company Logo Placeholder */}
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center shrink-0">
                        <Building2 className="w-7 h-7 text-primary" />
                      </div>

                      {/* Job Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h3 className="text-xl font-display font-semibold mb-1">{job.title}</h3>
                            <p className="text-muted-foreground">{job.company}</p>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleSave(job.id);
                              }}
                            >
                              <Bookmark className={`w-5 h-5 ${savedJobs.includes(job.id) ? 'fill-current text-primary' : ''}`} />
                            </Button>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {job.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Briefcase className="w-4 h-4" />
                            {job.experience}
                          </span>
                          {job.salary && (
                            <span className="flex items-center gap-1">
                              <DollarSign className="w-4 h-4" />
                              {job.salary}
                            </span>
                          )}
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {formatDistanceToNow(new Date(job.createdAt), { addSuffix: true })}
                          </span>
                        </div>

                        <div className="flex flex-wrap gap-2 mt-4">
                          <Badge variant={jobTypeColors[job.type] as any}>{job.type}</Badge>
                          {job.skills.slice(0, 4).map(skill => (
                            <Badge key={skill} variant="outline">{skill}</Badge>
                          ))}
                          {job.skills.length > 4 && (
                            <Badge variant="outline">+{job.skills.length - 4}</Badge>
                          )}
                        </div>

                        <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>Posted by: <strong className="text-foreground">{job.postedByName}</strong></span>
                            <span>{job.applicationsCount} applicants</span>
                          </div>
                          {appliedJobs.includes(job.id) ? (
                            <Badge variant="success" className="gap-1">
                              <CheckCircle className="w-3 h-3" />
                              Applied
                            </Badge>
                          ) : (
                            <Button
                              variant="gradient"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedJob(job);
                                setShowApplyModal(true);
                              }}
                            >
                              Apply Now
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {filteredJobs.length === 0 && (
            <div className="text-center py-12">
              <Briefcase className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No jobs found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filters</p>
            </div>
          )}
        </div>

        {/* Job Detail Modal */}
        <Dialog open={!!selectedJob && !showApplyModal} onOpenChange={() => setSelectedJob(null)}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            {selectedJob && (
              <>
                <DialogHeader>
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                      <Building2 className="w-7 h-7 text-primary" />
                    </div>
                    <div>
                      <DialogTitle className="text-2xl font-display">{selectedJob.title}</DialogTitle>
                      <DialogDescription className="text-base">{selectedJob.company}</DialogDescription>
                    </div>
                  </div>
                </DialogHeader>

                <div className="space-y-6">
                  {/* Meta Info */}
                  <div className="flex flex-wrap gap-4 text-sm">
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      {selectedJob.location}
                    </span>
                    <Badge variant={jobTypeColors[selectedJob.type] as any}>{selectedJob.type}</Badge>
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <Briefcase className="w-4 h-4" />
                      {selectedJob.experience}
                    </span>
                    {selectedJob.salary && (
                      <span className="flex items-center gap-1 text-muted-foreground">
                        <DollarSign className="w-4 h-4" />
                        {selectedJob.salary}
                      </span>
                    )}
                  </div>

                  {/* Description */}
                  <div>
                    <h4 className="font-semibold mb-2">Description</h4>
                    <p className="text-muted-foreground">{selectedJob.description}</p>
                  </div>

                  {/* Requirements */}
                  <div>
                    <h4 className="font-semibold mb-2">Requirements</h4>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      {selectedJob.requirements.map((req, i) => (
                        <li key={i}>{req}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Skills */}
                  <div>
                    <h4 className="font-semibold mb-2">Required Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedJob.skills.map(skill => (
                        <Badge key={skill} variant="secondary">{skill}</Badge>
                      ))}
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center gap-6 text-sm text-muted-foreground pt-4 border-t border-border">
                    <span>Posted by: <strong className="text-foreground">{selectedJob.postedByName}</strong></span>
                    <span>{selectedJob.applicationsCount} applicants</span>
                    <span>Deadline: {selectedJob.applicationDeadline}</span>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 pt-4">
                    {appliedJobs.includes(selectedJob.id) ? (
                      <Button variant="success" className="flex-1" disabled>
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Already Applied
                      </Button>
                    ) : (
                      <Button variant="gradient" className="flex-1" onClick={() => setShowApplyModal(true)}>
                        Apply Now
                      </Button>
                    )}
                    <Button variant="outline" onClick={() => handleSave(selectedJob.id)}>
                      <Bookmark className={`w-4 h-4 mr-2 ${savedJobs.includes(selectedJob.id) ? 'fill-current' : ''}`} />
                      {savedJobs.includes(selectedJob.id) ? 'Saved' : 'Save'}
                    </Button>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>

        {/* Apply Modal */}
        <Dialog open={showApplyModal} onOpenChange={setShowApplyModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="font-display">Apply for {selectedJob?.title}</DialogTitle>
              <DialogDescription>Submit your application to {selectedJob?.company}</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm font-medium mb-2">Your Profile</p>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p><strong>Name:</strong> {user?.name}</p>
                  <p><strong>Email:</strong> {user?.email}</p>
                  <p><strong>Current Role:</strong> {user?.designation} at {user?.company}</p>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Cover Letter (Optional)</label>
                <Textarea
                  placeholder="Tell them why you're a great fit for this role..."
                  className="min-h-[120px]"
                />
              </div>
              <div className="flex gap-3">
                <Button variant="outline" className="flex-1" onClick={() => setShowApplyModal(false)}>
                  Cancel
                </Button>
                <Button variant="gradient" className="flex-1" onClick={() => handleApply(selectedJob!.id)}>
                  Submit Application
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </AlumniLayout>
  );
}
