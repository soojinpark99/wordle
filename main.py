from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.staticfiles import StaticFiles

app = FastAPI()

# --- wordle 정답을 보내주는 api ---
answer = 'APPLE'

@app.get('/answer')
def get_answer():
    return {'answer' : answer} 

app.mount("/", StaticFiles(directory="static", html=True), name="static")


# --- 강의 내용 정리 ---

# 백엔드에 정보를 보내는 방법
# 1. path parameter: 어떤 리소스를 식별하고 싶을 때  /user/123 -> id가 123인 user
# 2. query parameter: 정렬이나 필터링을 하고 싶을 때 /user?age=20 -> 나이가 20살인 users
# 3. request body: 

class Item(BaseModel):
    id:int
    content:str
    # 미리 포맷을 정해줌

items = ['맥북','애플워치','아이폰','에어팟']

@app.get('/items')
    #get 요청: 어떤 값을 조회할 때 
def read_items():
    return  items

# 1번 방법
@app.get('/items/{id}')
def read_id_item(id):
    return items[int(id)]
# id를 문자열에서 숫자로 바꿈

# 2번 방법
@app.get('/items')
def read_item(skip:int=0, limit:int=10):
    # skip이라는 쿼리를 줌 # 초기값은 0, 최대 10개까지 뽑음
    return items[skip:skip+limit]
    # 서버 요청: items?skip=1&limit=2 -> 1개를 스킵하고 2개를 뽑음

# 3번 방법
@app.post('/items')
    # post 요청: 값을 서버에 업데이트할 때
def post_item(item:Item):
    items.append(item.content)
    #items에 content를 추가함
    return "성공했습니다!" 