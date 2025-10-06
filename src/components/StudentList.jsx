import React, { useEffect, useState } from 'react';
import {
    getStudents,
    deleteStudent,
} from '../services/studentService';
import StudentForm from './StudentForm';

function StudentList() {
    const [students, setStudents] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(null);

    const loadStudents = () => {
        getStudents()
            .then((response) => setStudents(response.data))
            .catch((error) => console.error('Error loading students:', error));
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this student?')) {
            deleteStudent(id).then(loadStudents);
        }
    };

    useEffect(() => {
        loadStudents();
    }, []);

    return (
        <div>
            <h2>Student List</h2>
            <StudentForm
                onStudentAdded={loadStudents}
                editStudent={selectedStudent}
                onClearEdit={() => setSelectedStudent(null)}
            />
            <ul>
                {students.map((student) => (
                    <li key={student.id}>
                        {student.name} – {student.email}
                        {student.room && ` (Room ${student.room.roomNumber})`}
                        &nbsp;
                        <button onClick={() => setSelectedStudent(student)}>Edit</button>
                        <button onClick={() => handleDelete(student.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default StudentList;
