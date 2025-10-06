import React from 'react';
import StudentList from './components/StudentList';
import RoomList from './components/RoomList';

function App() {
    return (
        <div>
            <h1>Dorm Management System</h1>
            <StudentList />
            <hr />
            <RoomList />
        </div>
    );
}

export default App;
