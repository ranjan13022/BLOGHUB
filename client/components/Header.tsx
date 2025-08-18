import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Search, Menu } from "lucide-react";
import { SimpleThemeToggle } from "@/components/ui/theme-toggle";

interface HeaderProps {
  currentPage?: string;
}

export default function Header({ currentPage = "" }: HeaderProps) {
  const isActive = (path: string) => currentPage === path;

  return (
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
              className={`text-sm font-medium transition-colors ${
                isActive("home")
                  ? "text-foreground hover:text-primary"
                  : "text-muted-foreground hover:text-primary"
              }`}
            >
              Home
            </Link>
            <Link
              to="/posts"
              className={`text-sm font-medium transition-colors ${
                isActive("posts")
                  ? "text-foreground hover:text-primary"
                  : "text-muted-foreground hover:text-primary"
              }`}
            >
              All Posts
            </Link>
            <Link
              to="/add-blog"
              className={`text-sm font-medium transition-colors ${
                isActive("add-blog")
                  ? "text-foreground hover:text-primary"
                  : "text-muted-foreground hover:text-primary"
              }`}
            >
              Add Blog
            </Link>
            <Link
              to="/categories"
              className={`text-sm font-medium transition-colors ${
                isActive("categories")
                  ? "text-foreground hover:text-primary"
                  : "text-muted-foreground hover:text-primary"
              }`}
            >
              Categories
            </Link>
            <Link
              to="/about"
              className={`text-sm font-medium transition-colors ${
                isActive("about")
                  ? "text-foreground hover:text-primary"
                  : "text-muted-foreground hover:text-primary"
              }`}
            >
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
  );
}
