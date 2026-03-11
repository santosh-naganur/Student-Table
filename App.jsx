import React, { useState } from 'react';
import StudentTable from './StudentTable';
import StudentForm from './StudentForm';
import DownloadExcel from './DownloadExcel';

const initialStudents = [
  { id: 1, name: 'Alice', email: 'alice@example.com', age: 20 },
  { id: 2, name: 'Bob', email: 'bob@example.com', age: 22 },
];

export default function App() {
  const [students, setStudents] = useState(initialStudents);
  const [loading, setLoading] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const handleAdd = () => {
    setEditingStudent(null);
    setShowForm(true);
  };

  const handleEdit = (student) => {
    setEditingStudent(student);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      setLoading(true);
      setTimeout(() => {
        setStudents(students.filter(s => s.id !== id));
        setLoading(false);
      }, 800);
    }
  };

  const handleSave = (student) => {
    setLoading(true);
    setTimeout(() => {
      if (student.id) {
        setStudents(students.map(s => s.id === student.id ? student : s));
      } else {
        const newId = students.length ? Math.max(...students.map(s => s.id)) + 1 : 1;
        setStudents([...students, { ...student, id: newId }]);
      }
      setShowForm(false);
      setLoading(false);
    }, 800);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Segoe UI, Arial, sans-serif',
      padding: '40px 0'
    }}>
      <div style={{
        background: '#fff',
        borderRadius: 16,
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.2)',
        padding: '32px 40px',
        maxWidth: 800,
        width: '100%',
        margin: '24px 0',
        textAlign: 'center'
      }}>
        <h2 style={{
          color: '#2d3a4b',
          fontWeight: 700,
          fontSize: '2.2rem',
          marginBottom: 24,
          letterSpacing: '1px',
          textShadow: '0 2px 8px #cfdef3'
        }}>Students Table</h2>
        <button
          onClick={handleAdd}
          style={{
            marginBottom: 24,
            padding: '10px 24px',
            background: 'linear-gradient(90deg, #6a82fb 0%, #fc5c7d 100%)',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            fontWeight: 600,
            fontSize: '1rem',
            boxShadow: '0 2px 8px #cfdef3',
            cursor: 'pointer',
            transition: 'background 0.3s'
          }}
        >Add Student</button>
        {loading && <div style={{ color: '#6a82fb', fontWeight: 600, marginBottom: 16 }}>Loading...</div>}
        <StudentTable
          students={students}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
        <DownloadExcel students={students} />
        {showForm && (
          <StudentForm
            student={editingStudent}
            onSave={handleSave}
            onCancel={() => setShowForm(false)}
          />
        )}
      </div>
    </div>
  );
}
