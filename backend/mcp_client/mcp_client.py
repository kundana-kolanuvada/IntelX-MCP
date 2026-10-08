import os
import sys
from contextlib import AsyncExitStack

from mcp import ClientSession, StdioServerParameters
from mcp.client.stdio import stdio_client


class ArxivMCPClient:
    def __init__(self):
        self.session = None
        self.exit_stack = AsyncExitStack()

    async def connect(self):
        server_path = os.path.join(
            os.path.dirname(__file__),
            "arxiv_server.py"
        )

        server_params = StdioServerParameters(
            command=sys.executable,
            args=[server_path],
        )

        stdio_transport = await self.exit_stack.enter_async_context(
            stdio_client(server_params)
        )

        self.stdio, self.write = stdio_transport

        self.session = await self.exit_stack.enter_async_context(
            ClientSession(self.stdio, self.write)
        )

        await self.session.initialize()

    async def search_papers(self, query: str, max_results: int = 5):
        if self.session is None:
            await self.connect()

        result = await self.session.call_tool(
            "search_papers",
            {
                "query": query,
                "max_results": max_results
            }
        )

        if result.isError:
            raise RuntimeError("ArXiv MCP server returned an error")

        if not result.content:
            raise RuntimeError("ArXiv MCP server returned no content")

        import json

        data = json.loads(result.content[0].text)

        return data

    async def close(self):
        await self.exit_stack.aclose()