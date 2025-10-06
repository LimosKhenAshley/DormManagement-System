package com.dorm.backend.controller;

import com.dorm.backend.entity.Room;
import com.dorm.backend.repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/rooms")
public class RoomController {

    @Autowired
    private RoomRepository roomRepository;

    @GetMapping
    public List<Room> getAllRooms() {
        return roomRepository.findAll();
    }

    @PostMapping
    public Room createRoom(@RequestBody Room room) {
        return roomRepository.save(room);
    }
    
    @PutMapping("/{id}")
    public Room updateRoom(@PathVariable Long id, @RequestBody Room updatedRoom) {
        return roomRepository.findById(id).map(room -> {
            room.setRoomNumber(updatedRoom.getRoomNumber());
            room.setCapacity(updatedRoom.getCapacity());
            return roomRepository.save(room);
        }).orElseThrow(() -> new RuntimeException("Room not found"));
    }

    @DeleteMapping("/{id}")
    public void deleteRoom(@PathVariable Long id) {
        roomRepository.deleteById(id);
    }

}
