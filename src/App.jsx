import { useState } from 'react'
import StudentForm from './components/StudentForm'
import StudentTable from './components/StudentTable'
import * as XLSX from 'xlsx'

const initialStudents = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com', age: 21 },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com', age: 22 },
]

function App() {
  const [students, setStudents] = useState(initialStudents)
  const [nextId, setNextId] = useState(3)

  const addStudent = (student) => {
    setStudents((prev) => [...prev, { ...student, id: nextId }])
    setNextId((id) => id + 1)
  }

  const deleteStudent = (id) => {
    setStudents((prev) => prev.filter((s) => s.id !== id))
  }

  const downloadExcel = () => {
    const data = students.map(({ name, email, age }) => ({ Name: name, Email: email, Age: age }))
    const worksheet = XLSX.utils.json_to_sheet(data)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Students')
    XLSX.writeFile(workbook, 'students.xlsx')
  }

  return (
    <div className="app-container">
      <h1>Student Table</h1>
      <StudentForm onAdd={addStudent} />
      <StudentTable
        students={students}
        onDelete={deleteStudent}
        onDownload={downloadExcel}
      />
    </div>
  )
}

export default App
