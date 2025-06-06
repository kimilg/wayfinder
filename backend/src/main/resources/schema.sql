CREATE TABLE html_document (
    id SERIAL PRIMARY KEY,
    title TEXT,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);