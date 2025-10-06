import React, { useEffect, useState } from 'react';
import { addRoom, updateRoom } from '../services/roomService';

function RoomForm({ onRoomUpdated, editRoom, onClearEdit }) {
    const [roomNumber, setRoomNumber] = useState('');
    const [capacity, setCapacity] = useState('');

    useEffect(() => {
        if (editRoom) {
            setRoomNumber(editRoom.roomNumber);
            setCapacity(editRoom.capacity);
        } else {
            setRoomNumber('');
            setCapacity('');
        }
    }, [editRoom]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const room = {
            roomNumber,
            capacity: parseInt(capacity)
        };

        try {
            if (editRoom) {
                await updateRoom(editRoom.id, room);
            } else {
                await addRoom(room);
            }

            setRoomNumber('');
            setCapacity('');
            onRoomUpdated();
            onClearEdit();
        } catch (error) {
            console.error('Error saving room:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3>{editRoom ? 'Edit Room' : 'Add Room'}</h3>
            <input
                type="text"
                placeholder="Room Number"
                value={roomNumber}
                onChange={(e) => setRoomNumber(e.target.value)}
                required
            />
            <br />
            <input
                type="number"
                placeholder="Capacity"
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
                required
            />
            <br />
            <button type="submit">{editRoom ? 'Update' : 'Add'} Room</button>
            {editRoom && <button type="button" onClick={onClearEdit}>Cancel</button>}
        </form>
    );
}

export default RoomForm;
