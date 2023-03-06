import React, { useState } from 'react';

function AddRecordForm(props) {
  const [record, setRecord] = useState({ date: '', weight: '', file: null });

  const handleChange = (event) => {
    const { name, value, type } = event.target;
    if (type === 'file') {
      setRecord({ ...record, [name]: event.target.files[0] });
    } else {
      setRecord({ ...record, [name]: value });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('date', record.date);
    formData.append('weight', record.weight);
    formData.append('file', record.file);
    props.onAddRecord(formData);
    setRecord({ date: '', weight: '', file: null });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="add-w">
      <input type="date" name="date" placeholder="Date" value={record.date} onChange={handleChange} />
      <input type="number" name="weight" placeholder="Weight" value={record.weight} onChange={handleChange} />
      <input type="file" name="file" onChange={handleChange} />
      <button type="submit">Add</button>
      </div>
    </form>
  );
}

export default AddRecordForm;