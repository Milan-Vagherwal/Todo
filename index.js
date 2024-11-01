const express = require("express");
const { UserModel, TodoModel } = require("./db");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const JWT_SECRET = "Harkirat123"; // Consider using environment variables
mongoose.connect("mongodb+srv://mickyrathormv:Name%40123@cluster0.5bo2u.mongodb.net/todo-milan");

const app = express();
app.use(express.json());

app.post("/signup", async function(req, res) {
    const { email, password, name } = req.body;

    await UserModel.create({ email, password, name });
    res.json({ message: "You are signed in" });
});

app.post("/signin", async function(req, res) {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email, password });
    if (user) {
        const token = jwt.sign({ id: user._id }, JWT_SECRET);
        res.json({ token });
    } else {
        res.status(403).json({ message: "Incorrect Credentials" });
    }
});

app.post("/todo", auth, function(req, res) {
    const userId = req.userId;
    res.json({ userId });
});

app.get("/todos", auth, function(req, res) {
    const userId = req.userId;
    res.json({ userId });
});

function auth(req, res, next) {
    const token = req.headers.token;
    try {
        const decodeData = jwt.verify(token, JWT_SECRET);
        if (decodeData) {
            req.userId = decodeData.id;
            next();  // Proceed to the next middleware or route
        }
    } catch (error) {
        res.status(403).json({ message: "Invalid credentials" });
    }
}

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
