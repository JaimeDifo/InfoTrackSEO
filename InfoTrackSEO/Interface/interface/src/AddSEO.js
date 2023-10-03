import React, { useState } from 'react';
import axios from 'axios';
import './Components/App.css';

function AddSEO() {
  const currentDateTime = new Date().toISOString();

  const [formData, setFormData] = useState({
    searchTerm: '',
    searchEngine: '',
    url: '',
    page: '',
    dateSearched: currentDateTime,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('https://localhost:7288/api/createseo', formData) //Create record to the database through the API
      .then((response) => {
        console.log('Data successfully sent:', response.data);
        setFormData({
          searchTerm: '',
          searchEngine: '',
          url: '',
          page: '',
          dateSearched: currentDateTime,
        });
      })
      .catch((error) => {
        console.error('Error sending data:', error);
      });
  };

  const searchEngines = [
    'Google',
    'Bing',
    'Yahoo',
    'DuckDuckGo',
    'Other',
  ];

  return ( //Between is the form for user to enter information to be POSTED
    <div className="form-container"> 
      <h1 className="main-title3">Adding New SEO record</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className='label-font' htmlFor="searchTerm">Search Term:</label>
          <input
            type="text"
            className="form-control"
            id="searchTerm"
            name="searchTerm"
            value={formData.searchTerm}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label className='label-font' htmlFor="searchEngine">Search Engine:</label>
          <select
            className="form-control"
            id="searchEngine"
            name="searchEngine"
            value={formData.searchEngine}
            onChange={handleInputChange}
          >
            <option value="Search Engine">Select a search engine</option>
            {searchEngines.map((engine) => (
              <option key={engine} value={engine}>
                {engine}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label className='label-font' htmlFor="url">URL:</label>
          <input
            type="text"
            className="form-control"
            id="url"
            name="url"
            value={formData.url}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label className='label-font' htmlFor="page">Page:</label>
          <input
            type="text"
            className="form-control"
            id="page"
            name="page"
            value={formData.page}
            onChange={handleInputChange}
          />
        </div>
        <button className="button-4" type="submit" >Submit</button>
      </form>
    </div>
  );
}

export default AddSEO;
