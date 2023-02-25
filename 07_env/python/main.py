from dotenv import load_dotenv, dotenv_values
import os

#Example 1
dotenv_values = dotenv_values()
print(dotenv_values.get("MY_SECRET"))


#Example 3
load_dotenv()
print(os.getenv("MY_SECRET"))