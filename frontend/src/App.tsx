import { BrowserRouter, Routes, Route } from "react-router";
import Board from "./Board";
import AuthProvider from "./components/AuthProvider";
import SocketProvider from "./SocketProvider";
import AuthProtect from "./components/AuthProctect";
import LandingPage from "./pages/landing-page";
function MultiplayerWrapper() {
  return (
      <AuthProtect>
        <SocketProvider>
          <Board mode="multiplayer" />
        </SocketProvider>
      </AuthProtect>
  );
}

function App() {
  const URI = `${window.location.origin}/multiplayer`
  return (
    <AuthProvider redirect_uri={URI}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/multiplayer" element={<MultiplayerWrapper />} />
      </Routes>
    </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
