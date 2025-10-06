package com.dorm.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.dorm.backend.entity.Student;

public interface StudentRepository extends JpaRepository<Student, Long> {
	long countByRoomId(Long roomId);
}
