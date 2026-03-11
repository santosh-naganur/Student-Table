import React from 'react';

function exportToExcel(students) {
  const header = ['Name', 'Email', 'Age'];
  const rows = students.map(s => [s.name, s.email, s.age]);
  const csv = [header, ...rows].map(row => row.join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'students.csv';
  a.click();
  URL.revokeObjectURL(url);
}

export default function DownloadExcel({ students }) {
  return (
    <button
      onClick={() => exportToExcel(students)}
      style={{
        marginTop: 24,
        padding: '10px 24px',
        background: 'linear-gradient(90deg, #11998e 0%, #38ef7d 100%)',
        color: '#fff',
        border: 'none',
        borderRadius: 8,
        fontWeight: 600,
        fontSize: '1rem',
        boxShadow: '0 2px 8px #cfdef3',
        cursor: 'pointer',
        transition: 'background 0.3s'
      }}
    >
      Download Excel
    </button>
  );
}
