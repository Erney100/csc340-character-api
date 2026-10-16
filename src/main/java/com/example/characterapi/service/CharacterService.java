package com.example.characterapi.service;

import org.springframework.stereotype.Service;

import com.example.characterapi.entity.TvCharacter;
import com.example.characterapi.repository.CharacterRepository;

import java.util.List;
import java.util.Optional;

// Handles operations for managing characters
@Service 
public class CharacterService {

    private final CharacterRepository characterRepository;
    
    
    public CharacterService(CharacterRepository characterRepository) {
        this.characterRepository = characterRepository;
    }

    public List<TvCharacter> getAllCharacters() {
        return characterRepository.findAll();
    }

    public Optional <TvCharacter> getCharacterById(Long id) {
        return characterRepository.findById(id);
    }

    public TvCharacter saveCharacter (TvCharacter character) {
        return characterRepository.save(character);
    }

    public void deleteCharacter(long id) {
        characterRepository.deleteById(id);
    }

   public List<TvCharacter> getCharactersByUniverse(String universe) {
    return characterRepository.findByUniverseIgnoreCase(universe);
   }

   public List<TvCharacter> searchCharactersByName(String name) {
    return characterRepository.findByNameContainingIgnoreCase(name);
}
}
