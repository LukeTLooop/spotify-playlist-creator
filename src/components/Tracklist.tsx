
import React from "react";
import Track from "./Track";

function Tracklist({ tracks, isPlaylist, onToggle }: TracklistProps) {
    return (
        <div className="scrollbar max-h-[95%] overflow-auto rounded-lg" style={{ direction: "rtl" }}>
            <ul style={{ direction: "ltr" }}>
                {tracks.map((track) => (
                    <Track
                        key={track.id}
                        track={track}
                        isPlaylist={isPlaylist}
                        onToggle={onToggle}
                    />
                ))}
            </ul>
        </div>
    );
}

export default Tracklist;
