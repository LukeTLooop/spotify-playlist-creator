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

interface Playlist {
    id: string;
    name: string;
    description: string | null;
    public: boolean;
    uri: string;
    href: string;
    external_urls: {
        spotify: string;
    };
    images: {
        url: string;
        height: number | null;
        width: number | null;
    }[];
    owner: {
        id: string;
        display_name: string | null;
        href: string;
        uri: string;
        external_urls: {
            spotify: string;
        };
    };
    tracks: {
        href: string;
        total: number;
    };
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
    playlistName: string;
    onRemoveTrack: (track: Track) => void;
    onCreatePlaylist: (name: string) => void;
    setPlaylistName: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

interface SearchResultsProps {
    tracks: Track[];
    playlistTracks: Track[];
    onAddTrack: (track: Track) => void;
    onRemoveTrack: (track: Track) => void;
}

interface SearchBarProps {
    search: string;
    onSearch: (query: string) => void;
}
