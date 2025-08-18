import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  BarChart3, 
  Users, 
  FileText, 
  Settings, 
  Eye, 
  Edit, 
  Trash2, 
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  TrendingUp,
  Mail,
  Calendar,
  Clock,
  Download
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SimpleThemeToggle } from "@/components/ui/theme-toggle";
import { toast } from "@/hooks/use-toast";

interface BlogPost {
  id: number;
  title: string;
  status: "published" | "draft";
  author: string;
  publishedAt: string;
  views: number;
  category: string;
}

interface AnalyticsData {
  totalPosts: number;
  totalViews: number;
  totalUsers: number;
  publishedThisMonth: number;
}

export default function Admin() {
  const [activeTab, setActiveTab] = useState("overview");
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    totalPosts: 0,
    totalViews: 0,
    totalUsers: 0,
    publishedThisMonth: 0
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "published" | "draft">("all");

  // Mock data - in real app, fetch from API
  useEffect(() => {
    const mockPosts: BlogPost[] = [
      {
        id: 1,
        title: "The Future of Web Development: Trends to Watch in 2024",
        status: "published",
        author: "Sarah Chen",
        publishedAt: "2024-01-15",
        views: 1250,
        category: "Technology"
      },
      {
        id: 2,
        title: "Building Sustainable Design Systems",
        status: "published",
        author: "Marcus Rodriguez",
        publishedAt: "2024-01-12",
        views: 890,
        category: "Design"
      },
      {
        id: 3,
        title: "The Art of Technical Writing",
        status: "draft",
        author: "Emma Thompson",
        publishedAt: "2024-01-10",
        views: 0,
        category: "Writing"
      },
      {
        id: 4,
        title: "Understanding Modern Authentication",
        status: "published",
        author: "David Kim",
        publishedAt: "2024-01-08",
        views: 2100,
        category: "Security"
      }
    ];

    setBlogPosts(mockPosts);
    setAnalytics({
      totalPosts: mockPosts.length,
      totalViews: mockPosts.reduce((sum, post) => sum + post.views, 0),
      totalUsers: 1234,
      publishedThisMonth: mockPosts.filter(post => post.status === "published").length
    });
  }, []);

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || post.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleDeletePost = async (id: number) => {
    try {
      // In real app, make API call
      setBlogPosts(posts => posts.filter(post => post.id !== id));
      toast({
        title: "Post deleted",
        description: "The blog post has been successfully deleted.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete the post. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleToggleStatus = async (id: number) => {
    try {
      setBlogPosts(posts => 
        posts.map(post => 
          post.id === id 
            ? { ...post, status: post.status === "published" ? "draft" : "published" }
            : post
        )
      );
      toast({
        title: "Status updated",
        description: "Post status has been successfully updated.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update post status.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/" className="text-2xl font-bold text-primary">
                Blog<span className="text-foreground">Hub</span>
              </Link>
              <Badge variant="secondary" className="ml-2">Admin</Badge>
            </div>
            
            <div className="flex items-center space-x-4">
              <SimpleThemeToggle />
              <Link to="/">
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-2" />
                  View Site
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <nav className="space-y-2">
              <Button
                variant={activeTab === "overview" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("overview")}
              >
                <BarChart3 className="h-4 w-4 mr-2" />
                Overview
              </Button>
              <Button
                variant={activeTab === "posts" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("posts")}
              >
                <FileText className="h-4 w-4 mr-2" />
                Posts
              </Button>
              <Button
                variant={activeTab === "users" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("users")}
              >
                <Users className="h-4 w-4 mr-2" />
                Users
              </Button>
              <Button
                variant={activeTab === "analytics" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("analytics")}
              >
                <TrendingUp className="h-4 w-4 mr-2" />
                Analytics
              </Button>
              <Button
                variant={activeTab === "settings" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("settings")}
              >
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Overview Tab */}
            {activeTab === "overview" && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl font-bold text-foreground">Dashboard Overview</h1>
                  <p className="text-muted-foreground">
                    Welcome back! Here's what's happening with your blog.
                  </p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
                      <FileText className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{analytics.totalPosts}</div>
                      <p className="text-xs text-muted-foreground">
                        +2 from last month
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Total Views</CardTitle>
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{analytics.totalViews.toLocaleString()}</div>
                      <p className="text-xs text-muted-foreground">
                        +20.1% from last month
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Subscribers</CardTitle>
                      <Mail className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{analytics.totalUsers.toLocaleString()}</div>
                      <p className="text-xs text-muted-foreground">
                        +15.3% from last month
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Published This Month</CardTitle>
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{analytics.publishedThisMonth}</div>
                      <p className="text-xs text-muted-foreground">
                        Target: 5 posts
                      </p>
                    </CardContent>
                  </Card>
                </div>

                {/* Recent Posts */}
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Posts</CardTitle>
                    <CardDescription>
                      Your latest blog posts and their performance
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {blogPosts.slice(0, 3).map((post) => (
                        <div key={post.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex-1">
                            <h3 className="font-medium">{post.title}</h3>
                            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                              <span>By {post.author}</span>
                              <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                              <Badge variant={post.status === "published" ? "default" : "secondary"}>
                                {post.status}
                              </Badge>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-medium">{post.views} views</div>
                            <div className="text-sm text-muted-foreground">{post.category}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Posts Management Tab */}
            {activeTab === "posts" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-3xl font-bold text-foreground">Posts Management</h1>
                    <p className="text-muted-foreground">
                      Manage your blog posts, drafts, and published content.
                    </p>
                  </div>
                  <Link to="/add-blog">
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      New Post
                    </Button>
                  </Link>
                </div>

                {/* Filters */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search posts..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant={statusFilter === "all" ? "default" : "outline"}
                      onClick={() => setStatusFilter("all")}
                      size="sm"
                    >
                      All
                    </Button>
                    <Button
                      variant={statusFilter === "published" ? "default" : "outline"}
                      onClick={() => setStatusFilter("published")}
                      size="sm"
                    >
                      Published
                    </Button>
                    <Button
                      variant={statusFilter === "draft" ? "default" : "outline"}
                      onClick={() => setStatusFilter("draft")}
                      size="sm"
                    >
                      Drafts
                    </Button>
                  </div>
                </div>

                {/* Posts Table */}
                <Card>
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Title</TableHead>
                          <TableHead>Author</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Category</TableHead>
                          <TableHead>Views</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead className="w-[100px]">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredPosts.map((post) => (
                          <TableRow key={post.id}>
                            <TableCell className="font-medium">
                              <Link 
                                to={`/post/${post.id}`}
                                className="hover:text-primary transition-colors"
                              >
                                {post.title}
                              </Link>
                            </TableCell>
                            <TableCell>{post.author}</TableCell>
                            <TableCell>
                              <Badge 
                                variant={post.status === "published" ? "default" : "secondary"}
                                className="cursor-pointer"
                                onClick={() => handleToggleStatus(post.id)}
                              >
                                {post.status}
                              </Badge>
                            </TableCell>
                            <TableCell>{post.category}</TableCell>
                            <TableCell>{post.views}</TableCell>
                            <TableCell>{new Date(post.publishedAt).toLocaleDateString()}</TableCell>
                            <TableCell>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem asChild>
                                    <Link to={`/post/${post.id}`}>
                                      <Eye className="h-4 w-4 mr-2" />
                                      View
                                    </Link>
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Edit className="h-4 w-4 mr-2" />
                                    Edit
                                  </DropdownMenuItem>
                                  <DropdownMenuItem 
                                    onClick={() => handleDeletePost(post.id)}
                                    className="text-destructive"
                                  >
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Users Tab */}
            {activeTab === "users" && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl font-bold text-foreground">User Management</h1>
                  <p className="text-muted-foreground">
                    Manage subscribers and user accounts.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Newsletter Subscribers</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">1,234</div>
                      <p className="text-sm text-muted-foreground">+15.3% from last month</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Active Readers</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">2,847</div>
                      <p className="text-sm text-muted-foreground">+8.1% from last month</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Comment Authors</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">456</div>
                      <p className="text-sm text-muted-foreground">+22.5% from last month</p>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Recent Subscribers</CardTitle>
                    <CardDescription>
                      Users who recently subscribed to your newsletter
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {["Alice Johnson", "Bob Smith", "Carol Davis", "David Wilson"].map((name, index) => (
                        <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center space-x-3">
                            <Avatar>
                              <AvatarImage src="/placeholder.svg" />
                              <AvatarFallback>{name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{name}</div>
                              <div className="text-sm text-muted-foreground">
                                {name.toLowerCase().replace(' ', '.')}@example.com
                              </div>
                            </div>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {index + 1} day{index === 0 ? '' : 's'} ago
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Analytics Tab */}
            {activeTab === "analytics" && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl font-bold text-foreground">Analytics</h1>
                  <p className="text-muted-foreground">
                    Detailed insights about your blog performance.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Top Performing Posts</CardTitle>
                      <CardDescription>Posts with the most views this month</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {blogPosts
                          .sort((a, b) => b.views - a.views)
                          .map((post, index) => (
                            <div key={post.id} className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <div className="w-6 h-6 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center font-medium">
                                  {index + 1}
                                </div>
                                <div>
                                  <div className="font-medium text-sm">{post.title}</div>
                                  <div className="text-xs text-muted-foreground">{post.category}</div>
                                </div>
                              </div>
                              <div className="text-sm font-medium">{post.views} views</div>
                            </div>
                          ))
                        }
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Category Performance</CardTitle>
                      <CardDescription>Views by category</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {["Technology", "Design", "Writing", "Security"].map((category) => {
                          const categoryViews = blogPosts
                            .filter(post => post.category === category)
                            .reduce((sum, post) => sum + post.views, 0);
                          const percentage = Math.round((categoryViews / analytics.totalViews) * 100);
                          
                          return (
                            <div key={category} className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span>{category}</span>
                                <span>{categoryViews} views ({percentage}%)</span>
                              </div>
                              <div className="w-full bg-secondary rounded-full h-2">
                                <div 
                                  className="bg-primary h-2 rounded-full" 
                                  style={{ width: `${percentage}%` }}
                                />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === "settings" && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl font-bold text-foreground">Settings</h1>
                  <p className="text-muted-foreground">
                    Configure your blog settings and preferences.
                  </p>
                </div>

                <div className="grid gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Site Information</CardTitle>
                      <CardDescription>
                        Basic information about your blog
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="site-name">Site Name</Label>
                          <Input id="site-name" defaultValue="BlogHub" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="site-tagline">Tagline</Label>
                          <Input id="site-tagline" defaultValue="Insights that inspire and inform" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="site-description">Description</Label>
                        <Input id="site-description" defaultValue="A modern blogging platform where insights meet innovation." />
                      </div>
                      <Button>Save Changes</Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Data Export</CardTitle>
                      <CardDescription>
                        Export your blog data for backup or migration
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Export All Posts</div>
                          <div className="text-sm text-muted-foreground">
                            Download all your blog posts as JSON
                          </div>
                        </div>
                        <Button variant="outline">
                          <Download className="h-4 w-4 mr-2" />
                          Export
                        </Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Export Analytics</div>
                          <div className="text-sm text-muted-foreground">
                            Download analytics data as CSV
                          </div>
                        </div>
                        <Button variant="outline">
                          <Download className="h-4 w-4 mr-2" />
                          Export
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
