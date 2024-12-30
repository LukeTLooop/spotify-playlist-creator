
import React, { useEffect, useState } from "react";
import Playlist from "./components/Playlist"
import SearchBar from "./components/SearchBar"
import SearchResults from "./components/SearchResults"

import { getToken, searchTracks, createPlaylist, addTracksToPlaylist } from "./modules/spotify-api";

function App() {
  const [accessToken, setAccessToken] = useState<string>("");
  const [search, setSearch] = useState("");
  const [queriedTracks, setQueriedTracks] = useState<Track[]>([]);
  const [playlistTracks, setPlaylistTracks] = useState<Track[]>([]);
  const [playlistName, setPlaylistName] = useState<string>("");

  // get token
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      setAccessToken(token);
      window.history.replaceState({}, document.title, "/");
    } else {
      getToken();
    }
  }, []);

  async function handleSearch(query: string) {
    if (!accessToken) return;

    setSearch(query);
    const results = await searchTracks(accessToken, query);
    setQueriedTracks(results);
  }

  function handleAddTrack(track: Track) {
    if (!playlistTracks.find((t) => t.id === track.id)) {
      setPlaylistTracks((prev) => [track, ...prev]);
    }
  }

  function handleRemoveTrack(track: Track) {
    setPlaylistTracks((prev) => prev.filter((t) => t.id !== track.id));
  }

  function handlePlaylistName({ target }: React.ChangeEvent<HTMLInputElement>) {
      setPlaylistName(target.value);
  }

  async function handleCreatePlaylist(name: string) {
    if (name.trim().length === 0) {
      // Don't continue if the name is empty
      return;
    }

    if (playlistTracks.length === 0) {
      // Don't continue if there aren't any tracks in the playlist
      return;
    }

    // Create the playlist
    await createPlaylist(accessToken, name)
      .then((playlist) => addTracksToPlaylist(accessToken, playlist.id, playlistTracks));

    // Clear search query and playlist name
    setSearch("");
    setQueriedTracks([]);

    setPlaylistName("");
    setPlaylistTracks([]);
  }

  return (
    <main
      className="
        bg-gray-950
        flex
        flex-col
        p-10
        h-screen 
        overflow-auto
        md:h-screen
        md:overflow-hidden
    ">
      <header>
        <h1 className="font-bold text-3xl text-center text-gray-100">
          Spotify Playlist Creator
        </h1>
      </header>

      <div className="flex flex-col flex-grow w-3/4 h-[35%] mx-auto">
        <SearchBar onSearch={handleSearch} search={search} />

        <div className="flex flex-col h-[35%] md:flex-row flex-1 gap-6 mt-12">
          <section
            id="song-list"
            className="
              flex-1
              flex flex-col
              bg-gray-800
              p-5
              rounded-2xl
              overflow-hidden
              h-[100%]
          ">
            <h2 className="text-gray-100 text-xl text-center mb-3 font-semibold">Songs</h2>
            <div className="flex-1 overflow-auto">
              <SearchResults
                tracks={queriedTracks}
                playlistTracks={playlistTracks}
                onAddTrack={handleAddTrack}
                onRemoveTrack={handleRemoveTrack}
              />
            </div>
          </section>
          <section
            id="playlist"
            className="
              flex-1
              flex flex-col
              bg-gray-800
              p-5
              rounded-2xl
              overflow-hidden
              h-[100%]
            ">
            <h2 className="text-gray-100 text-xl text-center mb-3 font-semibold">Playlist</h2>
            <div className="flex-1 overflow-auto">
              <Playlist
                playlistTracks={playlistTracks}
                onRemoveTrack={handleRemoveTrack}
                onCreatePlaylist={handleCreatePlaylist}
                playlistName={playlistName}
                setPlaylistName={handlePlaylistName}
              />
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}

export default App;
