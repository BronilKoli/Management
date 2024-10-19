import React, { useState } from 'react';
import * as XLSX from 'xlsx'; // Import the xlsx library

const Defaulterlist = () => {
    const [defaulters, setDefaulters] = useState([]);
    const [name, setName] = useState('');
    const [reason, setReason] = useState('');
    const [lastAction, setLastAction] = useState('');

    const handleAddDefaulter = (e) => {
        e.preventDefault();
        if (name && reason && lastAction) {
            const newDefaulter = {
                id: defaulters.length + 1, // Simple ID generation
                name,
                reason,
                lastAction,
            };
            setDefaulters([...defaulters, newDefaulter]);
            setName('');
            setReason('');
            setLastAction('');
        }
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const data = new Uint8Array(event.target.result);
                const workbook = XLSX.read(data, { type: 'array' });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const jsonData = XLSX.utils.sheet_to_json(worksheet);

                const defaulterList = jsonData.map((item, index) => ({
                    id: index + 1,
                    name: item['Name'],           // Ensure your Excel column matches
                    reason: item['Reason'],       // Ensure your Excel column matches
                    lastAction: item['Date'],     // Ensure your Excel column matches
                }));

                setDefaulters(defaulterList);
            };
            reader.readAsArrayBuffer(file);
        }
    };

    return (
        <div className="defaulter-list-container">
            <h1>Student Defaulter List</h1>
            <p>This page displays a list of students who are currently in default.</p>

            <input 
                type="file" 
                accept=".xlsx, .xls" 
                onChange={handleFileUpload} 
                className="file-upload" 
            />

            <form onSubmit={handleAddDefaulter} className="defaulter-form">
                <input
                    type="text"
                    placeholder="Student Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="input-field"
                />
                <input
                    type="text"
                    placeholder="Reason for Default"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    required
                    className="input-field"
                />
                <input
                    type="date"
                    placeholder="Last Action Date"
                    value={lastAction}
                    onChange={(e) => setLastAction(e.target.value)}
                    required
                    className="input-field"
                />
                <button type="submit" className="submit-button">Add Defaulter</button>
            </form>

            {defaulters.length > 0 ? (
                <table className="defaulter-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Reason for Default</th>
                            <th>Last Action Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {defaulters.map((defaulter) => (
                            <tr key={defaulter.id}>
                                <td>{defaulter.id}</td>
                                <td>{defaulter.name}</td>
                                <td>{defaulter.reason}</td>
                                <td>{defaulter.lastAction}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No student defaulters found.</p>
            )}

            <style>{`
                .defaulter-list-container {
                    max-width: 900px;
                    margin: 30px auto;
                    padding: 30px;
                    border: 2px solid #4CAF50;
                    border-radius: 12px;
                    background-color: #f2f9f2;
                    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                    font-family: Arial, sans-serif;
                }

                h1 {
                    text-align: center;
                    color: #4CAF50;
                    font-size: 2.5em;
                }

                p {
                    text-align: center;
                    color: #555;
                    font-size: 1.2em;
                    margin-bottom: 20px;
                }

                .file-upload {
                    margin-bottom: 20px;
                    padding: 10px;
                    border: 2px dashed #4CAF50;
                    border-radius: 5px;
                    background-color: #e8f5e9;
                    width: 100%;
                    cursor: pointer;
                }

                .defaulter-form {
                    display: flex;
                    flex-direction: column;
                    gap: 15px;
                    margin-bottom: 20px;
                }

                .input-field {
                    padding: 12px;
                    border: 1px solid #ccc;
                    border-radius: 4px;
                    font-size: 16px;
                    transition: border 0.3s;
                }

                .input-field:focus {
                    border-color: #4CAF50;
                    outline: none;
                }

                .submit-button {
                    padding: 12px;
                    background-color: #4CAF50;
                    color: white;
                    border: none;
                    border-radius: 4px;
                    font-size: 18px;
                    cursor: pointer;
                    transition: background-color 0.3s;
                }

                .submit-button:hover {
                    background-color: #45a049;
                }

                .defaulter-table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-top: 20px;
                }

                .defaulter-table th, .defaulter-table td {
                    padding: 12px;
                    border: 1px solid #ddd;
                    text-align: left;
                    transition: background-color 0.3s;
                }

                .defaulter-table th {
                    background-color: #4CAF50;
                    color: white;
                }

                .defaulter-table tr:hover {
                    background-color: #f1f1f1;
                }

                .defaulter-table th:first-child,
                .defaulter-table td:first-child {
                    width: 50px; /* Adjust ID column width */
                }
            `}</style>
        </div>
    );
};

export default Defaulterlist;
