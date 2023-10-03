import axios from 'axios';
import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import './Components/Search.css'; 

export default function Search() {
    const [searchQuery, setSearchQuery] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get("https://localhost:7288/api/viewseo")
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    const handleDelete = (id) => {
        axios.delete(`https://localhost:7288/api/deleteseo/${id}`)
            .then(() => {
                setSearchResults(data.filter(item => item.Id !== id));
            })
            .catch(error => {
                console.error('Error deleting record:', error);
            });
    };

    const handleSearch = async () => {
        try {
            const response = await axios.get(`https://localhost:7288/api/searchseo/${searchQuery}`);
            const filteredResults = response.data.filter(item => {
                const dateSearched = new Date(item.DateSearched).getTime();
                const startDateTimestamp = startDate ? new Date(startDate).getTime() : 0;
                const endDateTimestamp = endDate ? new Date(endDate).getTime() : Number.MAX_SAFE_INTEGER;
                return dateSearched >= startDateTimestamp && dateSearched <= endDateTimestamp;
            });
            setSearchResults(filteredResults);
        } catch (error) {
            console.error('Error performing search:', error);
        }
    };

    return (
        <div className="form-container-search">
            <h1 className="main-title2-search">Search</h1>
            <input 
                type="text"
                placeholder="Enter your search term"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <input
                type="date"
                placeholder="Start Date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
            />
            <input
                type="date"
                placeholder="End Date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
            />
            <button className="button-5-search" onClick={handleSearch}>Search</button>
            <div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>
                                Id
                            </th>
                            <th>
                                SearchTerm
                            </th>
                            <th>
                                SearchEngine
                            </th>
                            <th>
                                Url
                            </th>
                            <th>
                                Page
                            </th>
                            <th>
                                DateSearched
                            </th>
                            <th>
                                Options
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {searchResults.map(item => (
                            <tr key={item.Id}>
                                <td>{item.Id}</td>
                                <td>{item.SearchTerm}</td>
                                <td>{item.SearchEngine}</td>
                                <td>{item.Url}</td>
                                <td>{item.Page}</td>
                                <td>{item.DateSearched}</td>
                                <td>
                                    <Link to={`/Edit/${item.Id}`}>
                                        <button className="btn btn-light btn-outline-primary">Edit</button>
                                    </Link>
                                    <button className="btn btn-light btn-outline-primary"onClick={() => handleDelete(item.Id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
