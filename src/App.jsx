import { useState } from 'react'
import StudentForm from './components/StudentForm'
import StudentTable from './components/StudentTable'
import writeXlsxFile from 'write-excel-file/browser'

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

  const downloadExcel = async () => {
    const schema = [
      { column: 'Name',  type: String, value: (s) => s.name  },
      { column: 'Email', type: String, value: (s) => s.email },
      { column: 'Age',   type: Number, value: (s) => s.age   },
    ]
    await writeXlsxFile(students, { schema, fileName: 'students.xlsx' })
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
