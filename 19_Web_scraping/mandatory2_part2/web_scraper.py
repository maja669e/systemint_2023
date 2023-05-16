import requests
from bs4 import BeautifulSoup
from pprint import pprint
import sqlite3

html = requests.get("https://www.imdb.com/search/title/?groups=top_100",headers={"Accept-Language": "en-US"}).text
parsed_html = BeautifulSoup(html, "lxml")

movie_names = parsed_html.find_all("h3", {"class": "lister-item-header"})

movies = []

for movie in movie_names:
    title = movie.find("a").text
    year = movie.find("span", {"class": "lister-item-year text-muted unbold"}).text.strip('()')
   # movies[title] = year
    movies.append((title, year))
   

connection = sqlite3.connect('movies.db')

cursor = connection.cursor()

cursor.execute("CREATE TABLE IF NOT EXISTS movies (title TEXT, year TEXT)")

cursor.executemany("INSERT INTO movies VALUES (?, ?)", movies)

connection.commit()
connection.close()

pprint(movies)

