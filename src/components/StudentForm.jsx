import React, { useEffect, useState } from 'react';
import { addStudent, updateStudent } from '../services/studentService';
import { getRooms } from '../services/roomService';

function StudentForm({ onStudentAdded, editStudent, onClearEdit }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [roomId, setRoomId] = useState('');
    const [rooms, setRooms] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        getRooms()
            .then((response) => setRooms(response.data))
            .catch((error) => console.error('Error loading rooms:', error));
    }, []);

    useEffect(() => {
        if (editStudent) {
            setName(editStudent.name);
            setEmail(editStudent.email);
            setRoomId(editStudent.room?.id || '');
        } else {
            setName('');
            setEmail('');
            setRoomId('');
        }
        setError('');
    }, [editStudent]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        const student = {
            name,
            email,
            room: roomId ? { id: roomId } : null,
        };

        try {
            if (editStudent) {
                await updateStudent(editStudent.id, student);
            } else {
                await addStudent(student);
            }

            setName('');
            setEmail('');
            setRoomId('');
            onStudentAdded();
            onClearEdit();
        } catch (err) {
            if (err.response && typeof err.response.data === 'string') {
                setError(err.response.data); // e.g., "Room is already full"
            } else {
                setError('Something went wrong.');
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3>{editStudent ? 'Edit Student' : 'Add Student'}</h3>
            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <br />
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <br />
            <select value={roomId} onChange={(e) => setRoomId(e.target.value)}>
                <option value="">-- Select Room --</option>
                {rooms.map((room) => (
                    <option key={room.id} value={room.id}>
                        Room {room.roomNumber} (Capacity: {room.capacity})
                    </option>
                ))}
            </select>
            <br />
            <button type="submit">{editStudent ? 'Update' : 'Add'} Student</button>
            {editStudent && (
                <button type="button" onClick={onClearEdit}>
                    Cancel
                </button>
            )}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
    );
}

export default StudentForm;
