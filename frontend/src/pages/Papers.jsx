import { useState } from "react";
import { ExternalLink, Search } from "lucide-react";

// Temporary UI data for frontend development. Replace this with the agreed API
// response when the Module 1 backend is ready.
const demoPapers = [
  {
    id: "1706.03762",
    title: "Attention Is All You Need",
    authors: "Ashish Vaswani, Noam Shazeer, Niki Parmar, and others",
    abstract:
      "This paper proposes the Transformer, a model architecture based entirely on attention mechanisms for sequence modeling tasks.",
    published: "2017",
    url: "https://arxiv.org/abs/1706.03762",
  },
  {
    id: "1810.04805",
    title: "BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding",
    authors: "Jacob Devlin, Ming-Wei Chang, Kenton Lee, and Kristina Toutanova",
    abstract:
      "BERT is designed to pre-train deep bidirectional representations from unlabeled text by jointly conditioning on both left and right context.",
    published: "2018",
    url: "https://arxiv.org/abs/1810.04805",
  },
  {
    id: "1512.03385",
    title: "Deep Residual Learning for Image Recognition",
    authors: "Kaiming He, Xiangyu Zhang, Shaoqing Ren, and Jian Sun",
    abstract:
      "The authors present a residual learning framework that makes it easier to train deeper neural networks for image recognition.",
    published: "2015",
    url: "https://arxiv.org/abs/1512.03385",
  },
];

function Papers() {
  const [query, setQuery] = useState("");
  const [papers, setPapers] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  function handleSearch(event) {
    event.preventDefault();
    const searchTerm = query.trim();

    if (!searchTerm || isLoading) return;

    setError("");
    setHasSearched(true);
    setIsLoading(true);

    // Simulate a request while the backend endpoint is being developed.
    window.setTimeout(() => {
      try {
        const normalizedQuery = searchTerm.toLowerCase();
        const matches = demoPapers.filter((paper) =>
          `${paper.title} ${paper.authors} ${paper.abstract} ${paper.id}`
            .toLowerCase()
            .includes(normalizedQuery),
        );

        setPapers(matches);
      } catch {
        setError("Please try your search again.");
      } finally {
        setIsLoading(false);
      }
    }, 350);
  }

  return (
    <section className="papers-page" aria-labelledby="papers-title">
      <header className="papers-header">
        <p className="eyebrow">RESEARCH LIBRARY</p>
        <h1 id="papers-title">Search Papers</h1>
        <p>Find research papers by title, topic, author, or arXiv ID.</p>
      </header>

      <form className="paper-search-box" onSubmit={handleSearch} role="search">
        <Search size={19} aria-hidden="true" />
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Try “transformer” or an arXiv ID"
          aria-label="Search research papers"
        />
        <button type="submit" disabled={!query.trim() || isLoading}>
          {isLoading ? "Searching…" : "Search"}
        </button>
      </form>
      <p className="search-hint">Press Enter to search. Search uses sample papers for now.</p>

      <div className="papers-results" aria-live="polite" aria-busy={isLoading}>
        {isLoading && (
          <div className="papers-message">
            <span className="loading-spinner" aria-hidden="true" />
            <p>Searching papers…</p>
          </div>
        )}

        {!isLoading && error && (
          <div className="papers-message papers-error" role="alert">
            <h2>Search couldn’t be completed</h2>
            <p>{error}</p>
          </div>
        )}

        {!isLoading && !error && !hasSearched && (
          <div className="papers-message">
            <div className="papers-message-icon"><Search size={21} /></div>
            <h2>Start with a research topic</h2>
            <p>Search sample papers now; live arXiv results will be connected with the team API.</p>
          </div>
        )}

        {!isLoading && !error && hasSearched && papers.length === 0 && (
          <div className="papers-message">
            <h2>No matching sample papers</h2>
            <p>Try “attention”, “BERT”, “image recognition”, or an arXiv ID.</p>
          </div>
        )}

        {!isLoading && !error && papers.length > 0 && (
          <>
            <div className="results-heading">
              <h2>Search results</h2>
              <span>{papers.length} {papers.length === 1 ? "paper" : "papers"}</span>
            </div>
            <div className="papers-list">
              {papers.map((paper) => (
                <article className="research-paper-card" key={paper.id}>
                  <div className="research-paper-content">
                    <p className="paper-meta">arXiv:{paper.id} <span>·</span> {paper.published}</p>
                    <h3>{paper.title}</h3>
                    <p className="paper-authors">{paper.authors}</p>
                    <p className="paper-abstract">{paper.abstract}</p>
                  </div>
                  <a href={paper.url} target="_blank" rel="noreferrer">
                    Read on arXiv <ExternalLink size={15} aria-hidden="true" />
                  </a>
                </article>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default Papers;
