const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

// POST endpoint to process data
app.post('/bfhl', (req, res) => {
    const data = req.body.data || [];
    const user_id = "john_doe_17091999";  // Example user_id
    const email = "john@xyz.com";
    const roll_number = "ABCD123";

    const numbers = data.filter(item => !isNaN(item));
    const alphabets = data.filter(item => /^[A-Za-z]+$/.test(item));
    const lowercaseAlphabets = alphabets.filter(c => c === c.toLowerCase());
    const highestLowercaseAlphabet = [lowercaseAlphabets.sort().pop() || ""];

    const response = {
        is_success: true,
        user_id: user_id,
        email: email,
        roll_number: roll_number,
        numbers: numbers,
        alphabets: alphabets,
        highest_lowercase_alphabet: highestLowercaseAlphabet
    };

    res.status(200).json(response);
});

// GET endpoint to return operation code
app.get('/bfhl', (req, res) => {
    const response = {
        operation_code: 1
    };

    res.status(200).json(response);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
