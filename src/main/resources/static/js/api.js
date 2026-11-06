
const BASE_URL = "/api/characters";

async function request(url, options = {}) {
    const response = await fetch(url, options);

    if (!response.ok) {
        const error = new Error(
            response.status === 404
                ? "Character not found"
                : `Request failed (${response.status})`
        );
        error.status = response.status;
        throw error;
    }

    if (response.status === 204) return null;
    return response.json();
}

export function getCharacters() {
    return request(BASE_URL);
}

export function getCharacter(id) {
    return request(`${BASE_URL}/${encodeURIComponent(id)}`);
}

export function addCharacter(character) {
    return request(BASE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(character)
    });
}

export function updateCharacter(id, character) {
    return request(`${BASE_URL}/${encodeURIComponent(id)}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(character)
    });
}

export function deleteCharacter(id) {
    return request(`${BASE_URL}/${encodeURIComponent(id)}`, {
        method: "DELETE"
    });
}
