import { useState, useEffect, useRef } from "react";

const PROJECTS = [
  {
    id: 1,
    title: "NeuralChat AI Assistant",
    description: "Conversational AI chatbot powered by transformer models with multi-turn memory and context awareness for enterprise support.",
    category: "AI",
    image_url: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600&q=80",
    project_link: "#",
    tags: ["chatbot", "NLP", "transformers", "GPT", "OpenAI"],
    featured: true,
  },
  {
    id: 2,
    title: "ShopSphere E-Commerce",
    description: "Full-stack e-commerce platform with real-time inventory, Stripe checkout, and a headless CMS-driven storefront.",
    category: "Web",
    image_url: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&q=80",
    project_link: "#",
    tags: ["React", "Node.js", "Stripe", "MongoDB", "e-commerce"],
    featured: false,
  },
  {
    id: 3,
    title: "FitTrack Mobile App",
    description: "Cross-platform fitness tracker with workout logging, body metrics, and adaptive training recommendations.",
    category: "Mobile",
    image_url: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&q=80",
    project_link: "#",
    tags: ["React Native", "HealthKit", "fitness", "iOS", "Android"],
    featured: true,
  },
  {
    id: 4,
    title: "DataSense Analytics",
    description: "Python-based data pipeline and visualization dashboard with pandas, Plotly, and automated ML model evaluation.",
    category: "Python",
    image_url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80",
    project_link: "#",
    tags: ["pandas", "Plotly", "machine learning", "data pipeline", "scikit-learn"],
    featured: false,
  },
  {
    id: 5,
    title: "VisionGuard Object Detection",
    description: "Real-time computer vision system for detecting and classifying objects using YOLOv8 and a custom-trained dataset.",
    category: "AI",
    image_url: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&q=80",
    project_link: "#",
    tags: ["YOLO", "computer vision", "OpenCV", "deep learning", "object detection"],
    featured: false,
  },
  {
    id: 6,
    title: "PortfolioOS Dashboard",
    description: "Modern developer portfolio with dark/light mode, animated skill graphs, and a live GitHub activity feed.",
    category: "Web",
    image_url: "https://images.unsplash.com/photo-1545670723-196ed0954986?w=600&q=80",
    project_link: "#",
    tags: ["Next.js", "portfolio", "GitHub API", "Tailwind", "Framer Motion"],
    featured: true,
  },
  {
    id: 7,
    title: "CryptoWallet App",
    description: "Mobile-first crypto portfolio tracker with real-time price feeds, swap functionality, and biometric auth.",
    category: "Mobile",
    image_url: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&q=80",
    project_link: "#",
    tags: ["Flutter", "crypto", "Web3", "biometric", "DeFi"],
    featured: false,
  },
  {
    id: 8,
    title: "AutoScraper Framework",
    description: "Async Python web scraping framework with proxy rotation, CAPTCHA bypass, and structured data export to JSON/CSV.",
    category: "Python",
    image_url: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=600&q=80",
    project_link: "#",
    tags: ["Scrapy", "BeautifulSoup", "async", "scraping", "automation"],
    featured: false,
  },
  {
    id: 9,
    title: "SentimentAI Reviews",
    description: "NLP sentiment analysis API for product reviews using BERT fine-tuning, deployed on AWS Lambda with FastAPI.",
    category: "AI",
    image_url: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600&q=80",
    project_link: "#",
    tags: ["BERT", "sentiment analysis", "FastAPI", "AWS", "NLP"],
    featured: true,
  },
  {
    id: 10,
    title: "TaskFlow SaaS",
    description: "Project management web app with Kanban boards, time tracking, team collaboration, and Slack integrations.",
    category: "Web",
    image_url: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600&q=80",
    project_link: "#",
    tags: ["Vue.js", "Kanban", "SaaS", "real-time", "Slack"],
    featured: false,
  },
  {
    id: 11,
    title: "MindSpace Meditation",
    description: "Guided meditation mobile app with AI-personalized sessions, sleep sounds, and mood journal tracking.",
    category: "Mobile",
    image_url: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&q=80",
    project_link: "#",
    tags: ["Swift", "meditation", "AI", "mental health", "iOS"],
    featured: false,
  },
  {
    id: 12,
    title: "PyBot Trading Engine",
    description: "Algorithmic cryptocurrency trading bot using Python with backtesting, strategy optimization, and live exchange APIs.",
    category: "Python",
    image_url: "https://images.unsplash.com/photo-1640340434855-6084b1f4901c?w=600&q=80",
    project_link: "#",
    tags: ["algorithmic trading", "backtrader", "CCXT", "crypto", "automation"],
    featured: true,
  },
];

