import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion"; // instale com: npm install framer-motion
import "./App.css";

function App() {
  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [idade, setIdade] = useState("");
  const [usuarios, setUsuarios] = useState([]);
  const [erro, setErro] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [busca, setBusca] = useState("");

  // Carregar usuários do localStorage ao iniciar (com fallback seguro)
  useEffect(() => {
    try {
      const dados = localStorage.getItem("usuarios");
      if (dados) {
        const parsed = JSON.parse(dados);
        if (Array.isArray(parsed)) {
          setUsuarios(parsed);
        }
      }
    } catch (err) {
      console.error("Erro ao carregar localStorage:", err);
      localStorage.removeItem("usuarios"); // limpa dados corrompidos
    }
  }, []);

  // Atualizar localStorage sempre que a lista mudar
  useEffect(() => {
    if (usuarios.length >= 0) {
      localStorage.setItem("usuarios", JSON.stringify(usuarios));
    }
  }, [usuarios]);

  const limparFormulario = () => {
    setNome("");
    setSobrenome("");
    setIdade("");
    setErro("");
    setEditIndex(null);
  };

  const adicionarOuEditarUsuario = () => {
    if (nome === "" || sobrenome === "" || idade === "") {
      setErro("⚠️ Por favor, preencha todos os campos!");
      return;
    }
    if (isNaN(idade) || Number(idade) <= 0) {
      setErro("⚠️ Digite uma idade válida!");
      return;
    }

    const usuario = { nome, sobrenome, idade: Number(idade) };

    if (editIndex !== null) {
      const novosUsuarios = [...usuarios];
      novosUsuarios[editIndex] = usuario;
      setUsuarios(novosUsuarios);
    } else {
      setUsuarios([...usuarios, usuario]);
    }

    limparFormulario();
  };

  const editarUsuario = (index) => {
    const usuario = usuarios[index];
    setNome(usuario.nome);
    setSobrenome(usuario.sobrenome);
    setIdade(usuario.idade);
    setEditIndex(index);
  };

  const removerUsuario = (index) => {
    const novosUsuarios = usuarios.filter((_, i) => i !== index);
    setUsuarios(novosUsuarios);

    if (editIndex === index) {
      limparFormulario();
    }
  };

  const usuariosFiltrados = usuarios.filter((u) =>
    u.nome.toLowerCase().includes(busca.toLowerCase())
  );

  const corPorIdade = (idade) => {
    if (idade < 18) return "#ffeeba"; // amarelo claro
    if (idade <= 40) return "#c3e6cb"; // verde claro
    return "#f5c6cb"; // vermelho claro
  };

  return (
    <div className="container">
      <h1>Cadastro de Usuários</h1>

      <div className="formulario">
        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <input
          type="text"
          placeholder="Sobrenome"
          value={sobrenome}
          onChange={(e) => setSobrenome(e.target.value)}
        />
        <input
          type="number"
          placeholder="Idade"
          value={idade}
          onChange={(e) => setIdade(e.target.value)}
        />

        <button className="btn adicionar" onClick={adicionarOuEditarUsuario}>
          {editIndex !== null ? "Atualizar" : "Adicionar"}
        </button>

        {editIndex !== null && (
          <button className="btn cancelar" onClick={limparFormulario}>
            Cancelar
          </button>
        )}
      </div>

      {erro && <p className="erro">{erro}</p>}

      <div className="filtro">
        <input
          type="text"
          placeholder="🔎 Buscar por nome..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
      </div>

      {usuariosFiltrados.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Sobrenome</th>
              <th>Idade</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {usuariosFiltrados.map((usuario, index) => (
                <motion.tr
                  key={index}
                  style={{ backgroundColor: corPorIdade(usuario.idade) }}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  <td>{usuario.nome}</td>
                  <td>{usuario.sobrenome}</td>
                  <td>{usuario.idade}</td>
                  <td>
                    <button
                      className="btn editar"
                      onClick={() => editarUsuario(index)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn remover"
                      onClick={() => removerUsuario(index)}
                    >
                      Remover
                    </button>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      ) : (
        <p className="nenhum">Nenhum usuário encontrado.</p>
      )}
    </div>
  );
}

export default App;
