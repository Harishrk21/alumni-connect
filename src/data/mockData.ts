// Mock Data for ALUMNEXUS Platform

export interface Alumni {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  batch: string;
  department: string;
  company: string;
  designation: string;
  phone: string;
  rollNumber: string;
  graduationYear: string;
  degree: string;
  skills: string[];
  bio: string;
  location: string;
  linkedin?: string;
  github?: string;
  isVerified: boolean;
  status: 'pending' | 'verified' | 'rejected';
  registrationDate: string;
  experience: Experience[];
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string;
}

export interface Post {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  userCompany: string;
  userDesignation: string;
  content: string;
  images: string[];
  likes: string[];
  comments: Comment[];
  visibility: 'public' | 'batch';
  createdAt: string;
}

export interface Comment {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  content: string;
  createdAt: string;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'full-time' | 'part-time' | 'internship' | 'contract';
  experience: string;
  skills: string[];
  salary?: string;
  description: string;
  requirements: string[];
  postedBy: 'admin' | string;
  postedByName: string;
  applicationDeadline: string;
  applicationsCount: number;
  status: 'active' | 'closed';
  createdAt: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  venue: string;
  category: 'reunion' | 'workshop' | 'seminar' | 'sports' | 'networking';
  maxAttendees: number;
  currentAttendees: number;
  rsvpDeadline: string;
  banner?: string;
  registeredUsers: string[];
}

export interface Circular {
  id: string;
  title: string;
  content: string;
  priority: 'high' | 'medium' | 'low';
  targetAudience: 'all' | string;
  expiryDate?: string;
  attachment?: string;
  viewCount: number;
  status: 'draft' | 'published';
  createdAt: string;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;
  read: boolean;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'job' | 'application' | 'post' | 'message' | 'event' | 'mentorship';
  title: string;
  message: string;
  read: boolean;
  link?: string;
  createdAt: string;
}

