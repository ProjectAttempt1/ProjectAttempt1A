from fastapi import FastAPI
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

#allows for us to kinda use the post request in tandem with the webpage 
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_methods=["*"],
    allow_headers=["*"]
)

stored_items = []

@app.get("/")
def root():
    return {"message": "API is running on Render!"}

@app.get("/ping")
def ping():
    return {"status": "pong"}

@app.get("/error")
def error_test():
    return JSONResponse(status_code=400, content={"error": "Test error"})