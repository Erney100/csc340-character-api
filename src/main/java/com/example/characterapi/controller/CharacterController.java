package com.example.characterapi.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import jakarta.validation.Valid;

import com.example.characterapi.entity.TvCharacter;
import com.example.characterapi.service.CharacterService;
import java.util.List;

@RestController
@RequestMapping ("/api/characters")

public class CharacterController {

    private final CharacterService characterService;

    public CharacterController(CharacterService characterService) {
        this.characterService = characterService;
    }

    @GetMapping 
    public List<TvCharacter> getAllCharacters() {
        return characterService.getAllCharacters();
    }

    @GetMapping("/{id}")
    public ResponseEntity<TvCharacter> getCharacterById(@PathVariable Long id) {
        return characterService.getCharacterById(id)
        .map(ResponseEntity::ok)
        .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping 
    public ResponseEntity<TvCharacter> createCharacter(@Valid @RequestBody TvCharacter character) {
        TvCharacter savedCharacter = characterService.saveCharacter(character);

        return ResponseEntity.status(HttpStatus.CREATED).body(savedCharacter);
    }

    @PutMapping("/{id}")
    public ResponseEntity<TvCharacter> updateCharacter(@PathVariable Long id, @Valid @RequestBody TvCharacter updatedCharacter) {

        return characterService.getCharacterById(id)
        .map(existingCharacter -> {
            
            existingCharacter.setName(updatedCharacter.getName());
            existingCharacter.setDescription(updatedCharacter.getDescription());
            existingCharacter.setUniverse(updatedCharacter.getUniverse());
            existingCharacter.setRole(updatedCharacter.getRole());
            existingCharacter.setSpecies(updatedCharacter.getSpecies());

            TvCharacter savedCharacter = characterService.saveCharacter(existingCharacter);

            return ResponseEntity.ok(savedCharacter);
        })
    .orElse(ResponseEntity.notFound().build());
    }
    
    @DeleteMapping("/{id}")
public ResponseEntity<Void> deleteCharacter(@PathVariable Long id) {
    return characterService.getCharacterById(id)
            .map(character -> {
                characterService.deleteCharacter(id);
                return ResponseEntity.noContent().<Void>build();
            })
            .orElse(ResponseEntity.notFound().build());
}

}
