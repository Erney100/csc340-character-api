
import { getCharacters } from "./api.js";

const gallery = document.getElementById("gallery");
const status = document.getElementById("status");
const nameInput = document.getElementById("searchName");
const universeInput = document.getElementById("searchUniverse");

let characters = [];

function createCard(character) {
    const card = document.createElement("div");
    card.className = "card";

    const image = document.createElement("img");
    image.src = character.imageUrl || "/images/placeholder.png";
    image.alt = character.name || "Character image";

    image.onerror = () => {
        image.onerror = null;
        image.src = "/images/placeholder.png";
    };

    const title = document.createElement("h3");
    title.textContent = character.name;

    const universe = document.createElement("p");
    universe.textContent = `Universe: ${character.universe || "Unknown"}`;

    const role = document.createElement("p");
    role.textContent = `Role: ${character.role || "Unknown"}`;

    const description = document.createElement("p");
    const fullDescription = character.description || "";
    description.textContent =
        fullDescription.length > 100
            ? fullDescription.slice(0, 100) + "..."
            : fullDescription;

    const link = document.createElement("a");
    link.className = "view-button";
    link.href = `/details.html?id=${character.characterId}`;
    link.textContent = "View More";

    card.append(image, title, universe, role, description, link);

    return card;
}

function displayCharacters() {
    gallery.replaceChildren();

    const name = nameInput.value.trim().toLowerCase();
    const universe = universeInput.value.trim().toLowerCase();

    const filtered = characters.filter(character => {
        const matchesName = (character.name || "")
            .toLowerCase().includes(name);

        const matchesUniverse = (character.universe || "")
            .toLowerCase().includes(universe);

        return matchesName && matchesUniverse;
    });

    if (filtered.length === 0) {
        status.textContent = "No characters found.";
        return;
    }

    status.textContent = "";

    filtered.forEach(character => {
        gallery.appendChild(createCard(character));
    });
}

async function loadGallery() {
    status.textContent = "Loading characters...";

    try {
        characters = await getCharacters();
        displayCharacters();
    } catch (error) {
        status.textContent =
            "Unable to load characters. Please try again.";
    }
}

document.getElementById("searchButton")
    .addEventListener("click", displayCharacters);

nameInput.addEventListener("input", displayCharacters);
universeInput.addEventListener("input", displayCharacters);

const params = new URLSearchParams(window.location.search);
const message = params.get("message");

if (message) {
    document.getElementById("successMessage").textContent = message;
    window.history.replaceState({}, "", "/");
}

loadGallery();
