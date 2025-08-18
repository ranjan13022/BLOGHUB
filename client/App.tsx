import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import BlogPost from "./pages/BlogPost";
import PlaceholderPage from "./pages/PlaceholderPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/post/:id" element={<BlogPost />} />
            <Route
              path="/posts"
              element={
                <PlaceholderPage
                  title="All Posts"
                  description="This page will show all blog posts with filtering and pagination options."
                />
              }
            />
            <Route
              path="/categories"
              element={
                <PlaceholderPage
                  title="Categories"
                  description="Browse posts by category to find content that interests you most."
                />
              }
            />
            <Route
              path="/category/:category"
              element={
                <PlaceholderPage
                  title="Category Posts"
                  description="Posts in this category will be displayed here with filtering options."
                />
              }
            />
            <Route
              path="/about"
              element={
                <PlaceholderPage
                  title="About Us"
                  description="Learn more about our blog, our mission, and the team behind the content."
                />
              }
            />
            <Route
              path="/contact"
              element={
                <PlaceholderPage
                  title="Contact Us"
                  description="Get in touch with us for collaborations, feedback, or general inquiries."
                />
              }
            />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}
