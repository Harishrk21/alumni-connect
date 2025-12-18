import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Image as ImageIcon,
  Send,
  Heart,
  MessageCircle,
  Share2,
  MoreHorizontal,
  Calendar,
  MapPin,
  Bookmark,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import AlumniLayout from '@/layouts/AlumniLayout';
import { postsData, eventsData, alumniData, Post } from '@/data/mockData';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { formatDistanceToNow } from 'date-fns';

export default function AlumniFeed() {
  const [posts, setPosts] = useState<Post[]>(postsData);
  const [newPostContent, setNewPostContent] = useState('');
  const [expandedComments, setExpandedComments] = useState<string[]>([]);
  const [newComments, setNewComments] = useState<Record<string, string>>({});
  const { user } = useAuth();
  const { toast } = useToast();

  const handleCreatePost = () => {
    if (!newPostContent.trim()) return;

    const newPost: Post = {
      id: String(posts.length + 1),
      userId: user?.id || '1',
      userName: user?.name || 'User',
      userCompany: user?.company || 'Company',
      userDesignation: user?.designation || 'Professional',
      content: newPostContent,
      images: [],
      likes: [],
      comments: [],
      visibility: 'public',
      createdAt: new Date().toISOString(),
    };

    setPosts([newPost, ...posts]);
    setNewPostContent('');
    toast({ title: 'Post created successfully!' });
  };

  const handleLike = (postId: string) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        const userId = user?.id || '1';
        const likes = post.likes.includes(userId)
          ? post.likes.filter(id => id !== userId)
          : [...post.likes, userId];
        return { ...post, likes };
      }
      return post;
    }));
  };

  const handleComment = (postId: string) => {
    const content = newComments[postId];
    if (!content?.trim()) return;

    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: [
            ...post.comments,
            {
              id: String(post.comments.length + 1),
              userId: user?.id || '1',
              userName: user?.name || 'User',
              content,
              createdAt: new Date().toISOString(),
            },
          ],
        };
      }
      return post;
    }));

    setNewComments({ ...newComments, [postId]: '' });
  };

  const toggleComments = (postId: string) => {
    setExpandedComments(prev =>
      prev.includes(postId) ? prev.filter(id => id !== postId) : [...prev, postId]
    );
  };

  const suggestedAlumni = alumniData.slice(0, 4);
  const upcomingEvents = eventsData.slice(0, 3);

  return (
    <AlumniLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Feed */}
          <div className="lg:col-span-2 space-y-6">
            {/* Create Post */}
            <Card className="card-elevated">
              <CardContent className="p-4">
                <div className="flex gap-4">
                  <Avatar>
                    <AvatarImage src={user?.avatar} />
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {user?.name?.charAt(0) || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-3">
                    <Textarea
                      placeholder="Share something with your network..."
                      value={newPostContent}
                      onChange={(e) => setNewPostContent(e.target.value)}
                      className="min-h-[100px] resize-none"
                    />
                    <div className="flex items-center justify-between">
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <ImageIcon className="w-4 h-4 mr-2" />
                          Photo
                        </Button>
                      </div>
                      <Button 
                        variant="gradient" 
                        size="sm"
                        onClick={handleCreatePost}
                        disabled={!newPostContent.trim()}
                      >
                        <Send className="w-4 h-4 mr-2" />
                        Post
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Posts */}
            {posts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="card-elevated">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex gap-3">
                        <Avatar>
                          <AvatarImage src={post.userAvatar} />
                          <AvatarFallback className="bg-primary/10 text-primary">
                            {post.userName.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold">{post.userName}</h4>
                            <Badge variant="verified" className="text-xs">
                              Verified
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {post.userDesignation} at {post.userCompany}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
                          </p>
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Bookmark className="w-4 h-4 mr-2" />
                            Save Post
                          </DropdownMenuItem>
                          <DropdownMenuItem>Report</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="whitespace-pre-wrap">{post.content}</p>

                    {/* Post Actions */}
                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleLike(post.id)}
                          className={post.likes.includes(user?.id || '1') ? 'text-destructive' : ''}
                        >
                          <Heart className={`w-4 h-4 mr-2 ${post.likes.includes(user?.id || '1') ? 'fill-current' : ''}`} />
                          {post.likes.length}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleComments(post.id)}
                        >
                          <MessageCircle className="w-4 h-4 mr-2" />
                          {post.comments.length}
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Share2 className="w-4 h-4 mr-2" />
                          Share
                        </Button>
                      </div>
                    </div>

                    {/* Comments Section */}
                    {expandedComments.includes(post.id) && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="space-y-4 pt-4 border-t border-border"
                      >
                        {post.comments.map(comment => (
                          <div key={comment.id} className="flex gap-3">
                            <Avatar className="w-8 h-8">
                              <AvatarFallback className="bg-muted text-muted-foreground text-xs">
                                {comment.userName.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 bg-muted rounded-lg p-3">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-sm font-medium">{comment.userName}</span>
                                <span className="text-xs text-muted-foreground">
                                  {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                                </span>
                              </div>
                              <p className="text-sm">{comment.content}</p>
                            </div>
                          </div>
                        ))}

                        {/* Add Comment */}
                        <div className="flex gap-3">
                          <Avatar className="w-8 h-8">
                            <AvatarFallback className="bg-primary/10 text-primary text-xs">
                              {user?.name?.charAt(0) || 'U'}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 flex gap-2">
                            <Input
                              placeholder="Write a comment..."
                              value={newComments[post.id] || ''}
                              onChange={(e) => setNewComments({
                                ...newComments,
                                [post.id]: e.target.value
                              })}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                  e.preventDefault();
                                  handleComment(post.id);
                                }
                              }}
                              className="flex-1"
                            />
                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={() => handleComment(post.id)}
                              disabled={!newComments[post.id]?.trim()}
                            >
                              <Send className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Suggested Alumni */}
            <Card className="card-elevated">
              <CardHeader>
                <h3 className="font-display font-semibold">Suggested Alumni</h3>
              </CardHeader>
              <CardContent className="space-y-4">
                {suggestedAlumni.map(alumni => (
                  <div key={alumni.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {alumni.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{alumni.name}</p>
                        <p className="text-xs text-muted-foreground">{alumni.company}</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Connect</Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Upcoming Events */}
            <Card className="card-elevated">
              <CardHeader>
                <h3 className="font-display font-semibold">Upcoming Events</h3>
              </CardHeader>
              <CardContent className="space-y-4">
                {upcomingEvents.map(event => (
                  <div key={event.id} className="p-3 bg-muted/50 rounded-lg space-y-2">
                    <h4 className="font-medium text-sm">{event.title}</h4>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {event.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {event.venue}
                      </span>
                    </div>
                    <Badge variant="info" className="text-xs">{event.category}</Badge>
                  </div>
                ))}
                <Button variant="ghost" className="w-full">View All Events</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AlumniLayout>
  );
}
