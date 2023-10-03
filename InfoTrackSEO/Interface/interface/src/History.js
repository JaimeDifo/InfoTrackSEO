import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Components/History.css'; 

export default function History() {
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
                setData(data.filter(item => item.Id !== id));
            })
            .catch(error => {
                console.error('Error deleting record:', error);
            });
    };

    return (
        <div className="form-container-history">
            <h1 className="main-title3">History</h1>
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
                    {data.map(item => (
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
                                <button className="btn btn-light btn-outline-primary" onClick={() => handleDelete(item.Id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
