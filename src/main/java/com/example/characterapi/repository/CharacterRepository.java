package com.example.characterapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.characterapi.entity.TvCharacter;

// Repository for accessing and managing character data in the database
public interface CharacterRepository extends JpaRepository<TvCharacter, Long> {

}