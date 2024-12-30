
import React, { useEffect, useState } from "react";
import Playlist from "./components/Playlist"
import SearchBar from "./components/SearchBar"
import SearchResults from "./components/SearchResults"

import { getToken, searchTracks } from "./modules/spotify-api";

function App() {
  const [accessToken, setAccessToken] = useState<string>("");
  const [queriedTracks, setQueriedTracks] = useState<Track[]>([]);
  const [playlistTracks, setPlaylistTracks] = useState<Track[]>([]);

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
        <SearchBar onSearch={handleSearch} />

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
              />
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}

export default App;
