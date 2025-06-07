DROP TABLE IF EXISTS html_document_emotion_tag;
DROP TABLE IF EXISTS html_document;
DROP TABLE IF EXISTS emotion_tag;

CREATE TABLE html_document (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE emotion_tag (
    id SERIAL PRIMARY KEY,
    name TEXT UNIQUE NOT NULL
);

CREATE TABLE html_document_emotion_tag (
    html_document_id INTEGER REFERENCES html_document(id) ON DELETE CASCADE,
    emotion_tag_id INTEGER REFERENCES emotion_tag(id) ON DELETE CASCADE,
    PRIMARY KEY (html_document_id, emotion_tag_id)
)

