"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const sqlite3_1 = __importDefault(require("sqlite3"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = 3000;
const db = new sqlite3_1.default.Database('./blogs.db');
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Initialize SQLite Database and create blogs table if it doesn't exist
db.serialize(() => {
    db.run(`
      CREATE TABLE IF NOT EXISTS blogs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        content TEXT NOT NULL,
        tags TEXT NOT NULL,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
});
app.get('/', (req, res) => {
    res.send('DevBlogify API is running!');
});
app.get('/blogs', (req, res) => {
    db.all("SELECT * FROM blogs", (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});
app.get('/blogs/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM blogs WHERE id = ?';
    db.get(sql, [id], (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!row) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        res.json(row);
    });
});
app.post('/blogs', (req, res) => {
    const { title, content, tags } = req.body;
    if (!title || !content || !tags) {
        res.status(400).json({ message: 'Title, content, and tags are required.' });
        return;
    }
    const sql = 'INSERT INTO blogs (title, content, tags) VALUES (?, ?, ?)';
    db.run(sql, [title, content, tags], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.status(201).json({
            id: this.lastID,
            title,
            content,
            tags,
        });
    });
});
app.put('/blogs/:id', (req, res) => {
    const { id } = req.params;
    const { title, content, tags } = req.body;
    if (!title || !content || !tags) {
        res.status(400).json({ message: 'Title, content, and tags are required.' });
        return;
    }
    const sql = 'UPDATE blogs SET title = ?, content = ?, tags = ? WHERE id = ?';
    db.run(sql, [title, content, tags, id], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (this.changes === 0) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        res.json({ id, title, content, tags });
    });
});
app.delete('/blogs/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM blogs WHERE id = ?';
    db.run(sql, [id], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (this.changes === 0) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        res.status(204).send();
    });
});
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
