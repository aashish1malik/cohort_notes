const express = require('express');
const jwt = require('jsonwebtoken');
const path = require('path');

const app = express();
app.use(express.json());

const JWT_SECRET = "iamaashish";

// In-memory user & todo store
let users = []; // { username, password }
let todos = []; // { id, title, description, done, username }

// Auth Middleware
function auth(req, res, next) {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Token missing. Please sign in." });
    }
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.username = decoded.username;
        next();
    } catch (err) {
        res.status(403).json({ message: "Invalid or expired token." });
    }
}

// ---------------- AUTH ROUTES ----------------
app.post('/signup', (req, res) => {
    const { username, password } = req.body;
    const existing = users.find(u => u.username === username);
    if (existing) {
        return res.status(400).json({ message: "User already exists." });
    }
    users.push({ username, password });
    res.json({ message: "Signup successful." });
});

app.post('/signin', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);
    if (!user) {
        return res.status(403).json({ message: "Invalid username or password." });
    }
    const token = jwt.sign({ username }, JWT_SECRET);
    res.json({ token });
});

// ---------------- TODO ROUTES ----------------
app.get('/todos', auth, (req, res) => {
    const userTodos = todos.filter(t => t.username === req.username);
    res.json(userTodos);
});

app.post('/todos', auth, (req, res) => {
    const { title, description } = req.body;
    const newTodo = {
        id: Date.now(),
        title,
        description,
        done: false,
        username: req.username
    };
    todos.push(newTodo);
    res.json({ message: "Todo created", todo: newTodo });
});

app.put('/todos/:id', auth, (req, res) => {
    const todo = todos.find(t => t.id == req.params.id && t.username === req.username);
    if (!todo) {
        return res.status(404).json({ message: "Todo not found." });
    }
    const { title, description } = req.body;
    if (title) todo.title = title;
    if (description) todo.description = description;
    res.json({ message: "Todo updated", todo });
});

app.put('/todos/:id/done', auth, (req, res) => {
    const todo = todos.find(t => t.id == req.params.id && t.username === req.username);
    if (!todo) {
        return res.status(404).json({ message: "Todo not found." });
    }
    todo.done = true;
    res.json({ message: "Todo marked as done", todo });
});

app.delete('/todos/:id', auth, (req, res) => {
    const index = todos.findIndex(t => t.id == req.params.id && t.username === req.username);
    if (index === -1) {
        return res.status(404).json({ message: "Todo not found." });
    }
    todos.splice(index, 1);
    res.json({ message: "Todo deleted." });
});

app.get('/',function(req,res){
    res.sendFile(path.join(__dirname,'public', 'indexass.html'))
})

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
