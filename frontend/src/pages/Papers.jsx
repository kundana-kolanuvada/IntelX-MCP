import { useState } from "react";
import { ExternalLink, Search } from "lucide-react";

const API_BASE_URL = "http://127.0.0.1:8000";

function Papers() {
  const [query, setQuery] = useState("");
  const [papers, setPapers] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSearch(event) {
    event.preventDefault();
    const searchTerm = query.trim();

    if (!searchTerm || isLoading) return;

    setError("");
    setHasSearched(true);
    setIsLoading(true);

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/search?q=${encodeURIComponent(searchTerm)}`,
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "The paper search failed. Please try again.");
      }

      setPapers(Array.isArray(data.papers) ? data.papers : []);
    } catch (searchError) {
      setPapers([]);
      setError(
        searchError instanceof TypeError
          ? "Could not reach the IntelX backend. Make sure it is running at http://127.0.0.1:8000."
          : searchError.message,
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="papers-page" aria-labelledby="papers-title">
      <header className="papers-header">
        <p className="eyebrow">RESEARCH LIBRARY</p>
        <h1 id="papers-title">Search Papers</h1>
        <p>Find arXiv research papers by title, topic, author, or paper ID.</p>
      </header>

      <form className="paper-search-box" onSubmit={handleSearch} role="search">
        <Search size={19} aria-hidden="true" />
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Try transformer or an arXiv ID"
          aria-label="Search research papers"
        />
        <button type="submit" disabled={!query.trim() || isLoading}>
          {isLoading ? "Searching..." : "Search"}
        </button>
      </form>
      <p className="search-hint">Press Enter to search arXiv.</p>

      <div className="papers-results" aria-live="polite" aria-busy={isLoading}>
        {isLoading && (
          <div className="papers-message">
            <span className="loading-spinner" aria-hidden="true" />
            <p>Searching arXiv...</p>
          </div>
        )}

        {!isLoading && error && (
          <div className="papers-message papers-error" role="alert">
            <h2>Search could not be completed</h2>
            <p>{error}</p>
          </div>
        )}

        {!isLoading && !error && !hasSearched && (
          <div className="papers-message">
            <div className="papers-message-icon"><Search size={21} /></div>
            <h2>Start with a research topic</h2>
            <p>Search arXiv to find relevant papers and their abstracts.</p>
          </div>
        )}

        {!isLoading && !error && hasSearched && papers.length === 0 && (
          <div className="papers-message">
            <h2>No papers found</h2>
            <p>Try another topic, author name, or arXiv ID.</p>
          </div>
        )}

        {!isLoading && !error && papers.length > 0 && (
          <>
            <div className="results-heading">
              <h2>Search results</h2>
              <span>{papers.length} {papers.length === 1 ? "paper" : "papers"}</span>
            </div>
            <div className="papers-list">
              {papers.map((paper) => {
                const paperId = paper.id?.split("/").pop() || paper.id;
                const authors = Array.isArray(paper.authors)
                  ? paper.authors.join(", ")
                  : paper.authors;

                return (
                  <article className="research-paper-card" key={paper.id}>
                    <div className="research-paper-content">
                      <p className="paper-meta">
                        arXiv:{paperId} <span>·</span> {paper.published?.slice(0, 4)}
                      </p>
                      <h3>{paper.title}</h3>
                      <p className="paper-authors">{authors}</p>
                      <p className="paper-abstract">{paper.abstract}</p>
                    </div>
                    <a href={paper.url} target="_blank" rel="noreferrer">
                      Read on arXiv <ExternalLink size={15} aria-hidden="true" />
                    </a>
                  </article>
                );
              })}
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default Papers;