// Generate 50+ alumni profiles
export const alumniData: Alumni[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john@alumni.com',
    batch: '2020',
    department: 'Computer Science',
    company: 'Google',
    designation: 'Software Engineer',
    phone: '+1234567890',
    rollNumber: 'CS2020001',
    graduationYear: '2020',
    degree: 'B.Tech',
    skills: ['React', 'Node.js', 'Python', 'Machine Learning'],
    bio: 'Passionate software engineer with 4 years of experience in building scalable applications.',
    location: 'San Francisco, CA',
    linkedin: 'linkedin.com/in/johnsmith',
    github: 'github.com/johnsmith',
    isVerified: true,
    status: 'verified',
    registrationDate: '2024-01-15',
    experience: [
      { id: '1', company: 'Google', role: 'Software Engineer', startDate: '2022-06', current: true, description: 'Building cloud infrastructure' },
      { id: '2', company: 'Microsoft', role: 'Junior Developer', startDate: '2020-07', endDate: '2022-05', current: false, description: 'Developed enterprise applications' },
    ],
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah@alumni.com',
    batch: '2019',
    department: 'Electrical Engineering',
    company: 'Tesla',
    designation: 'Product Manager',
    phone: '+1234567891',
    rollNumber: 'EE2019001',
    graduationYear: '2019',
    degree: 'B.Tech',
    skills: ['Product Management', 'Agile', 'Data Analysis', 'EV Systems'],
    bio: 'Product manager focused on electric vehicle innovation and sustainable technology.',
    location: 'Austin, TX',
    isVerified: true,
    status: 'verified',
    registrationDate: '2024-02-01',
    experience: [
      { id: '1', company: 'Tesla', role: 'Product Manager', startDate: '2021-03', current: true, description: 'Leading EV battery product line' },
    ],
  },
  {
    id: '3',
    name: 'Michael Chen',
    email: 'michael.chen@alumni.com',
    batch: '2018',
    department: 'Mechanical Engineering',
    company: 'Boeing',
    designation: 'Aerospace Engineer',
    phone: '+1234567892',
    rollNumber: 'ME2018015',
    graduationYear: '2018',
    degree: 'M.Tech',
    skills: ['CAD', 'Aerodynamics', 'Simulation', 'Project Management'],
    bio: 'Aerospace engineer specializing in aircraft design and aerodynamics.',
    location: 'Seattle, WA',
    isVerified: true,
    status: 'verified',
    registrationDate: '2024-01-20',
    experience: [],
  },
  {
    id: '4',
    name: 'Emily Williams',
    email: 'emily.w@alumni.com',
    batch: '2021',
    department: 'Computer Science',
    company: 'Meta',
    designation: 'Data Scientist',
    phone: '+1234567893',
    rollNumber: 'CS2021042',
    graduationYear: '2021',
    degree: 'B.Tech',
    skills: ['Python', 'TensorFlow', 'SQL', 'Statistics', 'Deep Learning'],
    bio: 'Data scientist passionate about machine learning and AI research.',
    location: 'Menlo Park, CA',
    isVerified: true,
    status: 'verified',
    registrationDate: '2024-02-15',
    experience: [],
  },
  {
    id: '5',
    name: 'David Kumar',
    email: 'david.kumar@alumni.com',
    batch: '2017',
    department: 'Civil Engineering',
    company: 'AECOM',
    designation: 'Senior Civil Engineer',
    phone: '+1234567894',
    rollNumber: 'CE2017008',
    graduationYear: '2017',
    degree: 'B.Tech',
    skills: ['AutoCAD', 'Structural Analysis', 'Project Planning', 'BIM'],
    bio: 'Senior civil engineer with expertise in infrastructure development.',
    location: 'New York, NY',
    isVerified: true,
    status: 'verified',
    registrationDate: '2024-01-10',
    experience: [],
  },
  {
    id: '6',
    name: 'Jessica Lee',
    email: 'jessica.lee@alumni.com',
    batch: '2022',
    department: 'Information Technology',
    company: 'Amazon',
    designation: 'Cloud Solutions Architect',
    phone: '+1234567895',
    rollNumber: 'IT2022003',
    graduationYear: '2022',
    degree: 'B.Tech',
    skills: ['AWS', 'Cloud Architecture', 'DevOps', 'Kubernetes'],
    bio: 'Cloud architect helping companies scale their infrastructure.',
    location: 'Seattle, WA',
    isVerified: false,
    status: 'pending',
    registrationDate: '2024-03-01',
    experience: [],
  },
  {
    id: '7',
    name: 'Robert Martinez',
    email: 'robert.m@alumni.com',
    batch: '2016',
    department: 'Electronics',
    company: 'NVIDIA',
    designation: 'Hardware Engineer',
    phone: '+1234567896',
    rollNumber: 'EC2016021',
    graduationYear: '2016',
    degree: 'M.Tech',
    skills: ['VLSI', 'GPU Architecture', 'Embedded Systems'],
    bio: 'Hardware engineer working on next-gen GPU technology.',
    location: 'Santa Clara, CA',
    isVerified: true,
    status: 'verified',
    registrationDate: '2024-01-25',
    experience: [],
  },
  {
    id: '8',
    name: 'Amanda Brown',
    email: 'amanda.b@alumni.com',
    batch: '2020',
    department: 'Computer Science',
    company: 'Stripe',
    designation: 'Backend Engineer',
    phone: '+1234567897',
    rollNumber: 'CS2020018',
    graduationYear: '2020',
    degree: 'B.Tech',
    skills: ['Ruby', 'Go', 'Payments', 'API Design'],
    bio: 'Backend engineer building payment infrastructure at scale.',
    location: 'San Francisco, CA',
    isVerified: true,
    status: 'verified',
    registrationDate: '2024-02-05',
    experience: [],
  },
  {
    id: '9',
    name: 'Thomas Wilson',
    email: 'thomas.w@alumni.com',
    batch: '2019',
    department: 'Chemical Engineering',
    company: 'ExxonMobil',
    designation: 'Process Engineer',
    phone: '+1234567898',
    rollNumber: 'CH2019005',
    graduationYear: '2019',
    degree: 'B.Tech',
    skills: ['Process Simulation', 'Chemical Process Design', 'Safety Engineering'],
    bio: 'Process engineer optimizing refinery operations.',
    location: 'Houston, TX',
    isVerified: false,
    status: 'pending',
    registrationDate: '2024-03-05',
    experience: [],
  },
  {
    id: '10',
    name: 'Priya Sharma',
    email: 'priya.sharma@alumni.com',
    batch: '2021',
    department: 'Computer Science',
    company: 'Netflix',
    designation: 'UI Engineer',
    phone: '+1234567899',
    rollNumber: 'CS2021007',
    graduationYear: '2021',
    degree: 'B.Tech',
    skills: ['React', 'TypeScript', 'CSS', 'Animation', 'A/B Testing'],
    bio: 'UI engineer crafting delightful streaming experiences.',
    location: 'Los Gatos, CA',
    isVerified: true,
    status: 'verified',
    registrationDate: '2024-02-10',
    experience: [],
  },
];

