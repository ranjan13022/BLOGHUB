import { RequestHandler } from "express";

// Mock data storage for demo purposes
// In a real application, this would connect to a database
interface AnalyticsData {
  totalPosts: number;
  totalViews: number;
  totalUsers: number;
  publishedThisMonth: number;
  viewsByCategory: Record<string, number>;
  topPosts: Array<{
    id: number;
    title: string;
    views: number;
    category: string;
  }>;
}

interface UserData {
  id: number;
  name: string;
  email: string;
  subscribedAt: string;
  isActive: boolean;
}

let analyticsData: AnalyticsData = {
  totalPosts: 4,
  totalViews: 4240,
  totalUsers: 1234,
  publishedThisMonth: 3,
  viewsByCategory: {
    "Technology": 2100,
    "Design": 890,
    "Writing": 0,
    "Security": 1250
  },
  topPosts: [
    { id: 4, title: "Understanding Modern Authentication", views: 2100, category: "Security" },
    { id: 1, title: "The Future of Web Development: Trends to Watch in 2024", views: 1250, category: "Technology" },
    { id: 2, title: "Building Sustainable Design Systems", views: 890, category: "Design" }
  ]
};

let users: UserData[] = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    subscribedAt: "2024-01-14",
    isActive: true
  },
  {
    id: 2,
    name: "Bob Smith",
    email: "bob.smith@example.com",
    subscribedAt: "2024-01-13",
    isActive: true
  },
  {
    id: 3,
    name: "Carol Davis",
    email: "carol.davis@example.com",
    subscribedAt: "2024-01-12",
    isActive: true
  },
  {
    id: 4,
    name: "David Wilson",
    email: "david.wilson@example.com",
    subscribedAt: "2024-01-11",
    isActive: false
  }
];

// Get dashboard analytics
export const getAnalytics: RequestHandler = (req, res) => {
  try {
    res.json({
      success: true,
      analytics: analyticsData
    });
  } catch (error) {
    console.error("Error fetching analytics:", error);
    res.status(500).json({
      error: "Internal server error"
    });
  }
};

// Get user statistics
export const getUserStats: RequestHandler = (req, res) => {
  try {
    const { limit, active } = req.query;
    
    let filteredUsers = [...users];
    
    // Filter by active status if specified
    if (active !== undefined) {
      const isActive = active === "true";
      filteredUsers = filteredUsers.filter(user => user.isActive === isActive);
    }
    
    // Sort by subscription date (newest first)
    filteredUsers.sort((a, b) => 
      new Date(b.subscribedAt).getTime() - new Date(a.subscribedAt).getTime()
    );
    
    // Limit results if specified
    if (limit) {
      const limitNum = parseInt(limit as string);
      if (!isNaN(limitNum)) {
        filteredUsers = filteredUsers.slice(0, limitNum);
      }
    }

    const stats = {
      totalUsers: users.length,
      activeUsers: users.filter(u => u.isActive).length,
      inactiveUsers: users.filter(u => !u.isActive).length,
      recentSubscribers: users.filter(u => {
        const subDate = new Date(u.subscribedAt);
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        return subDate >= weekAgo;
      }).length
    };

    res.json({
      success: true,
      stats,
      users: filteredUsers
    });
  } catch (error) {
    console.error("Error fetching user stats:", error);
    res.status(500).json({
      error: "Internal server error"
    });
  }
};

// Get posts with admin metadata
export const getPostsAdmin: RequestHandler = (req, res) => {
  try {
    const { status, category, limit, search } = req.query;
    
    // This would normally fetch from the blog posts storage
    // For demo, we'll use mock data that matches the blog posts
    let posts = [
      {
        id: 1,
        title: "The Future of Web Development: Trends to Watch in 2024",
        status: "published",
        author: "Sarah Chen",
        publishedAt: "2024-01-15",
        views: 1250,
        category: "Technology",
        excerpt: "Explore the cutting-edge technologies and methodologies that are shaping the future of web development this year.",
        lastModified: "2024-01-15T10:30:00Z"
      },
      {
        id: 2,
        title: "Building Sustainable Design Systems",
        status: "published",
        author: "Marcus Rodriguez",
        publishedAt: "2024-01-12",
        views: 890,
        category: "Design",
        excerpt: "Learn how to create design systems that scale with your team and maintain consistency across products.",
        lastModified: "2024-01-12T14:20:00Z"
      },
      {
        id: 3,
        title: "The Art of Technical Writing",
        status: "draft",
        author: "Emma Thompson",
        publishedAt: "2024-01-10",
        views: 0,
        category: "Writing",
        excerpt: "Master the fundamentals of writing clear, concise technical documentation that actually helps people.",
        lastModified: "2024-01-10T16:45:00Z"
      },
      {
        id: 4,
        title: "Understanding Modern Authentication",
        status: "published",
        author: "David Kim",
        publishedAt: "2024-01-08",
        views: 2100,
        category: "Security",
        excerpt: "A comprehensive guide to implementing secure authentication in modern web applications.",
        lastModified: "2024-01-08T09:15:00Z"
      }
    ];

    // Apply filters
    if (status && status !== "all") {
      posts = posts.filter(post => post.status === status);
    }

    if (category && category !== "all") {
      posts = posts.filter(post => 
        post.category.toLowerCase() === (category as string).toLowerCase()
      );
    }

    if (search) {
      const searchTerm = (search as string).toLowerCase();
      posts = posts.filter(post => 
        post.title.toLowerCase().includes(searchTerm) ||
        post.author.toLowerCase().includes(searchTerm) ||
        post.category.toLowerCase().includes(searchTerm)
      );
    }

    // Sort by last modified (newest first)
    posts.sort((a, b) => 
      new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime()
    );

    // Limit results
    if (limit) {
      const limitNum = parseInt(limit as string);
      if (!isNaN(limitNum)) {
        posts = posts.slice(0, limitNum);
      }
    }

    res.json({
      success: true,
      posts,
      total: posts.length
    });
  } catch (error) {
    console.error("Error fetching posts for admin:", error);
    res.status(500).json({
      error: "Internal server error"
    });
  }
};

