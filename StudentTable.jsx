import React from 'react';

export default function StudentTable({ students, onEdit, onDelete }) {
  return (
    <table style={{
      width: '100%',
      borderCollapse: 'collapse',
      background: '#f7f9fa',
      borderRadius: 12,
      boxShadow: '0 2px 8px #cfdef3',
      marginBottom: 24,
      overflow: 'hidden'
    }}>
      <thead>
        <tr style={{ background: 'linear-gradient(90deg, #6a82fb 0%, #fc5c7d 100%)', color: '#fff' }}>
          <th style={{ padding: 12, fontWeight: 700, fontSize: '1.1rem', letterSpacing: '0.5px' }}>Name</th>
          <th style={{ padding: 12, fontWeight: 700, fontSize: '1.1rem', letterSpacing: '0.5px' }}>Email</th>
          <th style={{ padding: 12, fontWeight: 700, fontSize: '1.1rem', letterSpacing: '0.5px' }}>Age</th>
          <th style={{ padding: 12, fontWeight: 700, fontSize: '1.1rem', letterSpacing: '0.5px' }}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {students.length === 0 ? (
          <tr>
            <td colSpan={4} style={{ textAlign: 'center', padding: 24, color: '#6a82fb', fontWeight: 600 }}>No students found.</td>
          </tr>
        ) : (
          students.map(student => (
            <tr key={student.id} style={{ background: '#fff', borderBottom: '1px solid #e0eafc' }}>
              <td style={{ padding: 12 }}>{student.name}</td>
              <td style={{ padding: 12 }}>{student.email}</td>
              <td style={{ padding: 12 }}>{student.age}</td>
              <td style={{ padding: 12 }}>
                <button
                  onClick={() => onEdit(student)}
                  style={{
                    marginRight: 8,
                    padding: '6px 16px',
                    background: '#6a82fb',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 6,
                    fontWeight: 600,
                    cursor: 'pointer',
                    boxShadow: '0 1px 4px #cfdef3',
                    transition: 'background 0.3s'
                  }}
                >Edit</button>
                <button
                  onClick={() => onDelete(student.id)}
                  style={{
                    padding: '6px 16px',
                    background: '#fc5c7d',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 6,
                    fontWeight: 600,
                    cursor: 'pointer',
                    boxShadow: '0 1px 4px #cfdef3',
                    transition: 'background 0.3s'
                  }}
                >Delete</button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}