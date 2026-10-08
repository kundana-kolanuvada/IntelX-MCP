from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="IntelX API",
    description="Backend API for IntelX Research Assistant",
    version="1.0.0"
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


@app.get("/api/search")
def search_papers(q: str):
    return {
        "query": q,
        "papers": []
    }