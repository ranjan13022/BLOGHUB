import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeft, Save, Eye, Upload, Plus, X, Mail, Search, Menu } from "lucide-react";
import { SimpleThemeToggle } from "@/components/ui/theme-toggle";
import { toast } from "@/hooks/use-toast";

const categories = ["Technology", "Design", "Writing", "Security", "Business", "Tutorial"];

export default function AddBlog() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("write");
  
  // Form state
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "",
    tags: [] as string[],
    featuredImage: "",
    author: {
      name: "Current User",
      avatar: "/placeholder.svg",
      initials: "CU"
    }
  });
  
  const [newTag, setNewTag] = useState("");

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSubmit = async (isDraft: boolean = false) => {
    if (!formData.title.trim() || !formData.content.trim()) {
      toast({
        title: "Missing required fields",
        description: "Please fill in the title and content.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("/api/blog/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          status: isDraft ? "draft" : "published",
          publishedAt: isDraft ? null : new Date().toISOString(),
        }),
      });

      if (response.ok) {
        toast({
          title: isDraft ? "Draft saved!" : "Post published!",
          description: isDraft 
            ? "Your blog post has been saved as a draft." 
            : "Your blog post has been published successfully.",
        });
        navigate("/");
      } else {
        throw new Error("Failed to create post");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save the blog post. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <Link to="/" className="text-2xl font-bold text-primary">
                Blog<span className="text-foreground">Hub</span>
              </Link>
            </div>
            
            <nav className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                Home
              </Link>
              <Link to="/posts" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                All Posts
              </Link>
              <Link to="/add-blog" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                Add Blog
              </Link>
              <Link to="/categories" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                Categories
              </Link>
              <Link to="/about" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                About
              </Link>
            </nav>

            <div className="flex items-center space-x-4">
              <div className="hidden sm:flex items-center">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search posts..."
                    className="pl-10 w-64"
                  />
                </div>
              </div>
              <SimpleThemeToggle />
              <Button variant="outline" size="sm">
                <Mail className="h-4 w-4 mr-2" />
                Subscribe
              </Button>
              <Button variant="ghost" size="sm" className="md:hidden">
                <Menu className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to home
          </Link>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Create New Blog Post</h1>
            <p className="text-muted-foreground">
              Share your insights and stories with the BlogHub community.
            </p>
          </div>

          {/* Tabs for Write and Preview */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
            <TabsList className="grid w-full grid-cols-2 max-w-md">
              <TabsTrigger value="write">Write</TabsTrigger>
              <TabsTrigger value="preview">Preview</TabsTrigger>
            </TabsList>
            
            <TabsContent value="write" className="space-y-6">
              {/* Blog Form */}
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Main Form */}
                <div className="lg:col-span-2 space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Post Content</CardTitle>
                      <CardDescription>
                        Write your blog post content and provide essential details.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Title */}
                      <div className="space-y-2">
                        <Label htmlFor="title">Title *</Label>
                        <Input
                          id="title"
                          placeholder="Enter your blog post title..."
                          value={formData.title}
                          onChange={(e) => handleInputChange("title", e.target.value)}
                          className="text-lg"
                        />
                      </div>

                      {/* Excerpt */}
                      <div className="space-y-2">
                        <Label htmlFor="excerpt">Excerpt</Label>
                        <Textarea
                          id="excerpt"
                          placeholder="Write a brief summary of your post..."
                          value={formData.excerpt}
                          onChange={(e) => handleInputChange("excerpt", e.target.value)}
                          rows={3}
                        />
                        <p className="text-xs text-muted-foreground">
                          This will be shown in post previews and social media shares.
                        </p>
                      </div>

                      {/* Content */}
                      <div className="space-y-2">
                        <Label htmlFor="content">Content *</Label>
                        <Textarea
                          id="content"
                          placeholder="Write your blog post content here..."
                          value={formData.content}
                          onChange={(e) => handleInputChange("content", e.target.value)}
                          rows={20}
                          className="font-mono text-sm"
                        />
                        <p className="text-xs text-muted-foreground">
                          You can use HTML tags for formatting.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  {/* Publishing Options */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Publish</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex space-x-2">
                        <Button 
                          onClick={() => handleSubmit(true)} 
                          variant="outline" 
                          className="flex-1"
                          disabled={isLoading}
                        >
                          <Save className="h-4 w-4 mr-2" />
                          Save Draft
                        </Button>
                        <Button 
                          onClick={() => handleSubmit(false)} 
                          className="flex-1"
                          disabled={isLoading}
                        >
                          Publish
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Category */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Category</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </CardContent>
                  </Card>

                  {/* Tags */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Tags</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex space-x-2">
                        <Input
                          placeholder="Add a tag..."
                          value={newTag}
                          onChange={(e) => setNewTag(e.target.value)}
                          onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                        />
                        <Button onClick={addTag} size="sm" variant="outline">
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      {formData.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {formData.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                              {tag}
                              <button
                                onClick={() => removeTag(tag)}
                                className="ml-1 hover:bg-destructive/20 rounded-full"
                              >
                                <X className="h-3 w-3" />
                              </button>
                            </Badge>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Featured Image */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Featured Image</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                        <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                        <p className="text-sm text-muted-foreground mb-2">
                          Click to upload or drag and drop
                        </p>
                        <p className="text-xs text-muted-foreground">
                          SVG, PNG, JPG or GIF (max. 2MB)
                        </p>
                      </div>
                      <Input
                        placeholder="Or enter image URL..."
                        value={formData.featuredImage}
                        onChange={(e) => handleInputChange("featuredImage", e.target.value)}
                      />
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="preview" className="space-y-6">
              {/* Preview */}
              <Card>
                <CardHeader>
                  <CardTitle>Preview</CardTitle>
                  <CardDescription>
                    See how your blog post will look when published.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <article className="space-y-6">
                    {/* Preview Header */}
                    <header>
                      <div className="flex items-center mb-4">
                        {formData.category && (
                          <Badge variant="secondary" className="mr-4">{formData.category}</Badge>
                        )}
                        <span className="text-sm text-muted-foreground">
                          {new Date().toLocaleDateString()} • 
                          {Math.ceil(formData.content.split(' ').length / 200)} min read
                        </span>
                      </div>
                      
                      <h1 className="text-3xl font-bold text-foreground mb-4">
                        {formData.title || "Your blog post title will appear here"}
                      </h1>
                      
                      {formData.excerpt && (
                        <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                          {formData.excerpt}
                        </p>
                      )}
                      
                      <div className="flex items-center mb-6">
                        <Avatar className="h-10 w-10 mr-3">
                          <AvatarImage src={formData.author.avatar} alt={formData.author.name} />
                          <AvatarFallback>{formData.author.initials}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-foreground">{formData.author.name}</p>
                          <p className="text-sm text-muted-foreground">Author</p>
                        </div>
                      </div>
                    </header>

                    {/* Featured Image Preview */}
                    {formData.featuredImage && (
                      <div className="aspect-video bg-muted rounded-lg overflow-hidden mb-6">
                        <img 
                          src={formData.featuredImage} 
                          alt={formData.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}

                    {/* Content Preview */}
                    <div className="prose prose-lg max-w-none">
                      <div 
                        dangerouslySetInnerHTML={{ 
                          __html: formData.content || "<p class='text-muted-foreground'>Your blog post content will appear here...</p>" 
                        }}
                        className="text-foreground leading-relaxed space-y-4"
                      />
                    </div>

                    {/* Tags Preview */}
                    {formData.tags.length > 0 && (
                      <div className="pt-6 border-t border-border">
                        <h3 className="text-lg font-semibold text-foreground mb-3">Tags</h3>
                        <div className="flex flex-wrap gap-2">
                          {formData.tags.map((tag) => (
                            <Badge key={tag} variant="outline">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </article>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