const CATEGORIES = ["All", "Web", "Mobile", "AI", "Python"];

const CATEGORY_COLORS = {
  Web: { bg: "#EEF2FF", text: "#4338ca", dot: "#6366f1" },
  Mobile: { bg: "#F0FDF4", text: "#15803d", dot: "#22c55e" },
  AI: { bg: "#FFF7ED", text: "#c2410c", dot: "#f97316" },
  Python: { bg: "#FDF4FF", text: "#7e22ce", dot: "#a855f7" },
};

function useDebounce(value, delay) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

function Badge({ category }) {
  const colors = CATEGORY_COLORS[category] || { bg: "#F3F4F6", text: "#374151", dot: "#9CA3AF" };
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 5, padding: "3px 10px",
      borderRadius: 20, fontSize: 11, fontWeight: 600, letterSpacing: "0.04em",
      background: colors.bg, color: colors.text
    }}>
      <span style={{ width: 6, height: 6, borderRadius: "50%", background: colors.dot, display: "inline-block" }} />
      {category}
    </span>
  );
}

function ProjectCard({ project, index }) {
  const [imgError, setImgError] = useState(false);
  const gradients = {
    Web: "linear-gradient(135deg,#667eea,#764ba2)",
    Mobile: "linear-gradient(135deg,#43e97b,#38f9d7)",
    AI: "linear-gradient(135deg,#f7971e,#ffd200)",
    Python: "linear-gradient(135deg,#a18cd1,#fbc2eb)",
  };

  return (
    <div style={{
      background: "#fff",
      borderRadius: 16,
      overflow: "hidden",
      border: "1px solid #F1F5F9",
      boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
      display: "flex",
      flexDirection: "column",
      animation: `fadeSlideIn 0.35s ease both`,
      animationDelay: `${index * 0.06}s`,
    }}>
      <div style={{ position: "relative", height: 180, overflow: "hidden", flexShrink: 0 }}>
        {!imgError ? (
          <img
            src={project.image_url}
            alt={project.title}
            onError={() => setImgError(true)}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        ) : (
          <div style={{ width: "100%", height: "100%", background: gradients[project.category] || "#e2e8f0", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: 48, opacity: 0.6 }}>
              {project.category === "Web" ? "🌐" : project.category === "Mobile" ? "📱" : project.category === "AI" ? "🤖" : "🐍"}
            </span>
          </div>
        )}
        {project.featured && (
          <div style={{
            position: "absolute", top: 12, right: 12,
            background: "rgba(255,255,255,0.95)", color: "#f59e0b",
            fontSize: 11, fontWeight: 700, padding: "3px 9px", borderRadius: 20,
            display: "flex", alignItems: "center", gap: 4, backdropFilter: "blur(4px)",
            boxShadow: "0 2px 8px rgba(0,0,0,0.12)"
          }}>
            ★ Featured
          </div>
        )}
        <div style={{ position: "absolute", top: 12, left: 12 }}>
          <Badge category={project.category} />
        </div>
      </div>

      <div style={{ padding: "18px 20px 20px", display: "flex", flexDirection: "column", flex: 1, gap: 10 }}>
        <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: "#0F172A", lineHeight: 1.35 }}>
          {project.title}
        </h3>
        <p style={{ margin: 0, fontSize: 13.5, color: "#64748B", lineHeight: 1.65, flex: 1 }}>
          {project.description}
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {project.tags.slice(0, 3).map(tag => (
            <span key={tag} style={{
              fontSize: 11, color: "#475569", background: "#F8FAFC",
              border: "1px solid #E2E8F0", padding: "3px 9px", borderRadius: 20, fontFamily: "monospace"
            }}>
              {tag}
            </span>
          ))}
          {project.tags.length > 3 && (
            <span style={{ fontSize: 11, color: "#94A3B8", padding: "3px 6px" }}>+{project.tags.length - 3}</span>
          )}
        </div>
        <a
          href={project.project_link}
          style={{
            display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 6,
            padding: "9px 0", borderRadius: 10, fontSize: 13.5, fontWeight: 600,
            background: "#0F172A", color: "#fff", textDecoration: "none",
            marginTop: 4, transition: "background 0.2s, transform 0.15s",
          }}
          onMouseEnter={e => { e.target.style.background = "#1E293B"; e.target.style.transform = "translateY(-1px)"; }}
          onMouseLeave={e => { e.target.style.background = "#0F172A"; e.target.style.transform = "translateY(0)"; }}
        >
          View Project →
        </a>
      </div>
    </div>
  );
}

