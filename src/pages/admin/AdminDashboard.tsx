import { motion } from 'framer-motion';
import {
  Users,
  Clock,
  Briefcase,
  FileText,
  TrendingUp,
  MessageSquare,
  Plus,
  ArrowUpRight,
  CheckCircle,
  XCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import AdminLayout from '@/layouts/AdminLayout';
import { analyticsData } from '@/data/mockData';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  AreaChart,
  Area,
} from 'recharts';

const statCards = [
  {
    title: 'Total Alumni',
    value: analyticsData.totalAlumni.toLocaleString(),
    change: `+${analyticsData.alumniGrowth}%`,
    changeType: 'positive',
    icon: Users,
  },
  {
    title: 'Pending Verifications',
    value: analyticsData.pendingVerifications,
    changeType: 'warning',
    icon: Clock,
  },
  {
    title: 'Active Jobs',
    value: analyticsData.activeJobs,
    change: '+3 this week',
    changeType: 'positive',
    icon: Briefcase,
  },
  {
    title: 'Posts This Month',
    value: analyticsData.totalPostsThisMonth,
    change: '+18%',
    changeType: 'positive',
    icon: FileText,
  },
  {
    title: 'Engagement Rate',
    value: `${analyticsData.engagementRate}%`,
    change: '+5.2%',
    changeType: 'positive',
    icon: TrendingUp,
  },
  {
    title: 'Job Applications',
    value: analyticsData.recentApplications,
    change: '+24 today',
    changeType: 'positive',
    icon: MessageSquare,
  },
];

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-display font-bold">Dashboard</h1>
            <p className="text-muted-foreground">Welcome back! Here's what's happening.</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Plus className="w-4 h-4 mr-2" />
              New Announcement
            </Button>
            <Button variant="gradient">
              <Plus className="w-4 h-4 mr-2" />
              Post Job
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {statCards.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="card-elevated">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
                      <stat.icon className="w-5 h-5 text-accent-foreground" />
                    </div>
                    {stat.change && (
                      <Badge variant={stat.changeType === 'positive' ? 'success' : 'warning'}>
                        {stat.change}
                      </Badge>
                    )}
                  </div>
                  <p className="text-2xl font-display font-bold">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Alumni Growth Chart */}
          <Card className="card-elevated">
            <CardHeader>
              <CardTitle className="font-display">Alumni Growth</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={analyticsData.alumniGrowthOverYears}>
                    <defs>
                      <linearGradient id="colorAlumni" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(217, 91%, 60%)" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="hsl(217, 91%, 60%)" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                    <XAxis dataKey="year" className="text-xs" />
                    <YAxis className="text-xs" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="count" 
                      stroke="hsl(217, 91%, 60%)" 
                      strokeWidth={2}
                      fillOpacity={1} 
                      fill="url(#colorAlumni)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Department Distribution */}
          <Card className="card-elevated">
            <CardHeader>
              <CardTitle className="font-display">Department Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={analyticsData.departmentDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {analyticsData.departmentDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex flex-wrap justify-center gap-4 mt-4">
                {analyticsData.departmentDistribution.map((dept) => (
                  <div key={dept.name} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: dept.color }} />
                    <span className="text-sm">{dept.name}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Second Charts Row */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Top Companies */}
          <Card className="card-elevated">
            <CardHeader>
              <CardTitle className="font-display">Top Companies</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={analyticsData.topCompanies} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                    <XAxis type="number" className="text-xs" />
                    <YAxis dataKey="name" type="category" className="text-xs" width={80} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                    <Bar 
                      dataKey="count" 
                      fill="hsl(258, 90%, 66%)" 
                      radius={[0, 4, 4, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Monthly Engagement */}
          <Card className="card-elevated">
            <CardHeader>
              <CardTitle className="font-display">Monthly Engagement</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={analyticsData.monthlyEngagement}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                    <XAxis dataKey="month" className="text-xs" />
                    <YAxis className="text-xs" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="posts" 
                      stroke="hsl(217, 91%, 60%)" 
                      strokeWidth={2}
                      dot={{ fill: 'hsl(217, 91%, 60%)' }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="comments" 
                      stroke="hsl(258, 90%, 66%)" 
                      strokeWidth={2}
                      dot={{ fill: 'hsl(258, 90%, 66%)' }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="likes" 
                      stroke="hsl(160, 84%, 39%)" 
                      strokeWidth={2}
                      dot={{ fill: 'hsl(160, 84%, 39%)' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-center gap-6 mt-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-primary" />
                  <span className="text-sm">Posts</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-secondary" />
                  <span className="text-sm">Comments</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-success" />
                  <span className="text-sm">Likes</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="card-elevated">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="font-display">Recent Activity</CardTitle>
            <Button variant="ghost" size="sm">
              View All
              <ArrowUpRight className="w-4 h-4 ml-1" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analyticsData.recentActivity.map((activity, index) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 bg-muted/50 rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
                      {activity.action.includes('verified') ? (
                        <CheckCircle className="w-5 h-5 text-success" />
                      ) : activity.action.includes('rejected') ? (
                        <XCircle className="w-5 h-5 text-destructive" />
                      ) : (
                        <FileText className="w-5 h-5 text-accent-foreground" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{activity.action}</p>
                      <p className="text-sm text-muted-foreground">by {activity.user}</p>
                    </div>
                  </div>
                  <span className="text-sm text-muted-foreground">{activity.time}</span>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
