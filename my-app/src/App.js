import React, { useState } from 'react';
import { TextField, Button, Select, MenuItem, Checkbox, ListItemText, FormControl, InputLabel, OutlinedInput } from '@mui/material';
import axios from 'axios';

const App = () => {
  const [jsonInput, setJsonInput] = useState('');
  const [jsonError, setJsonError] = useState(null);
  const [responseData, setResponseData] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  // Handle JSON input change
  const handleJsonChange = (e) => {
    setJsonInput(e.target.value);
    setJsonError(null);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const parsedJson = JSON.parse(jsonInput);
      
      // Call the REST API
      const response = await axios.post('https://bajaj-project-backend.onrender.com/bfhl', { data: parsedJson.data });
      setResponseData(response.data);
      setSelectedOptions([]);
    } catch (error) {
      setJsonError('Invalid JSON format. Please correct your input.');
    }
  };

  // Handle dropdown change
  const handleDropdownChange = (event) => {
    const value = event.target.value;
    setSelectedOptions(value);
  };

  // Render response based on selected options
  const renderResponse = () => {
    if (!responseData) return null;

    const { alphabets, numbers, highest_lowercase_alphabet } = responseData;

    return (
      <div>
        {selectedOptions.includes('Alphabets') && (
          <div><strong>Alphabets:</strong> {alphabets.join(', ')}</div>
        )}
        {selectedOptions.includes('Numbers') && (
          <div><strong>Numbers:</strong> {numbers.join(', ')}</div>
        )}
        {selectedOptions.includes('Highest lowercase alphabet') && (
          <div><strong>Highest Lowercase Alphabet:</strong> {highest_lowercase_alphabet.join(', ')}</div>
        )}
      </div>
    );
  };

  return (
    <div style={{ padding: '20px', maxWidth: '500px', margin: '0 auto' }}>
      <h2>API Input</h2>
      <form onSubmit={handleSubmit}>
        <TextField
          value={jsonInput}
          onChange={handleJsonChange}
          placeholder='{"data":["M","1","334","4","B"]}'
          multiline
          rows={4}
          fullWidth
          error={!!jsonError}
          helperText={jsonError}
          variant="outlined"
        />
        <Button type="submit" variant="contained" color="primary" style={{ marginTop: '10px', width: '100%' }}>
          Submit
        </Button>
      </form>

      {responseData && (
        <div style={{ marginTop: '20px' }}>
          <h3>Multi Filter</h3>
          <FormControl fullWidth variant="outlined">
            <InputLabel>Filter</InputLabel>
            <Select
              multiple
              value={selectedOptions}
              onChange={handleDropdownChange}
              input={<OutlinedInput label="Filter" />}
              renderValue={(selected) => selected.join(', ')}
            >
              <MenuItem value="Alphabets">
                <Checkbox checked={selectedOptions.indexOf('Alphabets') > -1} />
                <ListItemText primary="Alphabets" />
              </MenuItem>
              <MenuItem value="Numbers">
                <Checkbox checked={selectedOptions.indexOf('Numbers') > -1} />
                <ListItemText primary="Numbers" />
              </MenuItem>
              <MenuItem value="Highest lowercase alphabet">
                <Checkbox checked={selectedOptions.indexOf('Highest lowercase alphabet') > -1} />
                <ListItemText primary="Highest lowercase alphabet" />
              </MenuItem>
            </Select>
          </FormControl>
        </div>
      )}

      <div style={{ marginTop: '20px' }}>
        <h3>Filtered Response</h3>
        {renderResponse()}
      </div>
    </div>
  );
};

export default App;
