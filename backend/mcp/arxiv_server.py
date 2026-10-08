import arxiv
from mcp.server.fastmcp import FastMCP

mcp = FastMCP("arxiv-search")


@mcp.tool()
def search_papers(query: str, max_results: int = 5) -> dict:
    """Search ArXiv papers and return normalized paper metadata."""

    if not query.strip():
        return {
            "query": query,
            "papers": []
        }

    max_results = max(1, min(max_results, 20))

    client = arxiv.Client(
        page_size=max_results,
        num_retries=2,
        delay_seconds=3
    )

    search = arxiv.Search(
        query=query,
        max_results=max_results,
        sort_by=arxiv.SortCriterion.Relevance
    )

    papers = []

    for result in client.results(search):
        papers.append({
            "id": result.entry_id,
            "title": result.title,
            "authors": [author.name for author in result.authors],
            "abstract": result.summary,
            "published": result.published.isoformat(),
            "url": result.entry_id
        })

    return {
        "query": query,
        "papers": papers
    }


if __name__ == "__main__":
    mcp.run()