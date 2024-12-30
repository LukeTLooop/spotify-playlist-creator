
import React from "react";
import Tracklist from "./Tracklist";

function Playlist({ playlistTracks, playlistName, onRemoveTrack, onCreatePlaylist, setPlaylistName }: PlaylistProps) {
    //const [playlistName, setPlaylistName] = useState("");

    function handleToggle(track: Track) {
        onRemoveTrack(track);
    }

    return (
        <div className="h-full flex flex-col">
            <div className="flex-1 overflow-auto">
                <Tracklist
                    tracks={playlistTracks}
                    isPlaylist={true}
                    onToggle={handleToggle}
                />
            </div>

            <div className="mt-4 mb-12 flex items-center justify-center gap-4">
                <input
                    type="text"
                    placeholder="Playlist Name"
                    value={playlistName}
                    onChange={setPlaylistName}
                    className="
                        p-2 rounded
                        bg-gray-700
                        text-gray-100
                        placeholder-gray-400
                    "
                />
                <button className="bg-green-600 text-white py-2 px-4 rounded" onClick={() => onCreatePlaylist(playlistName)}>
                    Save to Spotify
                </button>
            </div>
        </div>
    );
}

export default Playlist;
