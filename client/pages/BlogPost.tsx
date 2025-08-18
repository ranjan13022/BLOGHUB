import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  CalendarDays,
  Clock,
  ArrowLeft,
  Share2,
  Heart,
  MessageCircle,
  Mail,
  Search,
  Menu,
} from "lucide-react";
import { Input } from "@/components/ui/input";

// Mock data for the blog post (in a real app, this would come from an API)
const blogPost = {
  id: 1,
  title: "The Future of Web Development: Trends to Watch in 2024",
  content: `
    <p>The landscape of web development continues to evolve at an unprecedented pace. As we move through 2024, several key trends are emerging that will shape how we build and interact with web applications.</p>
    
    <h2>1. AI-Powered Development Tools</h2>
    <p>Artificial intelligence is revolutionizing the development process. From code completion to automated testing, AI tools are becoming indispensable for modern developers. GitHub Copilot, ChatGPT, and similar tools are not just helping with code generation but also with documentation, debugging, and architectural decisions.</p>
    
    <h2>2. WebAssembly (WASM) Adoption</h2>
    <p>WebAssembly is gaining significant traction, enabling high-performance applications in the browser. Languages like Rust, C++, and Go can now run in browsers with near-native performance, opening up new possibilities for web applications.</p>
    
    <h2>3. Edge Computing and Edge Functions</h2>
    <p>The shift towards edge computing is accelerating. Platforms like Vercel Edge Functions, Cloudflare Workers, and AWS Lambda@Edge are making it easier to run code closer to users, reducing latency and improving user experience.</p>
    
    <h2>4. JAMstack Evolution</h2>
    <p>The JAMstack architecture continues to evolve with new frameworks and tools. Static site generators are becoming more powerful, and the line between static and dynamic is blurring with technologies like server-side rendering and incremental static regeneration.</p>
    
    <h2>Conclusion</h2>
    <p>These trends represent just the beginning of what's possible in modern web development. As developers, staying informed and adapting to these changes will be crucial for building the next generation of web applications.</p>
  `,
  author: {
    name: "Sarah Chen",
    avatar: "/placeholder.svg",
    initials: "SC",
    bio: "Full-stack developer and technology writer with 8+ years of experience building scalable web applications.",
  },
  publishedAt: "2024-01-15",
  readTime: "8 min read",
  category: "Technology",
  image: "/placeholder.svg",
  tags: ["Web Development", "AI", "WebAssembly", "JAMstack", "Edge Computing"],
};

const relatedPosts = [
  {
    id: 2,
    title: "Building Sustainable Design Systems",
    author: "Marcus Rodriguez",
    readTime: "6 min read",
    category: "Design",
  },
  {
    id: 3,
    title: "The Art of Technical Writing",
    author: "Emma Thompson",
    readTime: "5 min read",
    category: "Writing",
  },
];

export default function BlogPost() {
  const { id } = useParams();

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
              <Link
                to="/"
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                Home
              </Link>
              <Link
                to="/posts"
                className="text-sm font-medium text-foreground hover:text-primary transition-colors"
              >
                All Posts
              </Link>
              <Link
                to="/categories"
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                Categories
              </Link>
              <Link
                to="/about"
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                About
              </Link>
            </nav>

            <div className="flex items-center space-x-4">
              <div className="hidden sm:flex items-center">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search posts..." className="pl-10 w-64" />
                </div>
              </div>
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

      {/* Article Content */}
      <article className="py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          {/* Back Button */}
          <div className="mb-8">
            <Link
              to="/"
              className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to posts
            </Link>
          </div>

          {/* Article Header */}
          <header className="mb-8">
            <div className="flex items-center mb-4">
              <Badge variant="secondary" className="mr-4">
                {blogPost.category}
              </Badge>
              <div className="flex items-center text-sm text-muted-foreground space-x-4">
                <div className="flex items-center">
                  <CalendarDays className="h-4 w-4 mr-1" />
                  {new Date(blogPost.publishedAt).toLocaleDateString()}
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {blogPost.readTime}
                </div>
              </div>
            </div>

            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
              {blogPost.title}
            </h1>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Avatar className="h-12 w-12 mr-4">
                  <AvatarImage
                    src={blogPost.author.avatar}
                    alt={blogPost.author.name}
                  />
                  <AvatarFallback>{blogPost.author.initials}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-foreground">
                    {blogPost.author.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {blogPost.author.bio}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Heart className="h-4 w-4 mr-2" />
                  Like
                </Button>
                <Button variant="outline" size="sm">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>
          </header>

          {/* Featured Image */}
          <div className="aspect-video bg-muted rounded-lg overflow-hidden mb-8">
            <img
              src={blogPost.image}
              alt={blogPost.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none">
            <div
              dangerouslySetInnerHTML={{ __html: blogPost.content }}
              className="text-foreground leading-relaxed space-y-6"
            />
          </div>

          {/* Tags */}
          <div className="mt-12 pt-8 border-t border-border">
            <h3 className="text-lg font-semibold text-foreground mb-4">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {blogPost.tags.map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Author Bio */}
          <div className="mt-12 p-6 bg-muted/30 rounded-lg">
            <div className="flex items-start">
              <Avatar className="h-16 w-16 mr-6">
                <AvatarImage
                  src={blogPost.author.avatar}
                  alt={blogPost.author.name}
                />
                <AvatarFallback className="text-lg">
                  {blogPost.author.initials}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  About {blogPost.author.name}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {blogPost.author.bio}
                </p>
                <Button variant="outline" size="sm">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Follow
                </Button>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Related Posts */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <h2 className="text-2xl font-bold text-foreground mb-8">
            Related Posts
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {relatedPosts.map((post) => (
              <Card
                key={post.id}
                className="group hover:shadow-md transition-all duration-300"
              >
                <CardHeader>
                  <Badge variant="outline" className="w-fit mb-2">
                    {post.category}
                  </Badge>
                  <CardTitle className="group-hover:text-primary transition-colors">
                    <Link to={`/post/${post.id}`}>{post.title}</Link>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>By {post.author}</span>
                    <span>{post.readTime}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 lg:py-24 bg-primary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-primary-foreground mb-4">
              Stay in the loop
            </h2>
            <p className="text-primary-foreground/80 mb-8 text-lg">
              Get the latest posts and insights delivered straight to your
              inbox. Join our community of curious minds.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                placeholder="Enter your email"
                className="bg-primary-foreground text-foreground flex-1"
              />
              <Button variant="secondary" size="lg" className="px-8">
                Subscribe
              </Button>
            </div>
            <p className="text-primary-foreground/60 text-sm mt-4">
              No spam, unsubscribe at any time.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary/50 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <Link
                to="/"
                className="text-2xl font-bold text-primary mb-4 block"
              >
                Blog<span className="text-foreground">Hub</span>
              </Link>
              <p className="text-muted-foreground mb-4 max-w-md">
                A modern blogging platform where insights meet innovation.
                Discover stories that matter and join our growing community.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-4">
                Quick Links
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/posts"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    All Posts
                  </Link>
                </li>
                <li>
                  <Link
                    to="/categories"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Categories
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-4">Categories</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/category/technology"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Technology
                  </Link>
                </li>
                <li>
                  <Link
                    to="/category/design"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Design
                  </Link>
                </li>
                <li>
                  <Link
                    to="/category/writing"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Writing
                  </Link>
                </li>
                <li>
                  <Link
                    to="/category/security"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Security
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center">
            <p className="text-muted-foreground">
              © 2024 BlogHub. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
