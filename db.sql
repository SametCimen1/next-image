CREATE DATABASE nextimage;

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(50),
    name VARCHAR(255) NOT NULL,
    profile_image_url VARCHAR(500)
);

CREATE TABLE image_urls(
    id SERIAL PRIMARY KEY,
    user_id integer REFERENCES users(id),
    image_url TEXT NOT NULL,
    user_email VARCHAR(255) REFERENCES users(email) NOT NULL
);