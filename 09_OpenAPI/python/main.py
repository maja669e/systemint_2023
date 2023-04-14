from fastapi import FastAPI

app =  FastAPI()

from routers import spacecraft_router
app.include_router(spacecraft_router)

from routers import user_router
app.include_router(user_router)