// Generate more alumni dynamically
const departments = ['Computer Science', 'Electrical Engineering', 'Mechanical Engineering', 'Civil Engineering', 'Chemical Engineering', 'Information Technology', 'Electronics'];
const companies = ['Google', 'Microsoft', 'Apple', 'Amazon', 'Meta', 'Netflix', 'Tesla', 'NVIDIA', 'Adobe', 'Salesforce', 'Oracle', 'IBM', 'Intel', 'Cisco', 'VMware'];
const designations = ['Software Engineer', 'Senior Developer', 'Product Manager', 'Data Scientist', 'Team Lead', 'Architect', 'Consultant', 'Manager'];
const locations = ['San Francisco, CA', 'New York, NY', 'Seattle, WA', 'Austin, TX', 'Boston, MA', 'Chicago, IL', 'Denver, CO', 'Los Angeles, CA'];

for (let i = 11; i <= 55; i++) {
  const batch = String(2015 + Math.floor(Math.random() * 9));
  const dept = departments[Math.floor(Math.random() * departments.length)];
  const statuses: Alumni['status'][] = ['verified', 'verified', 'verified', 'pending', 'rejected'];
  const status = statuses[Math.floor(Math.random() * statuses.length)];
  
  alumniData.push({
    id: String(i),
    name: `Alumni ${i}`,
    email: `alumni${i}@example.com`,
    batch,
    department: dept,
    company: companies[Math.floor(Math.random() * companies.length)],
    designation: designations[Math.floor(Math.random() * designations.length)],
    phone: `+123456${String(i).padStart(4, '0')}`,
    rollNumber: `${dept.slice(0, 2).toUpperCase()}${batch}${String(i).padStart(3, '0')}`,
    graduationYear: batch,
    degree: Math.random() > 0.7 ? 'M.Tech' : 'B.Tech',
    skills: ['Skill 1', 'Skill 2', 'Skill 3'],
    bio: `Professional with experience in ${dept}.`,
    location: locations[Math.floor(Math.random() * locations.length)],
    isVerified: status === 'verified',
    status,
    registrationDate: `2024-0${Math.floor(Math.random() * 3) + 1}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
    experience: [],
  });
}

// Posts data
export const postsData: Post[] = [
  {
    id: '1',
    userId: '1',
    userName: 'John Smith',
    userCompany: 'Google',
    userDesignation: 'Software Engineer',
    content: "Just completed a major milestone at work! 🎉 Our team successfully launched a new feature that improves search performance by 40%. Grateful for the amazing team and the learning opportunities. #Tech #Engineering #Google",
    images: [],
    likes: ['2', '3', '4', '5', '6'],
    comments: [
      { id: '1', userId: '2', userName: 'Sarah Johnson', content: 'Congratulations John! That\'s an incredible achievement!', createdAt: '2024-03-10T09:30:00' },
      { id: '2', userId: '4', userName: 'Emily Williams', content: 'Amazing work! Would love to hear more about the technical challenges.', createdAt: '2024-03-10T10:15:00' },
    ],
    visibility: 'public',
    createdAt: '2024-03-10T08:00:00',
  },
  {
    id: '2',
    userId: '2',
    userName: 'Sarah Johnson',
    userCompany: 'Tesla',
    userDesignation: 'Product Manager',
    content: "Excited to share that we're hiring! Looking for talented engineers to join our EV team at Tesla. If you're passionate about sustainable energy and innovation, reach out! 🚗⚡ #Hiring #Tesla #EV",
    images: [],
    likes: ['1', '3', '7', '8'],
    comments: [
      { id: '1', userId: '6', userName: 'Jessica Lee', content: 'This is great! Just submitted my application!', createdAt: '2024-03-09T14:00:00' },
    ],
    visibility: 'public',
    createdAt: '2024-03-09T12:00:00',
  },
  {
    id: '3',
    userId: '4',
    userName: 'Emily Williams',
    userCompany: 'Meta',
    userDesignation: 'Data Scientist',
    content: "Just published my first research paper on deep learning applications in social media analytics! 📊 It's been a journey of late nights and countless experiments. Thanks to everyone who supported me. Link in comments!",
    images: [],
    likes: ['1', '2', '5', '6', '7', '8', '10'],
    comments: [
      { id: '1', userId: '1', userName: 'John Smith', content: 'Incredible work Emily! Can\'t wait to read it.', createdAt: '2024-03-08T16:30:00' },
      { id: '2', userId: '3', userName: 'Michael Chen', content: 'Congratulations! This is a huge accomplishment!', createdAt: '2024-03-08T17:00:00' },
    ],
    visibility: 'public',
    createdAt: '2024-03-08T15:00:00',
  },
  {
    id: '4',
    userId: '10',
    userName: 'Priya Sharma',
    userCompany: 'Netflix',
    userDesignation: 'UI Engineer',
    content: "Reflecting on my journey from campus to Netflix... 3 years ago, I was just another student dreaming of working in tech. Today, I'm building interfaces used by millions. Never stop believing in yourself! 💪 #Journey #Netflix #TechCareer",
    images: [],
    likes: ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
    comments: [
      { id: '1', userId: '2', userName: 'Sarah Johnson', content: 'Such an inspiring story Priya! You deserve all the success!', createdAt: '2024-03-07T11:00:00' },
    ],
    visibility: 'public',
    createdAt: '2024-03-07T10:00:00',
  },
  {
    id: '5',
    userId: '3',
    userName: 'Michael Chen',
    userCompany: 'Boeing',
    userDesignation: 'Aerospace Engineer',
    content: "Had an amazing time mentoring students at our college's career fair yesterday! It was surreal being back on campus. To all current students - make the most of your college years, network actively, and never stop learning. The industry needs fresh perspectives!",
    images: [],
    likes: ['1', '4', '5', '8'],
    comments: [],
    visibility: 'public',
    createdAt: '2024-03-06T18:00:00',
  },
];

// Jobs data
export const jobsData: Job[] = [
  {
    id: '1',
    title: 'Senior Software Engineer',
    company: 'Google',
    location: 'Mountain View, CA',
    type: 'full-time',
    experience: '5+ years',
    skills: ['Java', 'Python', 'Distributed Systems', 'Cloud'],
    salary: '$180,000 - $250,000',
    description: 'Join our team to build next-generation cloud infrastructure. You will work on large-scale distributed systems serving billions of users.',
    requirements: ['5+ years of software engineering experience', 'Strong CS fundamentals', 'Experience with distributed systems', 'Excellent communication skills'],
    postedBy: 'admin',
    postedByName: 'Admin',
    applicationDeadline: '2024-04-15',
    applicationsCount: 42,
    status: 'active',
    createdAt: '2024-03-01',
  },
  {
    id: '2',
    title: 'Product Manager',
    company: 'Tesla',
    location: 'Austin, TX',
    type: 'full-time',
    experience: '3-5 years',
    skills: ['Product Management', 'Agile', 'EV Industry', 'Data Analysis'],
    salary: '$150,000 - $200,000',
    description: 'Lead product development for our next-generation electric vehicles. Work with engineering and design teams to deliver innovative features.',
    requirements: ['3+ years PM experience', 'Technical background preferred', 'Passion for EVs', 'Strong analytical skills'],
    postedBy: '2',
    postedByName: 'Sarah Johnson',
    applicationDeadline: '2024-04-20',
    applicationsCount: 28,
    status: 'active',
    createdAt: '2024-03-05',
  },
  {
    id: '3',
    title: 'Data Scientist',
    company: 'Meta',
    location: 'Menlo Park, CA',
    type: 'full-time',
    experience: '2-4 years',
    skills: ['Python', 'Machine Learning', 'SQL', 'Deep Learning', 'Statistics'],
    salary: '$140,000 - $190,000',
    description: 'Apply machine learning to solve complex problems in social media analytics. Build models that impact billions of users.',
    requirements: ['MS/PhD in CS, Statistics, or related field', 'Strong ML fundamentals', 'Experience with PyTorch/TensorFlow', 'Published research is a plus'],
    postedBy: 'admin',
    postedByName: 'Admin',
    applicationDeadline: '2024-04-10',
    applicationsCount: 67,
    status: 'active',
    createdAt: '2024-02-28',
  },
  {
    id: '4',
    title: 'Frontend Developer Intern',
    company: 'Netflix',
    location: 'Remote',
    type: 'internship',
    experience: '0-1 years',
    skills: ['React', 'TypeScript', 'CSS', 'JavaScript'],
    salary: '$50/hour',
    description: 'Join our UI team for a summer internship. Work on real features used by millions of Netflix users worldwide.',
    requirements: ['Currently pursuing CS degree', 'Strong React skills', 'Eye for design', 'Available for 12-week internship'],
    postedBy: '10',
    postedByName: 'Priya Sharma',
    applicationDeadline: '2024-03-30',
    applicationsCount: 156,
    status: 'active',
    createdAt: '2024-03-08',
  },
  {
    id: '5',
    title: 'Cloud Solutions Architect',
    company: 'Amazon',
    location: 'Seattle, WA',
    type: 'full-time',
    experience: '5+ years',
    skills: ['AWS', 'Cloud Architecture', 'DevOps', 'Kubernetes', 'Terraform'],
    salary: '$160,000 - $220,000',
    description: 'Design and implement cloud solutions for enterprise clients. Lead technical discussions and architecture reviews.',
    requirements: ['5+ years cloud experience', 'AWS certifications preferred', 'Strong communication skills', 'Customer-facing experience'],
    postedBy: 'admin',
    postedByName: 'Admin',
    applicationDeadline: '2024-04-25',
    applicationsCount: 35,
    status: 'active',
    createdAt: '2024-03-02',
  },
];

// Events data
export const eventsData: Event[] = [
  {
    id: '1',
    title: 'Annual Alumni Reunion 2024',
    description: 'Join us for the biggest alumni gathering of the year! Reconnect with old friends, make new connections, and celebrate our shared legacy.',
    date: '2024-04-15',
    time: '10:00 AM - 6:00 PM',
    venue: 'Main Campus Auditorium',
    category: 'reunion',
    maxAttendees: 500,
    currentAttendees: 342,
    rsvpDeadline: '2024-04-10',
    registeredUsers: ['1', '2', '3', '4', '5'],
  },
  {
    id: '2',
    title: 'Tech Industry Workshop',
    description: 'Learn about the latest trends in technology from industry experts. Topics include AI, Cloud Computing, and Blockchain.',
    date: '2024-03-25',
    time: '2:00 PM - 5:00 PM',
    venue: 'Virtual (Zoom)',
    category: 'workshop',
    maxAttendees: 200,
    currentAttendees: 156,
    rsvpDeadline: '2024-03-23',
    registeredUsers: ['1', '4', '6', '8'],
  },
  {
    id: '3',
    title: 'Career Guidance Seminar',
    description: 'Senior alumni share their career journeys and offer guidance for recent graduates entering the job market.',
    date: '2024-04-05',
    time: '11:00 AM - 1:00 PM',
    venue: 'Conference Hall B',
    category: 'seminar',
    maxAttendees: 100,
    currentAttendees: 78,
    rsvpDeadline: '2024-04-03',
    registeredUsers: ['2', '3', '7'],
  },
  {
    id: '4',
    title: 'Alumni Cricket Tournament',
    description: 'Annual cricket tournament for alumni. Form your batch teams and compete for the coveted Alumni Trophy!',
    date: '2024-05-01',
    time: '8:00 AM - 6:00 PM',
    venue: 'Sports Ground',
    category: 'sports',
    maxAttendees: 120,
    currentAttendees: 64,
    rsvpDeadline: '2024-04-25',
    registeredUsers: ['3', '5', '7', '9'],
  },
];

// Circulars data
export const circularsData: Circular[] = [
  {
    id: '1',
    title: 'Important: Alumni Database Update Required',
    content: 'Dear Alumni, we are updating our database to serve you better. Please log in to your account and verify your information by March 31, 2024. This will help us maintain accurate records and improve our services.',
    priority: 'high',
    targetAudience: 'all',
    expiryDate: '2024-03-31',
    viewCount: 1245,
    status: 'published',
    createdAt: '2024-03-01',
  },
  {
    id: '2',
    title: 'New Mentorship Program Launch',
    content: 'We are excited to announce the launch of our new mentorship program connecting experienced alumni with recent graduates. Sign up now to participate as a mentor or mentee.',
    priority: 'medium',
    targetAudience: 'all',
    viewCount: 856,
    status: 'published',
    createdAt: '2024-02-28',
  },
  {
    id: '3',
    title: 'Campus Infrastructure Development Update',
    content: 'The new research center construction is progressing well and is expected to be completed by June 2024. Alumni contributions have been instrumental in making this possible.',
    priority: 'low',
    targetAudience: 'all',
    viewCount: 432,
    status: 'published',
    createdAt: '2024-02-25',
  },
];

// Notifications data
export const notificationsData: Notification[] = [
  {
    id: '1',
    userId: '1',
    type: 'job',
    title: 'New Job Posted',
    message: 'A new Software Engineer position at Google matches your profile',
    read: false,
    link: '/jobs/1',
    createdAt: '2024-03-10T10:00:00',
  },
  {
    id: '2',
    userId: '1',
    type: 'post',
    title: 'Post Liked',
    message: 'Sarah Johnson liked your post',
    read: false,
    link: '/feed',
    createdAt: '2024-03-10T09:30:00',
  },
  {
    id: '3',
    userId: '1',
    type: 'event',
    title: 'Event Reminder',
    message: 'Annual Alumni Reunion 2024 is coming up in 5 days',
    read: true,
    link: '/events/1',
    createdAt: '2024-03-10T08:00:00',
  },
  {
    id: '4',
    userId: '1',
    type: 'message',
    title: 'New Message',
    message: 'You have a new message from Emily Williams',
    read: true,
    link: '/messages',
    createdAt: '2024-03-09T15:00:00',
  },
];

// Analytics data for admin dashboard
export const analyticsData = {
  totalAlumni: 1247,
  alumniGrowth: 12.5,
  pendingVerifications: 28,
  activeJobs: 15,
  totalPostsThisMonth: 342,
  engagementRate: 68.4,
  recentApplications: 156,
  
  alumniGrowthOverYears: [
    { year: '2018', count: 450 },
    { year: '2019', count: 580 },
    { year: '2020', count: 720 },
    { year: '2021', count: 890 },
    { year: '2022', count: 1050 },
    { year: '2023', count: 1180 },
    { year: '2024', count: 1247 },
  ],
  
  departmentDistribution: [
    { name: 'Computer Science', value: 380, color: '#3B82F6' },
    { name: 'Electrical', value: 245, color: '#8B5CF6' },
    { name: 'Mechanical', value: 210, color: '#10B981' },
    { name: 'Civil', value: 178, color: '#F59E0B' },
    { name: 'Chemical', value: 134, color: '#EF4444' },
    { name: 'Others', value: 100, color: '#6B7280' },
  ],
  
  topCompanies: [
    { name: 'Google', count: 85 },
    { name: 'Microsoft', count: 72 },
    { name: 'Amazon', count: 68 },
    { name: 'Apple', count: 54 },
    { name: 'Meta', count: 48 },
    { name: 'Tesla', count: 35 },
  ],
  
  monthlyEngagement: [
    { month: 'Oct', posts: 245, comments: 890, likes: 2340 },
    { month: 'Nov', posts: 278, comments: 956, likes: 2560 },
    { month: 'Dec', posts: 256, comments: 845, likes: 2180 },
    { month: 'Jan', posts: 312, comments: 1024, likes: 2890 },
    { month: 'Feb', posts: 298, comments: 987, likes: 2670 },
    { month: 'Mar', posts: 342, comments: 1156, likes: 3120 },
  ],
  
  recentActivity: [
    { id: '1', action: 'New registration', user: 'Jessica Lee', time: '2 hours ago' },
    { id: '2', action: 'Job posted', user: 'Sarah Johnson', time: '3 hours ago' },
    { id: '3', action: 'Alumni verified', user: 'Admin', time: '5 hours ago' },
    { id: '4', action: 'Event created', user: 'Admin', time: '1 day ago' },
    { id: '5', action: 'Circular published', user: 'Admin', time: '2 days ago' },
  ],
};
