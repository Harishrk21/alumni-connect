import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

export type UserRole = 'admin' | 'alumni';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  batch?: string;
  department?: string;
  company?: string;
  designation?: string;
  phone?: string;
  rollNumber?: string;
  graduationYear?: string;
  degree?: string;
  skills?: string[];
  bio?: string;
  location?: string;
  linkedin?: string;
  github?: string;
  isVerified?: boolean;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (userData: Partial<User> & { password: string }) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demo
const mockUsers: (User & { password: string })[] = [
  {
    id: '1',
    email: 'admin@alumnexus.com',
    password: 'admin123',
    name: 'Admin User',
    role: 'admin',
    avatar: '',
    createdAt: '2024-01-01',
  },
  {
    id: '2',
    email: 'john@alumni.com',
    password: 'password123',
    name: 'John Smith',
    role: 'alumni',
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
    createdAt: '2024-01-15',
  },
  {
    id: '3',
    email: 'sarah@alumni.com',
    password: 'password123',
    name: 'Sarah Johnson',
    role: 'alumni',
    batch: '2019',
    department: 'Electrical Engineering',
    company: 'Tesla',
    designation: 'Product Manager',
    phone: '+1234567891',
    rollNumber: 'EE2019001',
    graduationYear: '2019',
    degree: 'B.Tech',
    skills: ['Product Management', 'Agile', 'Data Analysis'],
    bio: 'Product manager focused on electric vehicle innovation.',
    location: 'Austin, TX',
    isVerified: true,
    createdAt: '2024-02-01',
  },
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    
    // TODO: Replace with actual API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const foundUser = mockUsers.find(u => u.email === email && u.password === password);
    
    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      setIsLoading(false);
      return { success: true };
    }
    
    setIsLoading(false);
    return { success: false, error: 'Invalid email or password' };
  }, []);

  const register = useCallback(async (userData: Partial<User> & { password: string }) => {
    setIsLoading(true);
    
    // TODO: Replace with actual API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const existingUser = mockUsers.find(u => u.email === userData.email);
    if (existingUser) {
      setIsLoading(false);
      return { success: false, error: 'Email already registered' };
    }
    
    const newUser: User = {
      id: String(mockUsers.length + 1),
      email: userData.email!,
      name: userData.name!,
      role: 'alumni',
      batch: userData.batch,
      department: userData.department,
      company: userData.company,
      designation: userData.designation,
      phone: userData.phone,
      rollNumber: userData.rollNumber,
      graduationYear: userData.graduationYear,
      degree: userData.degree,
      skills: userData.skills || [],
      isVerified: false,
      createdAt: new Date().toISOString(),
    };
    
    setIsLoading(false);
    return { success: true };
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const updateUser = useCallback((userData: Partial<User>) => {
    setUser(prev => prev ? { ...prev, ...userData } : null);
  }, []);

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      isLoading,
      login,
      register,
      logout,
      updateUser,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
