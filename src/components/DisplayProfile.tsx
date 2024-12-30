import React from "react";

function DisplayProfile() {
    return (
        <>
            <h1 className="text-gray-100">Display Spotify Profile Data</h1>
            <section id="profile">
                <h2 className="text-gray-100">Logged in as <span id="displayName"></span></h2>
                <span id="avatar"></span>
                <ul>
                    <li className="text-gray-100">User ID: <span id="id"></span></li>
                    <li className="text-gray-100">Email: <span id="email"></span></li>
                    <li className="text-gray-100">Spotify URI: <a id="uri" href="#"></a></li>
                    <li className="text-gray-100">Link: <a id="url" href="#"></a></li>
                    <li className="text-gray-100">Profile Image: <span id="imgUrl"></span></li>
                </ul>
            </section>
        </>
    );
}

export default DisplayProfile;
