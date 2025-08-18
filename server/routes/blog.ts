import { RequestHandler } from "express";

// In-memory storage for demo purposes
// In a real application, you would use a database
let blogPosts: Array<{
  id: number;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  featuredImage: string;
  author: {
    name: string;
    avatar: string;
    initials: string;
  };
  status: "draft" | "published";
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
}> = [];

let nextId = 1;

// Create a new blog post
export const createBlogPost: RequestHandler = (req, res) => {
  try {
    const {
      title,
      excerpt,
      content,
      category,
      tags,
      featuredImage,
      author,
      status,
      publishedAt
    } = req.body;

    // Validation
    if (!title || !content) {
      return res.status(400).json({
        error: "Title and content are required"
      });
    }

    // Create new blog post
    const newPost = {
      id: nextId++,
      title: title.trim(),
      excerpt: excerpt?.trim() || "",
      content: content.trim(),
      category: category || "",
      tags: tags || [],
      featuredImage: featuredImage || "",
      author: author || {
        name: "Anonymous",
        avatar: "/placeholder.svg",
        initials: "AN"
      },
      status: status || "published",
      publishedAt: publishedAt || null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // Add to storage
    blogPosts.push(newPost);

    res.status(201).json({
      success: true,
      post: newPost
    });
  } catch (error) {
    console.error("Error creating blog post:", error);
    res.status(500).json({
      error: "Internal server error"
    });
  }
};

// Get all blog posts
export const getAllBlogPosts: RequestHandler = (req, res) => {
  try {
    const { status, category, limit } = req.query;
    
    let filteredPosts = [...blogPosts];

    // Filter by status
    if (status) {
      filteredPosts = filteredPosts.filter(post => post.status === status);
    }

    // Filter by category
    if (category) {
      filteredPosts = filteredPosts.filter(post => 
        post.category.toLowerCase() === (category as string).toLowerCase()
      );
    }

    // Sort by creation date (newest first)
    filteredPosts.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    // Limit results
    if (limit) {
      const limitNum = parseInt(limit as string);
      if (!isNaN(limitNum)) {
        filteredPosts = filteredPosts.slice(0, limitNum);
      }
    }

    res.json({
      success: true,
      posts: filteredPosts,
      total: filteredPosts.length
    });
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    res.status(500).json({
      error: "Internal server error"
    });
  }
};

// Get a single blog post by ID
export const getBlogPostById: RequestHandler = (req, res) => {
  try {
    const { id } = req.params;
    const postId = parseInt(id);

    if (isNaN(postId)) {
      return res.status(400).json({
        error: "Invalid post ID"
      });
    }

    const post = blogPosts.find(p => p.id === postId);

    if (!post) {
      return res.status(404).json({
        error: "Blog post not found"
      });
    }

    res.json({
      success: true,
      post
    });
  } catch (error) {
    console.error("Error fetching blog post:", error);
    res.status(500).json({
      error: "Internal server error"
    });
  }
};

// Update a blog post
export const updateBlogPost: RequestHandler = (req, res) => {
  try {
    const { id } = req.params;
    const postId = parseInt(id);

    if (isNaN(postId)) {
      return res.status(400).json({
        error: "Invalid post ID"
      });
    }

    const postIndex = blogPosts.findIndex(p => p.id === postId);

    if (postIndex === -1) {
      return res.status(404).json({
        error: "Blog post not found"
      });
    }

    // Update the post
    const updatedPost = {
      ...blogPosts[postIndex],
      ...req.body,
      id: postId, // Ensure ID doesn't change
      updatedAt: new Date().toISOString()
    };

    blogPosts[postIndex] = updatedPost;

    res.json({
      success: true,
      post: updatedPost
    });
  } catch (error) {
    console.error("Error updating blog post:", error);
    res.status(500).json({
      error: "Internal server error"
    });
  }
};

// Delete a blog post
export const deleteBlogPost: RequestHandler = (req, res) => {
  try {
    const { id } = req.params;
    const postId = parseInt(id);

    if (isNaN(postId)) {
      return res.status(400).json({
        error: "Invalid post ID"
      });
    }

    const postIndex = blogPosts.findIndex(p => p.id === postId);

    if (postIndex === -1) {
      return res.status(404).json({
        error: "Blog post not found"
      });
    }

    // Remove the post
    const deletedPost = blogPosts.splice(postIndex, 1)[0];

    res.json({
      success: true,
      message: "Blog post deleted successfully",
      post: deletedPost
    });
  } catch (error) {
    console.error("Error deleting blog post:", error);
    res.status(500).json({
      error: "Internal server error"
    });
  }
};
