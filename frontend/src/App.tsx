import { BrowserRouter, Routes, Route } from "react-router";
import Board from "./Board";
import AuthProvider from "./components/AuthProvider";
import SocketProvider from "./SocketProvider";
import AuthProtect from "./components/AuthProctect";

function MultiplayerWrapper() {
  const URI = `${window.location.origin}/multiplayer`
  return (
    <AuthProvider redirect_uri={URI}>
      <AuthProtect>
        <SocketProvider>
          <Board mode="multiplayer" />
        </SocketProvider>
      </AuthProtect>
    </AuthProvider>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/multiplayer" element={<MultiplayerWrapper />} />
        {/* other routes */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
