function StudentTable({ students, onDelete, onDownload }) {
  return (
    <div className="table-section">
      <div className="table-header">
        <h2>Students ({students.length})</h2>
        <button
          className="btn-download"
          onClick={onDownload}
          disabled={students.length === 0}
          title="Download as Excel"
        >
          ⬇ Download Excel
        </button>
      </div>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Age</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {students.length === 0 ? (
              <tr>
                <td colSpan="5">
                  <div className="empty-state">No students added yet. Use the form above to add one.</div>
                </td>
              </tr>
            ) : (
              students.map((student, index) => (
                <tr key={student.id}>
                  <td>{index + 1}</td>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td>{student.age}</td>
                  <td>
                    <button
                      className="btn-delete"
                      onClick={() => onDelete(student.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default StudentTable
