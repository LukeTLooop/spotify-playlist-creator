
const clientId = "df687c298e0945258721568e3ef40ffc";
const params = new URLSearchParams(window.location.search);
const code = params.get("code");

if (!code) {
    redirectToAuthCodeFlow(clientId);
} else {
    const accessToken = await getAccessToken(clientId, code);
    // store token in cache
    localStorage.setItem("access_token", accessToken);

    // const profile = await fetchProfile(accessToken);
    //populateUI(profile);
}

export async function getToken() {
    if (!code) {
        redirectToAuthCodeFlow(clientId);
    } else {
        const accessToken = await getAccessToken(clientId, code);
        // store token in cache
        localStorage.setItem("access_token", accessToken);
        return accessToken;
    }
}

export async function redirectToAuthCodeFlow(clientId: string) {
    const verifier = generateCodeVerifier(128);
    const challenge = await generateCodeChallenge(verifier);

    localStorage.setItem("verifier", verifier);

    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("response_type", "code");
    params.append("redirect_uri", "http://localhost:5173/callback");
    params.append("scope", "user-read-private user-read-email");
    params.append("code_challenge_method", "S256");
    params.append("code_challenge", challenge);
    params.append(
        "scope",
        "user-read-private user-read-email playlist-modify-private playlist-modify-public"
      );

    document.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
}

function generateCodeVerifier(length: number) {
    let text = "";
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

async function generateCodeChallenge(codeVerifier: string) {
    const data = new TextEncoder().encode(codeVerifier);
    const digest = await window.crypto.subtle.digest("SHA-256", data);
    return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/, "");
}

async function getAccessToken(clientId: string, code: string): Promise<string> {
    const verifier = localStorage.getItem("verifier");

    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("grant_type", "authorization_code");
    params.append("code", code);
    params.append("redirect_uri", "http://localhost:5173/callback");
    params.append("code_verifier", verifier!);

    const result = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    });

    const { access_token } = await result.json();
    return access_token;
}

export async function searchTracks(accessToken: string, query: string) {
    // blank query returns empty list
    if (!query) return [];

    const url = `https://api.spotify.com/v1/search?type=track&q=${encodeURIComponent(query)}`;

    const response = await fetch(url, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json"
        }
    });

    // log error if response is invalid
    if (!response.ok) {
        console.error("Spotify search error", await response.text());
        return [];
    }

    const data = await response.json();
    // return tracks or empty array
    return data.tracks?.items ?? [];
}

export async function createPlaylist(accessToken: string, name: string): Promise<Playlist> {
    const userData = await fetchProfile(accessToken);

    const url = `https://api.spotify.com/v1/users/${userData.id}/playlists`;

    const response = await fetch(url, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: name,
            description: "New Playlist created via API",
            public: false,
        })
    });

    const playlistData = await response.json();
    return playlistData;
}

export async function addTracksToPlaylist(accessToken: string, playlistId: string, tracks: Track[]) {
    try {
        const url = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;

        const trackUris = tracks.map((track) => `spotify:track:${track.id}`);

        const response = await fetch(url, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                uris: trackUris
            })
        });

        if (!response.ok) {
            throw new Error("Failed to add tracks to playlist");
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error(`Error adding tracks to playlist: ${error}`);
    }
}

async function fetchProfile(token: string): Promise<UserProfile> {
    const result = await fetch("https://api.spotify.com/v1/me", {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return await result.json();
}

// function populateUI(profile: UserProfile) {
//     document.getElementById("displayName")!.innerText = profile.display_name;
//     if (profile.images[0]) {
//         const profileImage = new Image(200, 200);
//         profileImage.src = profile.images[0].url;
//         document.getElementById("avatar")!.appendChild(profileImage);
//     }
//     document.getElementById("id")!.innerText = profile.id;
//     document.getElementById("email")!.innerText = profile.email;
//     document.getElementById("uri")!.innerText = profile.uri;
//     document.getElementById("uri")!.setAttribute("href", profile.external_urls.spotify);
//     document.getElementById("url")!.innerText = profile.href;
//     document.getElementById("url")!.setAttribute("href", profile.href);
//     document.getElementById("imgUrl")!.innerText = profile.images[0]?.url ?? '(no profile image)';
// }
