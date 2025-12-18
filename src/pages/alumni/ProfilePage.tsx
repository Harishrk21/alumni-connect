import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  MapPin,
  Building2,
  Mail,
  Phone,
  Linkedin,
  Github,
  Edit2,
  Camera,
  CheckCircle,
  Calendar,
  Award,
  Plus,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AlumniLayout from '@/layouts/AlumniLayout';
import { postsData, alumniData } from '@/data/mockData';
import { useAuth } from '@/contexts/AuthContext';

export default function ProfilePage() {
  const { user } = useAuth();
  
  // Use mock data for demo
  const profileData = alumniData.find(a => a.email === user?.email) || alumniData[0];
  const userPosts = postsData.filter(p => p.userName === profileData.name);

  const experience = [
    {
      id: '1',
      company: profileData.company,
      role: profileData.designation,
      startDate: '2022-06',
      current: true,
      description: 'Leading development of cloud infrastructure and scalable systems.',
    },
    {
      id: '2',
      company: 'Microsoft',
      role: 'Junior Developer',
      startDate: '2020-07',
      endDate: '2022-05',
      current: false,
      description: 'Developed enterprise applications and microservices.',
    },
  ];

  return (
    <AlumniLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Cover & Profile Header */}
          <Card className="card-elevated overflow-hidden mb-6">
            {/* Cover Photo */}
            <div className="h-48 bg-gradient-to-br from-primary to-secondary relative">
              <Button 
                variant="hero" 
                size="sm" 
                className="absolute bottom-4 right-4"
              >
                <Camera className="w-4 h-4 mr-2" />
                Edit Cover
              </Button>
            </div>

            {/* Profile Info */}
            <div className="relative px-6 pb-6">
              <div className="flex flex-col md:flex-row md:items-end gap-4 -mt-16">
                <div className="relative">
                  <Avatar className="w-32 h-32 border-4 border-card">
                    <AvatarImage src={profileData.avatar} />
                    <AvatarFallback className="bg-primary text-primary-foreground text-4xl">
                      {profileData.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <Button size="icon" className="absolute bottom-0 right-0 w-8 h-8 rounded-full">
                    <Camera className="w-4 h-4" />
                  </Button>
                </div>

                <div className="flex-1 pt-4 md:pt-0">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h1 className="text-2xl font-display font-bold">{profileData.name}</h1>
                        {profileData.isVerified && (
                          <Badge variant="verified" className="gap-1">
                            <CheckCircle className="w-3 h-3" />
                            Verified
                          </Badge>
                        )}
                      </div>
                      <p className="text-muted-foreground">
                        {profileData.designation} at {profileData.company}
                      </p>
                      <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {profileData.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Building2 className="w-4 h-4" />
                          Batch {profileData.batch} • {profileData.department}
                        </span>
                      </div>
                    </div>
                    <Button variant="gradient">
                      <Edit2 className="w-4 h-4 mr-2" />
                      Edit Profile
                    </Button>
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div className="flex gap-4 mt-6">
                {profileData.linkedin && (
                  <Button variant="outline" size="sm">
                    <Linkedin className="w-4 h-4 mr-2" />
                    LinkedIn
                  </Button>
                )}
                {profileData.github && (
                  <Button variant="outline" size="sm">
                    <Github className="w-4 h-4 mr-2" />
                    GitHub
                  </Button>
                )}
                <Button variant="outline" size="sm">
                  <Mail className="w-4 h-4 mr-2" />
                  Contact
                </Button>
              </div>
            </div>
          </Card>

          {/* Profile Tabs */}
          <Tabs defaultValue="about" className="space-y-6">
            <TabsList className="w-full justify-start">
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="experience">Experience</TabsTrigger>
              <TabsTrigger value="education">Education</TabsTrigger>
              <TabsTrigger value="posts">Posts</TabsTrigger>
            </TabsList>

            {/* About Tab */}
            <TabsContent value="about">
              <div className="grid gap-6">
                <Card className="card-elevated">
                  <CardHeader>
                    <CardTitle className="font-display">Bio</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{profileData.bio}</p>
                  </CardContent>
                </Card>

                <Card className="card-elevated">
                  <CardHeader>
                    <CardTitle className="font-display">Skills</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {profileData.skills.map(skill => (
                        <Badge key={skill} variant="secondary">{skill}</Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="card-elevated">
                  <CardHeader>
                    <CardTitle className="font-display">Contact Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-muted-foreground" />
                      <span>{profileData.email}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-muted-foreground" />
                      <span>{profileData.phone}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Experience Tab */}
            <TabsContent value="experience">
              <Card className="card-elevated">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="font-display">Career Timeline</CardTitle>
                  <Button variant="outline" size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Experience
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="relative">
                    {/* Timeline line */}
                    <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border" />
                    
                    <div className="space-y-8">
                      {experience.map((exp, index) => (
                        <motion.div
                          key={exp.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="relative flex gap-6"
                        >
                          {/* Timeline dot */}
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 z-10 ${
                            exp.current ? 'bg-primary text-primary-foreground' : 'bg-muted'
                          }`}>
                            <Building2 className="w-6 h-6" />
                          </div>
                          
                          <div className="flex-1 bg-muted/50 rounded-lg p-4">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h4 className="font-semibold">{exp.role}</h4>
                                <p className="text-muted-foreground">{exp.company}</p>
                              </div>
                              {exp.current && (
                                <Badge variant="success">Current</Badge>
                              )}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                              <Calendar className="w-4 h-4" />
                              <span>
                                {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground">{exp.description}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Education Tab */}
            <TabsContent value="education">
              <Card className="card-elevated">
                <CardHeader>
                  <CardTitle className="font-display">Education</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                      <Award className="w-7 h-7 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold">{profileData.degree} in {profileData.department}</h4>
                      <p className="text-muted-foreground">College Name</p>
                      <p className="text-sm text-muted-foreground">
                        Batch {profileData.batch} • Graduated {profileData.graduationYear}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Roll Number: {profileData.rollNumber}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Posts Tab */}
            <TabsContent value="posts">
              <Card className="card-elevated">
                <CardHeader>
                  <CardTitle className="font-display">Posts ({userPosts.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  {userPosts.length > 0 ? (
                    <div className="space-y-4">
                      {userPosts.map(post => (
                        <div key={post.id} className="p-4 bg-muted/50 rounded-lg">
                          <p className="mb-2">{post.content}</p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>{post.likes.length} likes</span>
                            <span>{post.comments.length} comments</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground text-center py-8">No posts yet</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </AlumniLayout>
  );
}
