const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
const subscribers = [];

app.post('/api/subscribe', (req, res) => {
    const { email } = req.body;

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(400).json({ success: false, message: 'Invalid email address' });
    }

    if (subscribers.includes(email)) {
        return res.status(400).json({ success: false, message: 'Email already subscribed' });
    }

    subscribers.push(email);
    console.log('New subscriber:', email);

    res.json({ success: true, message: 'Subscription successful' });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});