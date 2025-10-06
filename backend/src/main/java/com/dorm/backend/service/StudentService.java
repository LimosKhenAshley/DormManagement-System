package com.dorm.backend.service;

import com.dorm.backend.entity.Room;
import com.dorm.backend.entity.Student;
import com.dorm.backend.repository.RoomRepository;
import com.dorm.backend.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentService {

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private RoomRepository roomRepository;

    public Student saveStudent(Student student) {
        if (student.getRoom() != null) {
            Room room = roomRepository.findById(student.getRoom().getId())
                    .orElseThrow(() -> new RuntimeException("Room not found"));

            long studentCount = studentRepository.countByRoomId(room.getId());
            if (studentCount >= room.getCapacity()) {
                throw new RuntimeException("Room is already full.");
            }
        }

        return studentRepository.save(student);
    }

    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }
}
