import "./App.css";
import Nav from "./components/navBar/Nav";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
      <Nav />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
