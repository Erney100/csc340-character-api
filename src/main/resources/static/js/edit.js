
import { getCharacter, updateCharacter } from "./api.js";

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const form = document.getElementById("editForm");
const message = document.getElementById("formMessage");
const saveButton = document.getElementById("saveButton");

async function loadCharacter() {
    if (!id) {
        message.textContent = "No character selected.";
        return;
    }

    try {
        const character = await getCharacter(id);

        document.getElementById("name").value =
            character.name || "";

        document.getElementById("universe").value =
            character.universe || "";

        document.getElementById("role").value =
            character.role || "";

        document.getElementById("species").value =
            character.species || "";

        document.getElementById("image").value =
            character.imageUrl || "";

        document.getElementById("description").value =
            character.description || "";

        message.textContent = "";
        form.hidden = false;

    } catch (error) {
        message.textContent =
            error.status === 404
                ? "Character not found."
                : "Unable to load character.";
    }
}

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const updatedCharacter = {
        name: document.getElementById("name").value.trim(),
        universe: document.getElementById("universe").value.trim(),
        role: document.getElementById("role").value.trim(),
        species: document.getElementById("species").value.trim(),
        imageUrl: document.getElementById("image").value.trim(),
        description: document.getElementById("description").value.trim()
    };

    saveButton.disabled = true;
    message.textContent = "Saving changes...";

    try {
        await updateCharacter(id, updatedCharacter);

        const query = new URLSearchParams({
            id: id,
            message: "Character updated successfully!"
        });

        window.location.href = `/details.html?${query}`;

    } catch (error) {
        message.textContent =
            "Unable to save changes. Please try again.";
    } finally {
        saveButton.disabled = false;
    }
});

loadCharacter();