// Update post status (publish/unpublish)
export const updatePostStatus: RequestHandler = (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const postId = parseInt(id);

    if (isNaN(postId)) {
      return res.status(400).json({
        error: "Invalid post ID"
      });
    }

    if (!["published", "draft"].includes(status)) {
      return res.status(400).json({
        error: "Invalid status. Must be 'published' or 'draft'"
      });
    }

    // In a real app, this would update the database
    // For demo, we'll just return success
    res.json({
      success: true,
      message: `Post ${postId} status updated to ${status}`,
      postId,
      newStatus: status
    });
  } catch (error) {
    console.error("Error updating post status:", error);
    res.status(500).json({
      error: "Internal server error"
    });
  }
};

// Delete post (admin only)
export const deletePost: RequestHandler = (req, res) => {
  try {
    const { id } = req.params;
    const postId = parseInt(id);

    if (isNaN(postId)) {
      return res.status(400).json({
        error: "Invalid post ID"
      });
    }

    // In a real app, this would delete from the database
    // For demo, we'll just return success
    res.json({
      success: true,
      message: `Post ${postId} has been deleted`,
      postId
    });
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({
      error: "Internal server error"
    });
  }
};

// Export data (for backup)
export const exportData: RequestHandler = (req, res) => {
  try {
    const { type } = req.params;
    
    let exportData;
    let filename;
    
    switch (type) {
      case "posts":
        // In real app, fetch all posts from database
        exportData = {
          exportedAt: new Date().toISOString(),
          type: "posts",
          data: [] // This would contain all posts
        };
        filename = `posts-export-${new Date().toISOString().split('T')[0]}.json`;
        break;
        
      case "analytics":
        exportData = {
          exportedAt: new Date().toISOString(),
          type: "analytics",
          data: analyticsData
        };
        filename = `analytics-export-${new Date().toISOString().split('T')[0]}.json`;
        break;
        
      case "users":
        exportData = {
          exportedAt: new Date().toISOString(),
          type: "users",
          data: users.map(user => ({
            ...user,
            email: user.email.replace(/@.*/, "@***") // Anonymize emails
          }))
        };
        filename = `users-export-${new Date().toISOString().split('T')[0]}.json`;
        break;
        
      default:
        return res.status(400).json({
          error: "Invalid export type. Use 'posts', 'analytics', or 'users'"
        });
    }

    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.setHeader('Content-Type', 'application/json');
    res.json(exportData);
  } catch (error) {
    console.error("Error exporting data:", error);
    res.status(500).json({
      error: "Internal server error"
    });
  }
};

// Get admin dashboard summary
export const getDashboardSummary: RequestHandler = (req, res) => {
  try {
    const summary = {
      posts: {
        total: analyticsData.totalPosts,
        published: 3,
        drafts: 1,
        thisMonth: analyticsData.publishedThisMonth
      },
      engagement: {
        totalViews: analyticsData.totalViews,
        averageViews: Math.round(analyticsData.totalViews / analyticsData.totalPosts),
        topCategory: "Technology"
      },
      users: {
        total: users.length,
        active: users.filter(u => u.isActive).length,
        newThisWeek: users.filter(u => {
          const subDate = new Date(u.subscribedAt);
          const weekAgo = new Date();
          weekAgo.setDate(weekAgo.getDate() - 7);
          return subDate >= weekAgo;
        }).length
      }
    };

    res.json({
      success: true,
      summary
    });
  } catch (error) {
    console.error("Error fetching dashboard summary:", error);
    res.status(500).json({
      error: "Internal server error"
    });
  }
};
