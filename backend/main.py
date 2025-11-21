from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.api.v1.endpoints import chart, payment, report, auth, chat, daily

app = FastAPI(title="Mystic Insights API", version="1.0.0")

# CORS Configuration
origins = [
    "http://localhost:3000",
    "https://your-vercel-deployment-url.vercel.app",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(chart.router, prefix="/api/v1/chart", tags=["chart"])
app.include_router(payment.router, prefix="/api/v1/payment", tags=["payment"])
app.include_router(report.router, prefix="/api/v1/report", tags=["report"])
app.include_router(auth.router, prefix="/api/v1/auth", tags=["auth"])
app.include_router(chat.router, prefix="/api/v1/chat", tags=["chat"])
app.include_router(daily.router, prefix="/api/v1/daily", tags=["daily"])

@app.get("/api/health")
def health_check():
    return {"status": "ok", "message": "Mystic Insights API is running"}
