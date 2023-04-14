from fastapi import APIRouter, Query
from typing import Union
from pydantic import BaseModel


router = APIRouter()


users = [
    {"id": 1, "name": "Maja"},
    {"id": 2, "name": "Ozzy"},
]

@router.get("/users/{users_id}")
def get_user(user_id: int):
    for user in users: 
        if user["id"] == user_id:
            return user
