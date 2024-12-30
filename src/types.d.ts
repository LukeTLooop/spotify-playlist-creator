interface UserProfile {
    country: string;
    display_name: string;
    email: string;
    explicit_content: {
        filter_enabled: boolean,
        filter_locked: boolean
    },
    external_urls: { spotify: string; };
    followers: { href: string; total: number; };
    href: string;
    id: string;
    images: Image[];
    product: string;
    type: string;
    uri: string;
}

interface Image {
    url: string;
    height: number;
    width: number;
}

interface Artist {
    name: string
}

interface Track {
    id: string;
    name: string;
    artists: Artist[];
    album: {
        images: { url: string }[];
    };
}

interface TrackProps {
    track: Track;
    isPlaylist: boolean;
    onToggle: (track: Track) => void;
}

interface TracklistProps {
    tracks: Track[];
    isPlaylist: boolean;
    onToggle: (track: Track) => void;
}

interface PlaylistProps {
    playlistTracks: Track[];
    onRemoveTrack: (track: Track) => void;
}

interface SearchResultsProps {
    tracks: Track[];
    playlistTracks: Track[];
    onAddTrack: (track: Track) => void;
    onRemoveTrack: (track: Track) => void;
}

interface SearchBarProps {
    onSearch: (query: string) => void;
}
