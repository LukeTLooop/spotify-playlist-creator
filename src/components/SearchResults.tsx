
import React from "react";
import Tracklist from "./Tracklist";

function SearchResults({ tracks, playlistTracks, onAddTrack, onRemoveTrack }: SearchResultsProps) {
    const visibleTracks = tracks.filter(
        (track) => !playlistTracks.some((pt) => pt.id === track.id)
    );

    function handleToggle(track: Track) {
        const isInPlaylist = playlistTracks.some((t) => t.id === track.id);
        if (isInPlaylist) {
            onRemoveTrack(track);
        } else {
            onAddTrack(track);
        }
    }

    return (
        <Tracklist
            tracks={visibleTracks}
            isPlaylist={false}
            onToggle={handleToggle}
        />
    );
}

export default SearchResults;
