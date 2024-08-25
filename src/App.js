import React, { useState } from 'react';
import './App.css';


function App() {
    const [input, setInput] = useState('');
    const [response, setResponse] = useState({});
    const [selectedFilters, setSelectedFilters] = useState([]);

    const handleSubmit = async () => {
        if (!input.trim()) return alert("Input cannot be empty!");
        
        try {
            const parsedInput = JSON.parse(input);
            const res = await fetch('/bfhl', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(parsedInput)
            });
            const data = await res.json();
            setResponse(data);
        } catch (err) {
            alert("Invalid JSON format");
        }
    };

    const handleFilterChange = (e) => {
        const value = Array.from(e.target.selectedOptions, option => option.value);
        setSelectedFilters(value);
    };

    const filteredResponse = selectedFilters.reduce((acc, filter) => {
        acc[filter] = response[filter];
        return acc;
    }, {});

    return (
        <div>
            <h1>JSON Processor</h1>
            <input 
                type="text" 
                placeholder='Enter JSON here' 
                value={input} 
                onChange={(e) => setInput(e.target.value)} 
            />
            <button onClick={handleSubmit}>Submit</button>

            {response.is_success && (
                <>
                    <select multiple onChange={handleFilterChange}>
                        <option value="numbers">Numbers</option>
                        <option value="alphabets">Alphabets</option>
                        <option value="highest_lowercase_alphabet">Highest Lowercase Alphabet</option>
                    </select>

                    <pre>{JSON.stringify(filteredResponse, null, 2)}</pre>
                </>
            )}
        </div>
    );
}

export default App;