export default function ProjectsSystem() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchInput, setSearchInput] = useState("");
  const [showCount, setShowCount] = useState(9);
  const searchRef = useRef(null);
  const debouncedSearch = useDebounce(searchInput, 220);

  const filtered = PROJECTS.filter(p => {
    const matchCat = activeCategory === "All" || p.category === activeCategory;
    const q = debouncedSearch.toLowerCase().trim();
    const matchSearch = !q || [p.title, p.description, p.category, ...p.tags].some(s => s.toLowerCase().includes(q));
    return matchCat && matchSearch;
  });

  const visible = filtered.slice(0, showCount);
  const hasMore = filtered.length > showCount;

  // useEffect(() => { setShowCount(9); }, [activeCategory, debouncedSearch]);

  const catCounts = CATEGORIES.reduce((acc, cat) => {
    acc[cat] = cat === "All"
      ? PROJECTS.length
      : PROJECTS.filter(p => p.category === cat).length;
    return acc;
  }, {});

  const CAT_ICONS = { All: "✦", Web: "🌐", Mobile: "📱", AI: "🤖", Python: "🐍" };

  return (
    <div style={{ minHeight: "100vh", background: "#F8FAFC", fontFamily: "'Segoe UI', system-ui, sans-serif" }}>
      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(18px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes fadeIn {
          from { opacity: 0; } to { opacity: 1; }
        }
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #CBD5E1; border-radius: 3px; }
      `}</style>

      <div style={{
        background: "linear-gradient(135deg,#0F172A 0%,#1E3A5F 60%,#0F2D4A 100%)",
        padding: "56px 24px 52px", textAlign: "center"
      }}>
        <div style={{
          display: "inline-block", background: "rgba(99,102,241,0.2)", color: "#a5b4fc",
          fontSize: 12, fontWeight: 700, letterSpacing: "0.12em", padding: "5px 16px",
          borderRadius: 20, border: "1px solid rgba(99,102,241,0.35)", marginBottom: 18, textTransform: "uppercase"
        }}>
          Portfolio Showcase
        </div>
        <h1 style={{ margin: "0 0 14px", fontSize: "clamp(28px,5vw,48px)", fontWeight: 800, color: "#fff", lineHeight: 1.18 }}>
          My Projects
        </h1>
        <p style={{ margin: "0 auto 32px", maxWidth: 520, color: "#94A3B8", fontSize: 16, lineHeight: 1.7 }}>
          Explore {PROJECTS.length} projects across Web, Mobile, AI, and Python — filter by category or search by keyword.
        </p>

        <div style={{ maxWidth: 480, margin: "0 auto", position: "relative" }}>
          <span style={{
            position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)",
            fontSize: 18, color: "#94A3B8", pointerEvents: "none"
          }}>🔍</span>
          <input
            ref={searchRef}
            type="text"
            value={searchInput}
            onChange={e => setSearchInput(e.target.value)}
            placeholder="Search by name, tech, or keyword…"
            style={{
              width: "100%", padding: "14px 44px 14px 46px", borderRadius: 14, fontSize: 15,
              border: "1.5px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.08)",
              color: "#F1F5F9", outline: "none", backdropFilter: "blur(8px)",
              transition: "border 0.2s, background 0.2s",
            }}
            onFocus={e => { e.target.style.border = "1.5px solid rgba(99,102,241,0.7)"; e.target.style.background = "rgba(255,255,255,0.12)"; }}
            onBlur={e => { e.target.style.border = "1.5px solid rgba(255,255,255,0.12)"; e.target.style.background = "rgba(255,255,255,0.08)"; }}
          />
          {searchInput && (
            <button
              onClick={() => setSearchInput("")}
              style={{
                position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)",
                background: "rgba(255,255,255,0.15)", border: "none", color: "#94A3B8",
                cursor: "pointer", fontSize: 14, width: 26, height: 26, borderRadius: "50%",
                display: "flex", alignItems: "center", justifyContent: "center"
              }}
            >✕</button>
          )}
        </div>
      </div>

      <div style={{ maxWidth: 1120, margin: "0 auto", padding: "0 20px 60px" }}>
        
        <div style={{
          display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center",
          padding: "28px 0 32px"
        }}>
          {CATEGORIES.map(cat => {
            const active = activeCategory === cat;
            const colors = CATEGORY_COLORS[cat];
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  display: "flex", alignItems: "center", gap: 8, padding: "10px 20px",
                  borderRadius: 50, fontSize: 14, fontWeight: active ? 700 : 500, cursor: "pointer",
                  border: active ? "2px solid transparent" : "1.5px solid #E2E8F0",
                  background: active
                    ? cat === "All" ? "#0F172A" : colors.bg
                    : "#fff",
                  color: active
                    ? cat === "All" ? "#fff" : colors.text
                    : "#475569",
                  transition: "all 0.2s",
                  boxShadow: active ? "0 4px 16px rgba(0,0,0,0.13)" : "none",
                  transform: active ? "translateY(-2px)" : "none",
                }}
              >
                <span style={{ fontSize: 16 }}>{CAT_ICONS[cat]}</span>
                {cat === "All" ? "All Projects" : cat === "Web" ? "Web Design" : cat === "Mobile" ? "Mobile Apps" : cat === "AI" ? "AI Projects" : "Python Projects"}
                <span style={{
                  background: active ? "rgba(255,255,255,0.25)" : "#F1F5F9",
                  color: active ? (cat === "All" ? "#fff" : colors.text) : "#94A3B8",
                  fontSize: 11, fontWeight: 700, padding: "2px 7px", borderRadius: 12
                }}>
                  {catCounts[cat]}
                </span>
              </button>
            );
          })}
        </div>

        
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, flexWrap: "wrap", gap: 10 }}>
          <p style={{ margin: 0, color: "#64748B", fontSize: 14 }}>
            {filtered.length === 0 ? "No projects found" : (
              <>Showing <strong style={{ color: "#0F172A" }}>{Math.min(visible.length, filtered.length)}</strong> of <strong style={{ color: "#0F172A" }}>{filtered.length}</strong> project{filtered.length !== 1 ? "s" : ""}
                {debouncedSearch && <> matching <em>"{debouncedSearch}"</em></>}
                {activeCategory !== "All" && <> in <Badge category={activeCategory} /></>}
              </>
            )}
          </p>
          {(activeCategory !== "All" || searchInput) && (
            <button
              onClick={() => { setActiveCategory("All"); setSearchInput(""); }}
              style={{
                fontSize: 13, color: "#6366F1", background: "#EEF2FF", border: "none",
                borderRadius: 20, padding: "5px 14px", cursor: "pointer", fontWeight: 600
              }}
            >
              ✕ Clear filters
            </button>
          )}
        </div>

        {filtered.length === 0 ? (
          <div style={{
            textAlign: "center", padding: "80px 24px",
            background: "#fff", borderRadius: 20, border: "1px dashed #CBD5E1",
            animation: "fadeIn 0.3s ease"
          }}>
            <div style={{ fontSize: 56, marginBottom: 16 }}>🔭</div>
            <h3 style={{ margin: "0 0 8px", color: "#0F172A", fontSize: 20 }}>No projects found</h3>
            <p style={{ color: "#64748B", margin: "0 0 20px", fontSize: 14 }}>
              Try a different search term or category.
            </p>
            <button
              onClick={() => { setActiveCategory("All"); setSearchInput(""); }}
              style={{
                background: "#0F172A", color: "#fff", border: "none", padding: "10px 24px",
                borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: "pointer"
              }}
            >
              Show all projects
            </button>
          </div>
        ) : (
          <>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: 22,
            }}>
              {visible.map((p, i) => <ProjectCard key={p.id} project={p} index={i} />)}
            </div>

            {hasMore && (
              <div style={{ textAlign: "center", marginTop: 40 }}>
                <button
                  onClick={() => setShowCount(s => s + 6)}
                  style={{
                    padding: "13px 36px", borderRadius: 12, fontSize: 15, fontWeight: 600,
                    background: "#fff", color: "#0F172A", border: "2px solid #E2E8F0",
                    cursor: "pointer", transition: "all 0.2s",
                  }}
                  onMouseEnter={e => { e.target.style.borderColor = "#6366F1"; e.target.style.color = "#6366F1"; }}
                  onMouseLeave={e => { e.target.style.borderColor = "#E2E8F0"; e.target.style.color = "#0F172A"; }}
                >
                  Load more projects ({filtered.length - showCount} remaining)
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}