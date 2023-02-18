-- note: these commands were done using the browser of ElephantSQL 
-- since they do not have a cmd tool like heroku or fly

-- creating blogs table
CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    author text,
    url text NOT NULL,
    title text NOT NULL,
    likes int DEFAULT 0
);

-- inserting entries into the table
insert into blogs (author, url, title) values ('Jorma Tikka', 'https://www.google.com/', 'tikan pelikenttä');
insert into blogs (author, url, title) values ('Kalle Nalle', 'https://www.google.com/', 'horroksen kauhu');