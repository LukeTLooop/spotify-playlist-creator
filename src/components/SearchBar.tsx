
import React, { useState } from "react";

function SearchBar({ onSearch }: SearchBarProps) {
    const [search, setSearch] = useState("");

    const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(target.value);
        onSearch(target.value);
    };

    return (
        <>
            <label htmlFor="search" className="text-gray-100 text-lg mt-20">Search for Tracks</label>
            <input
                className="py-1 px-3"
                id="search"
                name="search"
                type="text"
                placeholder="Search Spotify"
                value={search}
                onChange={handleChange} />
        </>
    );
}

export default SearchBar;
