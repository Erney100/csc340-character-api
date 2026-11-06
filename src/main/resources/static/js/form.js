
import { addCharacter } from "./api.js";

const form = document.getElementById("characterForm");
const message = document.getElementById("formMessage");
const submitButton = document.getElementById("submitButton");

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const character = {
        name: document.getElementById("name").value.trim(),
        universe: document.getElementById("universe").value.trim(),
        role: document.getElementById("role").value.trim(),
        species: document.getElementById("species").value.trim(),
        imageUrl: document.getElementById("image").value.trim(),
        description: document.getElementById("description").value.trim()
    };

    if (Object.values(character).some(value => !value)) {
        message.textContent = "Please complete all fields.";
        return;
    }

    submitButton.disabled = true;
    message.textContent = "Adding character...";

    try {
        const savedCharacter = await addCharacter(character);

        message.textContent =
            `${savedCharacter.name} was added successfully!`;

        form.reset();

        // Open the newly created character's details page.
        const params = new URLSearchParams({
            id: savedCharacter.characterId,
            message: `${savedCharacter.name} was added successfully!`
        });

        window.location.href = `/details.html?${params.toString()}`;

    } catch (error) {
        message.textContent =
            "Unable to add character. Please try again.";
    } finally {
        submitButton.disabled = false;
    }
});
