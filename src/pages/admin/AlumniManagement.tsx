import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Filter,
  MoreVertical,
  CheckCircle,
  XCircle,
  Eye,
  Trash2,
  Download,
  Mail,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import AdminLayout from '@/layouts/AdminLayout';
import { alumniData, Alumni } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';

export default function AlumniManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState<string>('all');
  const [selectedBatch, setSelectedBatch] = useState<string>('all');
  const [selectedAlumni, setSelectedAlumni] = useState<string[]>([]);
  const [viewAlumni, setViewAlumni] = useState<Alumni | null>(null);
  const { toast } = useToast();

  const filteredAlumni = alumniData.filter(alumni => {
    const matchesSearch = alumni.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         alumni.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         alumni.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDept = selectedDept === 'all' || alumni.department === selectedDept;
    const matchesBatch = selectedBatch === 'all' || alumni.batch === selectedBatch;
    return matchesSearch && matchesDept && matchesBatch;
  });

  const pendingAlumni = filteredAlumni.filter(a => a.status === 'pending');
  const verifiedAlumni = filteredAlumni.filter(a => a.status === 'verified');
  const rejectedAlumni = filteredAlumni.filter(a => a.status === 'rejected');

  const handleApprove = (id: string) => {
    toast({
      title: 'Alumni Approved',
      description: 'The alumni profile has been verified successfully.',
    });
  };

  const handleReject = (id: string) => {
    toast({
      title: 'Alumni Rejected',
      description: 'The alumni profile has been rejected.',
      variant: 'destructive',
    });
  };

  const handleBulkApprove = () => {
    toast({
      title: 'Bulk Approval',
      description: `${selectedAlumni.length} alumni profiles have been approved.`,
    });
    setSelectedAlumni([]);
  };

  const toggleSelect = (id: string) => {
    setSelectedAlumni(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = (alumni: Alumni[]) => {
    const ids = alumni.map(a => a.id);
    const allSelected = ids.every(id => selectedAlumni.includes(id));
    setSelectedAlumni(allSelected ? [] : ids);
  };

  const departments = [...new Set(alumniData.map(a => a.department))];
  const batches = [...new Set(alumniData.map(a => a.batch))].sort();

  const AlumniTable = ({ alumni, showCheckbox = false }: { alumni: Alumni[], showCheckbox?: boolean }) => (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-border">
            {showCheckbox && (
              <th className="p-4 text-left">
                <Checkbox 
                  checked={alumni.every(a => selectedAlumni.includes(a.id))}
                  onCheckedChange={() => toggleSelectAll(alumni)}
                />
              </th>
            )}
            <th className="p-4 text-left text-sm font-medium text-muted-foreground">Alumni</th>
            <th className="p-4 text-left text-sm font-medium text-muted-foreground hidden md:table-cell">Batch</th>
            <th className="p-4 text-left text-sm font-medium text-muted-foreground hidden lg:table-cell">Department</th>
            <th className="p-4 text-left text-sm font-medium text-muted-foreground hidden xl:table-cell">Company</th>
            <th className="p-4 text-left text-sm font-medium text-muted-foreground">Status</th>
            <th className="p-4 text-right text-sm font-medium text-muted-foreground">Actions</th>
          </tr>
        </thead>
        <tbody>
          {alumni.map((alum, index) => (
            <motion.tr
              key={alum.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="border-b border-border hover:bg-muted/50 transition-colors"
            >
              {showCheckbox && (
                <td className="p-4">
                  <Checkbox 
                    checked={selectedAlumni.includes(alum.id)}
                    onCheckedChange={() => toggleSelect(alum.id)}
                  />
                </td>
              )}
              <td className="p-4">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={alum.avatar} />
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {alum.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{alum.name}</p>
                    <p className="text-sm text-muted-foreground">{alum.email}</p>
                  </div>
                </div>
              </td>
              <td className="p-4 hidden md:table-cell">
                <Badge variant="outline">{alum.batch}</Badge>
              </td>
              <td className="p-4 hidden lg:table-cell text-sm">{alum.department}</td>
              <td className="p-4 hidden xl:table-cell text-sm">{alum.company}</td>
              <td className="p-4">
                <Badge 
                  variant={
                    alum.status === 'verified' ? 'verified' : 
                    alum.status === 'pending' ? 'pending' : 'rejected'
                  }
                >
                  {alum.status}
                </Badge>
              </td>
              <td className="p-4">
                <div className="flex items-center justify-end gap-2">
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => setViewAlumni(alum)}
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => setViewAlumni(alum)}>
                        <Eye className="w-4 h-4 mr-2" />
                        View Profile
                      </DropdownMenuItem>
                      {alum.status === 'pending' && (
                        <>
                          <DropdownMenuItem onClick={() => handleApprove(alum.id)}>
                            <CheckCircle className="w-4 h-4 mr-2 text-success" />
                            Approve
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleReject(alum.id)}>
                            <XCircle className="w-4 h-4 mr-2 text-destructive" />
                            Reject
                          </DropdownMenuItem>
                        </>
                      )}
                      <DropdownMenuItem>
                        <Mail className="w-4 h-4 mr-2" />
                        Send Email
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
      {alumni.length === 0 && (
        <div className="p-8 text-center text-muted-foreground">
          No alumni found matching your criteria.
        </div>
      )}
    </div>
  );

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-display font-bold">Alumni Management</h1>
            <p className="text-muted-foreground">Manage and verify alumni profiles</p>
          </div>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
        </div>

        {/* Filters */}
        <Card className="card-elevated">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name, email, or company..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Select value={selectedDept} onValueChange={setSelectedDept}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  {departments.map(d => (
                    <SelectItem key={d} value={d}>{d}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedBatch} onValueChange={setSelectedBatch}>
                <SelectTrigger className="w-full md:w-32">
                  <SelectValue placeholder="Batch" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Batches</SelectItem>
                  {batches.map(b => (
                    <SelectItem key={b} value={b}>{b}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="pending" className="space-y-4">
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="pending" className="gap-2">
                Pending
                <Badge variant="pending" className="ml-1">{pendingAlumni.length}</Badge>
              </TabsTrigger>
              <TabsTrigger value="verified" className="gap-2">
                Verified
                <Badge variant="verified" className="ml-1">{verifiedAlumni.length}</Badge>
              </TabsTrigger>
              <TabsTrigger value="rejected" className="gap-2">
                Rejected
                <Badge variant="rejected" className="ml-1">{rejectedAlumni.length}</Badge>
              </TabsTrigger>
            </TabsList>

            {selectedAlumni.length > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  {selectedAlumni.length} selected
                </span>
                <Button variant="success" size="sm" onClick={handleBulkApprove}>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Approve Selected
                </Button>
              </div>
            )}
          </div>

          <Card className="card-elevated overflow-hidden">
            <TabsContent value="pending" className="m-0">
              <AlumniTable alumni={pendingAlumni} showCheckbox />
            </TabsContent>
            <TabsContent value="verified" className="m-0">
              <AlumniTable alumni={verifiedAlumni} />
            </TabsContent>
            <TabsContent value="rejected" className="m-0">
              <AlumniTable alumni={rejectedAlumni} />
            </TabsContent>
          </Card>
        </Tabs>

        {/* View Alumni Dialog */}
        <Dialog open={!!viewAlumni} onOpenChange={() => setViewAlumni(null)}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            {viewAlumni && (
              <>
                <DialogHeader>
                  <DialogTitle className="font-display">Alumni Profile</DialogTitle>
                  <DialogDescription>View detailed information</DialogDescription>
                </DialogHeader>
                
                <div className="space-y-6">
                  {/* Profile Header */}
                  <div className="flex items-center gap-4">
                    <Avatar className="w-20 h-20">
                      <AvatarImage src={viewAlumni.avatar} />
                      <AvatarFallback className="bg-primary/10 text-primary text-2xl">
                        {viewAlumni.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-xl font-display font-semibold">{viewAlumni.name}</h3>
                        <Badge variant={viewAlumni.status === 'verified' ? 'verified' : viewAlumni.status === 'pending' ? 'pending' : 'rejected'}>
                          {viewAlumni.status}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground">{viewAlumni.designation} at {viewAlumni.company}</p>
                      <p className="text-sm text-muted-foreground">{viewAlumni.location}</p>
                    </div>
                  </div>

                  {/* Details Grid */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <h4 className="font-medium text-sm text-muted-foreground">Contact Information</h4>
                      <div className="space-y-2">
                        <p className="text-sm"><strong>Email:</strong> {viewAlumni.email}</p>
                        <p className="text-sm"><strong>Phone:</strong> {viewAlumni.phone}</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <h4 className="font-medium text-sm text-muted-foreground">Academic Details</h4>
                      <div className="space-y-2">
                        <p className="text-sm"><strong>Roll Number:</strong> {viewAlumni.rollNumber}</p>
                        <p className="text-sm"><strong>Batch:</strong> {viewAlumni.batch}</p>
                        <p className="text-sm"><strong>Department:</strong> {viewAlumni.department}</p>
                        <p className="text-sm"><strong>Degree:</strong> {viewAlumni.degree}</p>
                      </div>
                    </div>
                  </div>

                  {/* Skills */}
                  <div className="space-y-3">
                    <h4 className="font-medium text-sm text-muted-foreground">Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {viewAlumni.skills.map(skill => (
                        <Badge key={skill} variant="secondary">{skill}</Badge>
                      ))}
                    </div>
                  </div>

                  {/* Bio */}
                  <div className="space-y-3">
                    <h4 className="font-medium text-sm text-muted-foreground">Bio</h4>
                    <p className="text-sm">{viewAlumni.bio}</p>
                  </div>

                  {/* Actions */}
                  {viewAlumni.status === 'pending' && (
                    <div className="flex gap-3 pt-4 border-t border-border">
                      <Button 
                        variant="success" 
                        className="flex-1"
                        onClick={() => {
                          handleApprove(viewAlumni.id);
                          setViewAlumni(null);
                        }}
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Approve Profile
                      </Button>
                      <Button 
                        variant="destructive" 
                        className="flex-1"
                        onClick={() => {
                          handleReject(viewAlumni.id);
                          setViewAlumni(null);
                        }}
                      >
                        <XCircle className="w-4 h-4 mr-2" />
                        Reject Profile
                      </Button>
                    </div>
                  )}
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}
