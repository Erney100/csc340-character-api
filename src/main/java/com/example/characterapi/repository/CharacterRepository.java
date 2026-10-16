package com.example.characterapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.characterapi.entity.TvCharacter;
import java.util.List;

// Repository for accessing and managing character data in the database
public interface CharacterRepository extends JpaRepository<TvCharacter, Long> {

    List<TvCharacter> findByUniverseIgnoreCase(String universe);

    List<TvCharacter> findByNameContainingIgnoreCase(String name);
}