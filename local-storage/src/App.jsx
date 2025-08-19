import { useState } from "react";
import Cadastro from "./pages/Cadastro";
import ListaClientes from "./pages/ListaClientes";
import Promocoes from "./pages/Promocoes";
import "./App.css";

function App() {
  const [pagina, setPagina] = useState("cadastro");

  return (
    <div className="app">
      <header className="navbar">
        <h1>🍕 Pizzaria React</h1>
        <nav>
          <button onClick={() => setPagina("cadastro")}>Cadastro</button>
          <button onClick={() => setPagina("lista")}>Clientes</button>
          <button onClick={() => setPagina("promo")}>Promoções</button>
        </nav>
      </header>

      <main>
        {pagina === "cadastro" && <Cadastro />}
        {pagina === "lista" && <ListaClientes />}
        {pagina === "promo" && <Promocoes />}
      </main>
    </div>
  );
}

export default App;
