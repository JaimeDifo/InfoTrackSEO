import React, { useState, useEffect } from 'react';
import axios from 'axios';

function History() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('https://localhost:7288/api/viewseo')
      .then((response) => {
        setData(response.data);
      })//Fetch data
      .catch((error) => {
        setError(error.message);
      });
  }, []);

  const handleDelete = (id) => {
    axios.delete(`https://localhost:7288/api/deleteseo/${id}`)
      .then((response) => {
        // Update the data array by removing the deleted record
        setData(data.filter((item) => item.Id !== id));
      })
      .catch((error) => {
        console.error('Error deleting record:', error);
      });
  };

  return (
    <div>
      {error && <div>Error: {error}</div>}
      <table className="table table-striped">
        <thead>
          <tr>
            {/* ... Table headers ... */}
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.Id}>
              {/* ... Table cells ... */}
              <td>
                <button onClick={() => handleDelete(item.Id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default History;
