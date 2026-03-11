import { useState } from 'react'

const emptyForm = { name: '', email: '', age: '' }

function StudentForm({ onAdd }) {
  const [form, setForm] = useState(emptyForm)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setError('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const { name, email, age } = form

    if (!name.trim() || !email.trim() || !age) {
      setError('All fields are required.')
      return
    }

    const ageNum = Number(age)
    if (!Number.isInteger(ageNum) || ageNum < 1 || ageNum > 120) {
      setError('Age must be a whole number between 1 and 120.')
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError('Please enter a valid email address.')
      return
    }

    onAdd({ name: name.trim(), email: email.trim(), age: ageNum })
    setForm(emptyForm)
    setError('')
  }

  return (
    <div className="student-form">
      <h2>Add Student</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Full name"
              value={form.name}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="text"
              placeholder="Email address"
              value={form.email}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="age">Age</label>
            <input
              id="age"
              name="age"
              type="number"
              placeholder="Age"
              min="1"
              max="120"
              step="1"
              value={form.age}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="btn-add">
            Add Student
          </button>
        </div>
        {error && <p className="error-msg">{error}</p>}
      </form>
    </div>
  )
}

export default StudentForm
