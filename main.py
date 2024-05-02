from fastapi import FastAPI

app = FastAPI()

@app.get("/")
async def root():
    return [
    {
        "instanceId": 1,
        "speedOfAnswer": 20,
        "handleTime": 60,
        "abandoned": False
    },
    {
        "instanceId": 2,
        "speedOfAnswer": 300,
        "handleTime": 120,
        "abandoned": False
    },
    {
        "instanceId": 3,
        "speedOfAnswer": 2,
        "handleTime": 0,
        "abandoned": True
    },
    {
        "instanceId": 4,
        "speedOfAnswer": 50,
        "handleTime": 100,
        "abandoned": False
    },
    {
        "instanceId": 5,
        "speedOfAnswer": 120,
        "handleTime": 600,
        "abandoned": False
    }
    ]