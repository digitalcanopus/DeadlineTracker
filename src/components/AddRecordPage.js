/*import React, { useState } from 'react';
import axios from 'axios';

function AddRecordPage() {
  const [date, setDate] = useState('');
  const [weight, setWeight] = useState('');
  const [file, setFile] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append('date', date);
      formData.append('weight', weight);
      formData.append('file', file);

      const response = await axios.post('/api/weights', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log(response.data);
      alert('Record added successfully');
    } catch (error) {
      console.error(error);
      alert('Error adding record');
    }
  };

  return (
    <div>
      <h1>Add Record</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="date">Date:</label>
          <input type="date" id="date" value={date} onChange={(event) => setDate(event.target.value)} required />
        </div>
        <div>
          <label htmlFor="weight">Weight:</label>
          <input type="number" step="0.01" id="weight" value={weight} onChange={(event) => setWeight(event.target.value)} required />
        </div>
        <div>
          <label htmlFor="file">File:</label>
          <input type="file" id="file" onChange={(event) => setFile(event.target.files[0])} />
        </div>
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default AddRecordPage;*/

import React, { useState } from 'react';
import AddRecordForm from './AddRecordForm';

function AddRecordPage(props) {
  const { onAddRecord } = props;
  const [isSuccess, setIsSuccess] = useState(false);

  const handleAddRecord = record => {
    onAddRecord(record);
    setIsSuccess(true);
  };

  const handleResetSuccess = () => {
    setIsSuccess(false);
  };

  return (
    <div>
      {isSuccess ? (
        <div>
          <p>New record added successfully!</p>
          <button onClick={handleResetSuccess}>Add another record</button>
        </div>
      ) : (
        <AddRecordForm onAddRecord={handleAddRecord} />
      )}
    </div>
  );
}

export default AddRecordPage;