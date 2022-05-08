import { useEffect, useState, useLayoutEffect } from "react";
import { accessToken, logout, getCurrentUserProfile } from "./Spotify";
import { catchErrors } from "./Errors";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { GlobalStyle } from "./styles";
import {
  Login,
  Profile,
  TopArtists,
  TopTracks,
  Playlists,
  Playlist,
} from "./pages";
import styled from "styled-components/macro";

const StyledLogoutButton = styled.button`
  position: absolute;
  top: var(--spacing-sm);
  right: var(--spacing-md);
  padding: var(--spacing-xs) var(--spacing-sm);
  background-color: rgba(0, 0, 0, 0.7);
  color: var(--white);
  font-size: var(--fz-sm);
  font-weight: 700;
  border-radius: var(--border-radius-pill);
  z-index: 10;
  @media (min-width: 768px) {
    right: var(--spacing-lg);
  }
`;

const Wrapper = ({ children }) => {
  const location = useLocation();
  useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, [location.pathname]);
  return children;
};

function App() {
  const [token, setToken] = useState(null);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    setToken(accessToken);

    const fetchProfile = async () => {
      const { data } = await getCurrentUserProfile();
      setProfile(data);
    };

    catchErrors(fetchProfile());
  }, []);

  return (
    <div className="App">
      <GlobalStyle />
      <header className="App-header">
        {!token ? (
          <Login />
        ) : (
          <>
            <StyledLogoutButton onClick={logout}>Log Out</StyledLogoutButton>

            <Router>
              <Wrapper>
                <Routes>
                  <Route path="/top-artists" element={<TopArtists />} />
                  <Route path="/top-tracks" element={<TopTracks />} />
                  <Route path="/playlists/:id" element={<Playlist />} />
                  <Route path="/playlists" element={<Playlists />} />
                  <Route path="/" element={<Profile />} />
                </Routes>
              </Wrapper>
            </Router>
          </>
        )}
      </header>
    </div>
  );
}

export default App;
