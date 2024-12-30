
import React from "react";

function Track({ track, isPlaylist, onToggle }: TrackProps) {
    const artistNames = track.artists.map((artist) => artist.name).join(", ");
    const albumCover = track.album?.images?.[0]?.url;

    const arrowIcon = isPlaylist
        ? "/src/assets/left-arrow.svg"
        : "/src/assets/right-arrow.svg";

    return (
        <li
            className="flex items-center justify-between p-2 bg-gray-700 mb-2 transition-all hover:scale-99"
            onClick={() => onToggle(track)}
        >
            <div className="flex items-center">
                {albumCover && (
                    <img src={albumCover} alt={track.name} className="w-16 h-16 mr-4 hover:cursor-pointer transition-all duration-100 hover:scale-110 hover:rounded-md" />
                )}
                <div className="max-w-96">
                    <div className="text-gray-100 dont-bold overflow-clip">{track.name}</div>
                    <div className="text-gray-400 text-sm overflow-clip">{artistNames}</div>
                </div>

            </div>
            <img
                src={arrowIcon}
                alt={isPlaylist ? "Remove from playlist" : "Add to playlist"}
                className="h-8 w-8 mr-4 self-center transition-all hover:scale-125 hover:cursor-pointer"
            />
        </li>
    );
}

export default Track;
