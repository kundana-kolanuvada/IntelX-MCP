from contextlib import asynccontextmanager
from typing import List

from fastapi import FastAPI, Query, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from mcp_client.mcp_client import ArxivMCPClient


class Paper(BaseModel):
    id: str
    title: str
    authors: List[str]
    abstract: str
    published: str
    url: str


class SearchResponse(BaseModel):
    query: str
    papers: List[Paper]


mcp_client = ArxivMCPClient()


@asynccontextmanager
async def lifespan(app: FastAPI):
    await mcp_client.connect()
    yield
    await mcp_client.close()


app = FastAPI(
    title="IntelX API",
    description="Backend API for IntelX Research Assistant",
    version="1.0.0",
    lifespan=lifespan
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {
        "message": "IntelX Backend is running"
    }


@app.get("/api/search", response_model=SearchResponse)
async def search_papers(
    q: str = Query(
        ...,
        min_length=2,
        max_length=200,
        description="Research paper search query"
    )
):
    q = q.strip()

    if not q:
        raise HTTPException(
            status_code=400,
            detail="Search query cannot be empty"
        )

    try:
        result = await mcp_client.search_papers(
            query=q,
            max_results=5
        )

        return result

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"MCP search failed: {str(e)}"
        )