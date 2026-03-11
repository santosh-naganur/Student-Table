import React, { useState, useEffect } from 'react';

function validateEmail(email) {
  return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
}

export default function StudentForm({ student, onSave, onCancel }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (student) {
      setName(student.name);
      setEmail(student.email);
      setAge(student.age);
    } else {
      setName('');
      setEmail('');
      setAge('');
    }
  }, [student]);

  const validate = () => {
    const errs = {};
    if (!name.trim()) errs.name = 'Name is required.';
    if (!email.trim()) errs.email = 'Email is required.';
    else if (!validateEmail(email)) errs.email = 'Invalid email format.';
    if (!age || isNaN(age)) errs.age = 'Valid age is required.';
    return errs;
  };

  const handleSubmit = e => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    onSave({ id: student?.id, name, email, age: Number(age) });
  };

  return (
    <div style={{
      marginTop: 32,
      padding: '24px 32px',
      borderRadius: 12,
      background: '#f7f9fa',
      boxShadow: '0 2px 8px #cfdef3',
      maxWidth: 480,
      marginLeft: 'auto',
      marginRight: 'auto',
      textAlign: 'left'
    }}>
      <h3 style={{
        color: '#2d3a4b',
        fontWeight: 700,
        fontSize: '1.4rem',
        marginBottom: 20,
        letterSpacing: '0.5px',
        textAlign: 'center'
      }}>{student ? 'Edit Student' : 'Add Student'}</h3>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 18 }}>
          <label style={{ fontWeight: 600, color: '#6a82fb' }}>Name:</label><br />
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: 6,
              border: '1px solid #cfdef3',
              fontSize: '1rem',
              marginTop: 4
            }}
          />
          {errors.name && <div style={{ color: '#fc5c7d', fontWeight: 600, marginTop: 4 }}>{errors.name}</div>}
        </div>
        <div style={{ marginBottom: 18 }}>
          <label style={{ fontWeight: 600, color: '#6a82fb' }}>Email:</label><br />
          <input
            value={email}
            onChange={e => setEmail(e.target.value)}
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: 6,
              border: '1px solid #cfdef3',
              fontSize: '1rem',
              marginTop: 4
            }}
          />
          {errors.email && <div style={{ color: '#fc5c7d', fontWeight: 600, marginTop: 4 }}>{errors.email}</div>}
        </div>
        <div style={{ marginBottom: 18 }}>
          <label style={{ fontWeight: 600, color: '#6a82fb' }}>Age:</label><br />
          <input
            value={age}
            onChange={e => setAge(e.target.value)}
            type="number"
            min="1"
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: 6,
              border: '1px solid #cfdef3',
              fontSize: '1rem',
              marginTop: 4
            }}
          />
          {errors.age && <div style={{ color: '#fc5c7d', fontWeight: 600, marginTop: 4 }}>{errors.age}</div>}
        </div>
        <div style={{ textAlign: 'center', marginTop: 24 }}>
          <button
            type="submit"
            style={{
              marginRight: 12,
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
          >{student ? 'Update' : 'Add'}</button>
          <button
            type="button"
            onClick={onCancel}
            style={{
              padding: '10px 24px',
              background: '#e0eafc',
              color: '#2d3a4b',
              border: 'none',
              borderRadius: 8,
              fontWeight: 600,
              fontSize: '1rem',
              boxShadow: '0 2px 8px #cfdef3',
              cursor: 'pointer',
              transition: 'background 0.3s'
            }}
          >Cancel</button>
        </div>
      </form>
    </div>
  );
}