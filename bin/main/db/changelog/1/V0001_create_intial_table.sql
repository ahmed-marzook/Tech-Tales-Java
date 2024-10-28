--liquibase formatted SQL

--changeset ahmedM:V0001
--comment: creating a user table

-- Authors table
CREATE TABLE author (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    bio TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Articles table
CREATE TABLE article (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    publishing_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    author_id INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_author
        FOREIGN KEY (author_id)
        REFERENCES author(id)
        ON DELETE SET NULL
);

-- Indexes
CREATE INDEX idx_articles_publishing_date ON article(publishing_date);
CREATE INDEX idx_articles_author_id ON article(author_id);
CREATE INDEX idx_authors_last_name ON author(last_name);

/* liquibase rollback
rollback DROP INDEX IF EXISTS idx_article_publishing_date;
rollback DROP INDEX IF EXISTS idx_article_author_id;
rollback DROP INDEX IF EXISTS idx_author_last_name;
rollback DROP TABLE IF EXISTS article;
rollback DROP TABLE IF EXISTS author;
*/