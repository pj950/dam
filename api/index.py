from backend.main import app

# Vercel requires a handler function, but for FastAPI with @vercel/python, 
# exposing the 'app' object is usually sufficient if using the right pattern.
# However, the standard Vercel Python runtime looks for 'app' or 'handler'.
