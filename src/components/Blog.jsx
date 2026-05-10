import "./Blog.css";
import BrandHeader from "./BrandHeader";

export default function BlogPage({ onNavigate }) {
  const blogPosts = [
    {
      id: 1,
      title: "How to Reduce Medicine Wastage in Your Pharmacy",
      excerpt: "Learn proven strategies to minimize expiry losses and optimize your inventory management.",
      date: "May 8, 2026",
      category: "Inventory",
      image: "📦"
    },
    {
      id: 2,
      title: "Digital Tools Every Modern Pharmacy Needs",
      excerpt: "Discover how digital transformation can improve efficiency and customer satisfaction.",
      date: "May 5, 2026",
      category: "Technology",
      image: "💻"
    },
    {
      id: 3,
      title: "Building Customer Loyalty in Your Pharmacy",
      excerpt: "Best practices for retaining customers and increasing repeat purchases.",
      date: "April 30, 2026",
      category: "Business",
      image: "👥"
    },
    {
      id: 4,
      title: "Compliance and Regulations for Online Pharmacy",
      excerpt: "Navigate the regulatory landscape with confidence.",
      date: "April 25, 2026",
      category: "Compliance",
      image: "📋"
    },
    {
      id: 5,
      title: "Five Tips for Better Staff Management",
      excerpt: "Optimize your team's productivity and satisfaction.",
      date: "April 20, 2026",
      category: "Management",
      image: "👨‍💼"
    },
    {
      id: 6,
      title: "Seasonal Trends in Pharmacy Sales",
      excerpt: "Understand demand patterns and plan your inventory accordingly.",
      date: "April 15, 2026",
      category: "Analytics",
      image: "📊"
    }
  ];

  return (
    <div className="blog-container">
      {/* Navbar */}
      <div className="navbar">
        <div className="navbar-left">
          <BrandHeader showTagline={false} />
        </div>
        <div className="nav-links">
          <span onClick={() => onNavigate("About")}>About</span>
          <span onClick={() => onNavigate("Services")}>Service</span>
          <span onClick={() => onNavigate("ProductInfo")}>Product</span>
          <span onClick={() => onNavigate("Blog")}>Blog</span>
          <button className="contact-btn" onClick={() => onNavigate("Auth")}>Contact us</button>
        </div>
      </div>

      {/* Blog Content */}
      <div className="blog-content">
        <div className="blog-header">
          <h1>DoorMed Blog</h1>
          <p className="subtitle">Insights, Tips, and Updates for Pharmacy Professionals</p>
        </div>

        <section className="blog-posts">
          {blogPosts.map((post) => (
            <article key={post.id} className="blog-card">
              <div className="blog-card-image">
                <span className="blog-emoji">{post.image}</span>
              </div>
              <div className="blog-card-content">
                <div className="blog-meta">
                  <span className="blog-category">{post.category}</span>
                  <span className="blog-date">{post.date}</span>
                </div>
                <h3>{post.title}</h3>
                <p>{post.excerpt}</p>
                <a href="#" className="read-more">Read More →</a>
              </div>
            </article>
          ))}
        </section>

        <section className="blog-newsletter">
          <div className="newsletter-box">
            <h2>Subscribe to Our Newsletter</h2>
            <p>Get the latest pharmacy management tips and DoorMed updates delivered to your inbox.</p>
            <form onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="Enter your email" required />
              <button type="submit">Subscribe</button>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}
