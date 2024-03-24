const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./models/User');

const app = express();
const port = 8000;

const connectDB = (url) => {
    mongoose.connect(url);
    console.log('connected successfully🟩')
}

app.use(express.json());
app.use(cors());
app.post('/users/signup', async (req, res) => {
    const { username, email, password } = req.body;

    const user = new User({
        username,
        email,
        password
    });

    const exisingUser = await User.findOne({ email: email });
    if (exisingUser) {
        return res.status(400).send('User already exists');
    }

    try {
        const newUser = await User.create(user);
        res.status(201).send('User created successfully');
    } catch (err) {
        res.status(400).send('Failed to create user');
    }
});

app.post('/users/login', async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username: username, password: password }).select('username email');

    if (!user) {
        return res.status(400).send('Invalid credentials');
    }

    res.status(200).send('User logged in successfully');
}
);


const start = async (url) => {
    try {
        connectDB(url)
        app.listen(port, () => {
            console.log('Server running on port 8000🚀');
        });
    } catch (err) {
        console.log(err);
    }
};

start('mongodb+srv://datta_21:Datta0321@cluster0.pjoxudy.mongodb.net/acm?retryWrites=true&w=majority');

// http://localhost:8000/signup