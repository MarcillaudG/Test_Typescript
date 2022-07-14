# Node.js with TypeScript

[SUBJECT.md for the instructions](./SUBJECT.md)

## Summary

This was a pleasant experience, not gonna lie a little stressful and tiring. However, except the frontend part, this was really interesting.
I hope I did well.

## Comments

I hardly use comments, wrongly used they add noise and make the code less readable. I usually prefer using 
understable names for everything and keep functions shorts. However, when I can't shorten a function I add some 
comments. 

## Architecture

I followed the MVC model and used many folders. Some have only one file in it but it is not a problem when you think that the application
may grow and evolve. 

## WARNING

Don't forget to create a .env file with :

- TOKEN_SIZE="SIZE"
    - TOKEN_SIZE="10"

- TOKEN_GITHUB="TOKEN"

- DB_CONN_STRING="mongodb:uri:port
    - DB_CONN_STRING="mongodb://localhost:27017/"

- DB_NAME="Database Name"

- USER_COLLECTION_NAME="users"
