import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './Components/Edit.css'; 


function Edit() {
  const { id } = useParams(); // Get the ID from the URL parameter

  const [formData, setFormData] = useState({
    searchTerm: '',
    searchEngine: '', 
    url: '',
    page: '',
  });

  useEffect(() => {
    // Fetch the item's current data from the server and populate the form
    axios.get(`https://localhost:7288/api/idseo/${id}`)
      .then(response => {
        console.log('API Response:', response.data);
        const apiData = response.data[0]; 
        if (apiData) {
          setFormData(apiData);
        } else {
          console.error('No data received from the API');
        }
      })
      .catch(error => {
        console.error('API Error:', error);
      });
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.put(`https://localhost:7288/api/updateseo/${id}`, formData)
    .then(() => {
      console.log('Data successfully updated');
    })
    .catch(error => {
      console.error('Error updating record:', error);
    });
  };

  return (
    <div className="form-container"> 
      <div >
      <h1 className="main-title3">Edit SEO Item</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-field">
            <label className='label-font2'>
              Search Term:
              <input
                type="text"
                name="searchTerm"
                value={formData.searchTerm}
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div className="form-field">
            <label className='label-font2'>
              Search Engine:
              <select
                name="searchEngine"
                value={formData.searchEngine}
                onChange={handleInputChange}
              >
                <option value="">Select a search engine</option>
                <option value="Google">Google</option>
                <option value="Bing">Bing</option>
                <option value="Yahoo">Yahoo</option>
                <option value="DuckDuckGo">DuckDuckGo</option>
                <option value="Other">Other</option>
              </select>
            </label>
          </div>
          <div className="form-field">
            <label className='label-font2'>
              URL:
              <input
                type="text"
                name="url"
                value={formData.url}
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div className="form-field">
            <label className='label-font2'>
              Page:
              <input
                type="text"
                name="page"
                value={formData.page}
                onChange={handleInputChange}
              />
            </label>
          </div>
          <button className="button-5" type="submit">Save</button>
        </form>
      </div>
    </div>
  );
}

export default Edit;
