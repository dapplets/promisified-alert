import { ModalProvider } from "./contexts/ModalContext";
import FirstPage from "./pages/FirstPage";

function App() {
  return (
    <ModalProvider>
      <FirstPage />
    </ModalProvider>
  );
}

export default App;
