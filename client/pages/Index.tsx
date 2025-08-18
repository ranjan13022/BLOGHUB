import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CalendarDays, Clock, User, Mail, Search, Menu } from "lucide-react";
import { SimpleThemeToggle } from "@/components/ui/theme-toggle";

const blogPosts = [
  {
    id: 1,
    title: "The Future of Web Development: Trends to Watch in 2024",
    excerpt:
      "Explore the cutting-edge technologies and methodologies that are shaping the future of web development this year.",
    author: {
      name: "Sarah Chen",
      avatar: "/placeholder.svg",
      initials: "SC",
    },
    publishedAt: "2024-01-15",
    readTime: "8 min read",
    category: "Technology",
    image: "/placeholder.svg",
    featured: true,
  },
  {
    id: 2,
    title: "Building Sustainable Design Systems",
    excerpt:
      "Learn how to create design systems that scale with your team and maintain consistency across products.",
    author: {
      name: "Marcus Rodriguez",
      avatar: "/placeholder.svg",
      initials: "MR",
    },
    publishedAt: "2024-01-12",
    readTime: "6 min read",
    category: "Design",
    image: "/placeholder.svg",
    featured: true,
  },
  {
    id: 3,
    title: "The Art of Technical Writing",
    excerpt:
      "Master the fundamentals of writing clear, concise technical documentation that actually helps people.",
    author: {
      name: "Emma Thompson",
      avatar: "/placeholder.svg",
      initials: "ET",
    },
    publishedAt: "2024-01-10",
    readTime: "5 min read",
    category: "Writing",
    image: "/placeholder.svg",
    featured: false,
  },
  {
    id: 4,
    title: "Understanding Modern Authentication",
    excerpt:
      "A comprehensive guide to implementing secure authentication in modern web applications.",
    author: {
      name: "David Kim",
      avatar: "/placeholder.svg",
      initials: "DK",
    },
    publishedAt: "2024-01-08",
    readTime: "10 min read",
    category: "Security",
    image: "/placeholder.svg",
    featured: false,
  },
];

const categories = ["All", "Technology", "Design", "Writing", "Security"];

export default function Index() {
  const featuredPosts = blogPosts.filter((post) => post.featured);
  const recentPosts = blogPosts.filter((post) => !post.featured);

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
                className="text-sm font-medium text-foreground hover:text-primary transition-colors"
              >
                Home
              </Link>
              <Link
                to="/posts"
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                All Posts
              </Link>
              <Link
                to="/add-blog"
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                Add Blog
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

      {/* Hero Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-primary/5 via-background to-secondary/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6">
              Insights that
              <span className="text-primary"> inspire</span> and
              <span className="text-primary"> inform</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed max-w-2xl mx-auto">
              Discover the latest trends, insights, and stories from the world
              of technology, design, and innovation. Join thousands of readers
              who stay ahead of the curve.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="px-8">
                Explore Latest Posts
              </Button>
              <Button variant="outline" size="lg" className="px-8">
                <Mail className="h-4 w-4 mr-2" />
                Subscribe to Newsletter
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold text-foreground">
              Featured Posts
            </h2>
            <Link
              to="/posts"
              className="text-primary hover:underline font-medium"
            >
              View all posts →
            </Link>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {featuredPosts.map((post) => (
              <Card
                key={post.id}
                className="group hover:shadow-lg transition-all duration-300 overflow-hidden"
              >
                <div className="aspect-video bg-muted rounded-t-lg overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="secondary">{post.category}</Badge>
                    <div className="flex items-center text-sm text-muted-foreground space-x-4">
                      <div className="flex items-center">
                        <CalendarDays className="h-4 w-4 mr-1" />
                        {new Date(post.publishedAt).toLocaleDateString()}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {post.readTime}
                      </div>
                    </div>
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">
                    <Link to={`/post/${post.id}`}>{post.title}</Link>
                  </CardTitle>
                  <CardDescription className="text-base leading-relaxed">
                    {post.excerpt}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center">
                    <Avatar className="h-8 w-8 mr-3">
                      <AvatarImage
                        src={post.author.avatar}
                        alt={post.author.name}
                      />
                      <AvatarFallback>{post.author.initials}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {post.author.name}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Posts */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold text-foreground">Recent Posts</h2>
            <div className="flex space-x-2 overflow-x-auto">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={category === "All" ? "default" : "outline"}
                  size="sm"
                  className="whitespace-nowrap"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentPosts.map((post) => (
              <Card
                key={post.id}
                className="group hover:shadow-md transition-all duration-300"
              >
                <div className="aspect-video bg-muted rounded-t-lg overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="outline" className="text-xs">
                      {post.category}
                    </Badge>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Clock className="h-3 w-3 mr-1" />
                      {post.readTime}
                    </div>
                  </div>
                  <CardTitle className="text-lg group-hover:text-primary transition-colors line-clamp-2">
                    <Link to={`/post/${post.id}`}>{post.title}</Link>
                  </CardTitle>
                  <CardDescription className="line-clamp-3">
                    {post.excerpt}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Avatar className="h-6 w-6 mr-2">
                        <AvatarImage
                          src={post.author.avatar}
                          alt={post.author.name}
                        />
                        <AvatarFallback className="text-xs">
                          {post.author.initials}
                        </AvatarFallback>
                      </Avatar>
                      <p className="text-xs text-muted-foreground">
                        {post.author.name}
                      </p>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {new Date(post.publishedAt).toLocaleDateString()}
                    </p>
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
