
import { getCharacter, deleteCharacter } from "./api.js";

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const status = document.getElementById("status");
const card = document.getElementById("detailsCard");

async function loadDetails() {
    if (!id) {
        status.textContent = "Character not found.";
        return;
    }

    try {
        const character = await getCharacter(id);

        document.getElementById("characterName").textContent =
            character.name;

        document.getElementById("characterDescription").textContent =
            character.description;

        document.getElementById("characterUniverse").textContent =
            character.universe || "Unknown";

        document.getElementById("characterSpecies").textContent =
            character.species || "Unknown";

        document.getElementById("characterRole").textContent =
            character.role || "Unknown";

        const image = document.getElementById("characterImage");
        image.src = character.imageUrl || "/images/placeholder.png";
        image.alt = character.name;
        image.onerror = () => {
            image.onerror = null;
            image.src = "/images/placeholder.png";
        };

        document.getElementById("editButton").href =
            `/edit.html?id=${id}`;

        document.getElementById("deleteButton")
            .addEventListener("click", async () => {

                if (!confirm(`Delete ${character.name}?`)) {
                    return;
                }

                try {
                    await deleteCharacter(id);

                    window.location.href =
                        `/?message=${encodeURIComponent(character.name + " was removed")}`;

                } catch (error) {
                    status.textContent = "Unable to delete character.";
                }
            });

        status.textContent = "";
        card.hidden = false;

        const message = params.get("message");
        if (message) {
            document.getElementById("message").textContent = message;
            window.history.replaceState({}, "", `/details.html?id=${encodeURIComponent(id)}`);
        }

    } catch (error) {
        status.textContent = error.message === "Character not found"
            ? "Character not found."
            : "Unable to load character.";
    }
}

loadDetails();
