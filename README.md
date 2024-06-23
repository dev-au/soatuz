# Soat UZ News Publisher in Django and Django Rest Framework

Sample Frontend Page > https://github.com/dev-au/soatuz/tree/frontend

## Feature URLs

1. *news/all-categories* - Get all news category
2. *news/<'int:id'>* - Get full article information
3. *news/rec/<'int:id'>* - Get recommendation news, this is filter with tags
4. *news/search/<'str:query'>* - Search news in article title text
5. *news/search/tag:<'str:query>'* - Filter news with tag
6. *news?count=<'int:id'>&category=all* - Get news for main page
7. *news?count=<'int:id'>&category=<'str:slug_name'>* - Get news for main page with category filter

## Amenities

1. *Easy controlling with django admin panel*
2. *Easy url request endpoints and drf simple responses*
3. *Detecting user interests depending on read news with tag name*

## Example with Simple Frontend

![Frontend Example](https://i.ibb.co/JB6JyqS/IMG-20240623-210218.jpg)

## Mobile Example

![Mobile Example](https://i.ibb.co/pvR8qf9/IMG-20240623-210619.jpg)
