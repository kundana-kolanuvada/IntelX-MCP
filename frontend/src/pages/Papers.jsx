import { Search } from "lucide-react";

function Papers() {
  return (
    <div className="papers-page">

      <div className="papers-header">
        <h1>Search Papers</h1>
        <p>
          Search research papers from connected academic sources.
        </p>
      </div>

      <div className="paper-search-box">
        <input
          type="text"
          placeholder="Search for papers, topics, authors..."
        />

        <button>
          <Search size={18} />
          <span>Search</span>
        </button>
      </div>

      <div className="papers-empty-state">
        <h2>No papers yet</h2>
        <p>
          Enter a search query to find research papers.
        </p>
      </div>

    </div>
  );
}

export default Papers;