import serverURI from "./config.js";

export async function fetchAvailablePlaces() {
    const response = await fetch(serverURI + '/places');
    if (!response.ok)
        throw new Error('Failed to fetch places data');

    return await response.json();
}

export async function fetchUserPlaces() {
    const response = await fetch(serverURI + '/user-places');
    if (!response.ok)
        throw new Error('Failed to fetch user places data');

    return await response.json();
}

export async function updateUserPlaces(places) {
    const response = await fetch(serverURI + '/user-places', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({places})
    });

    if (!response.ok)
        throw new Error('Failed to update user places');

    const responseJSON = await response.json();

    return responseJSON.message
}