// context/AuthContext.js

import React, { createContext, useState } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [channel, setChannel] = useState(false);
    const [profileData, setProfile] = useState([]);

    const login = (tokenData, userData) => {
        setToken(tokenData);
        setProfile(userData);
    };
    const addchannel = (channelData) => {
        setChannel(channelData);
    };
    const logout = () => {
        setToken(null);
        setChannel(null);
        setProfile(null);
    };

    return (
        <AuthContext.Provider value={{ token, channel, profileData, login, addchannel, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
