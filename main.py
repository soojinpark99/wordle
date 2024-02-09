from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.staticfiles import StaticFiles

#uvicorn main:app --reload
#or uvicorn main:app --reload --port 8001

app = FastAPI()

# --- wordle 정답을 보내주는 api ---
answer = 'APPLE'

@app.get('/answer')
def get_answer():
    return {'answer' : answer} 

app.mount("/", StaticFiles(directory="static", html=True), name="static")