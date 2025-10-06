import React, { useEffect, useState } from 'react';
import { getRooms, deleteRoom } from '../services/roomService';
import RoomForm from './RoomForm';

function RoomList() {
    const [rooms, setRooms] = useState([]);
    const [editRoom, setEditRoom] = useState(null);

    const loadRooms = () => {
        getRooms()
            .then(response => setRooms(response.data))
            .catch(error => console.error(error));
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this room?')) {
            deleteRoom(id).then(loadRooms);
        }
    };

    useEffect(() => {
        loadRooms();
    }, []);

    return (
        <div>
            <h2>Room List</h2>
            <RoomForm
                onRoomUpdated={loadRooms}
                editRoom={editRoom}
                onClearEdit={() => setEditRoom(null)}
            />
            <ul>
                {rooms.map((room) => (
                    <li key={room.id}>
                        Room {room.roomNumber} – Capacity: {room.capacity}
                        &nbsp;
                        <button onClick={() => setEditRoom(room)}>Edit</button>
                        <button onClick={() => handleDelete(room.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default RoomList;
