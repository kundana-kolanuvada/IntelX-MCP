import {
  LayoutDashboard,
  FileText,
  Upload,
  GitCompare,
  BookOpen,
  StickyNote,
  Quote,
  Settings,
  Plus,
  Search,
  Sparkles,
} from "lucide-react";

import "./App.css";

function App() {
  return (
    <div className="app">

      {/* Sidebar */}
      <aside className="sidebar">

        <div className="sidebar-title">
          <h2>IntelX</h2>
        </div>

        <nav className="sidebar-nav">

          <button className="nav-item active">
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </button>

          <button className="nav-item">
            <FileText size={20} />
            <span>Papers</span>
          </button>

          <button className="nav-item">
            <Upload size={20} />
            <span>Upload PDF</span>
          </button>

          <button className="nav-item">
            <GitCompare size={20} />
            <span>Compare</span>
          </button>

          <button className="nav-item">
            <BookOpen size={20} />
            <span>Literature Review</span>
          </button>

          <button className="nav-item">
            <StickyNote size={20} />
            <span>Notes</span>
          </button>


        </nav>

        <button className="nav-item settings">
          <Settings size={20} />
          <span>Settings</span>
        </button>

      </aside>


      {/* Main Content */}
      <main className="main-content">

        {/* Welcome */}
        <section className="welcome-section">

          <h1>
            Hello, Researcher!
          </h1>

          <p>
            How can I help with your research today?
          </p>

        </section>


        {/* Feature Cards */}
        <section className="feature-grid">

          {/* Upload PDF */}
          <div className="feature-card">

            <div className="feature-icon purple">
              <Upload size={20} />
            </div>

            <div>
              <h3>Upload PDF</h3>
              <p>Upload and analyze your papers</p>
            </div>

          </div>


          {/* Search Papers */}
          <button className="feature-card">

            <div className="feature-icon green">
              <Search size={20} />
            </div>

            <div>
              <h3>Search Papers</h3>
              <p>Search papers from ArXiv & Semantic Scholar</p>
            </div>

          </button>


          {/* Compare Papers */}
          <div className="feature-card">

            <div className="feature-icon orange">
              <GitCompare size={20} />
            </div>

            <div>
              <h3>Compare Papers</h3>
              <p>Compare two papers side-by-side</p>
            </div>

          </div>


          {/* Literature Review */}
          <div className="feature-card">

            <div className="feature-icon violet">
              <Sparkles size={20} />
            </div>

            <div>
              <h3>Literature Review</h3>
              <p>Generate literature review on a topic</p>
            </div>

          </div>

        </section>


        {/* Recent Sections */}
        <section className="dashboard-grid">

          {/* Recent Papers */}
          <div className="dashboard-card">

            <div className="card-header">
              <h2>Recent Papers</h2>
            </div>

            <div className="empty-state">
              <h3>No papers yet</h3>
              <p>
                Search for research papers to see them here.
              </p>
            </div>

          </div>


          {/* Recent Notes */}
          <div className="dashboard-card notes-card">

            <div className="card-header">
              <h2>Recent Notes</h2>
            </div>

            <div className="empty-state">
              <h3>No notes yet</h3>
              <p>
                Your saved research notes will appear here.
              </p>
            </div>

          </div>

        </section>

      </main>

    </div>
  );
}

export default App;