import { useState, useEffect } from "react";
import "../App.css";

function Cadastro() {
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [endereco, setEndereco] = useState("");
  const [pedido, setPedido] = useState("");
  const [clientes, setClientes] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [erro, setErro] = useState("");

  // Carregar do localStorage
  useEffect(() => {
    const dados = localStorage.getItem("clientes");
    if (dados) setClientes(JSON.parse(dados));
  }, []);

  // Salvar no localStorage
  useEffect(() => {
    localStorage.setItem("clientes", JSON.stringify(clientes));
  }, [clientes]);

  const limparFormulario = () => {
    setNome("");
    setTelefone("");
    setEndereco("");
    setPedido("");
    setErro("");
    setEditIndex(null);
  };

  const adicionarOuEditar = () => {
    if (!nome || !telefone || !endereco || !pedido) {
      setErro("⚠️ Preencha todos os campos!");
      return;
    }

    const cliente = { nome, telefone, endereco, pedido };

    if (editIndex !== null) {
      const novos = [...clientes];
      novos[editIndex] = cliente;
      setClientes(novos);
    } else {
      setClientes([...clientes, cliente]);
    }

    limparFormulario();
  };

  const editar = (index) => {
    const c = clientes[index];
    setNome(c.nome);
    setTelefone(c.telefone);
    setEndereco(c.endereco);
    setPedido(c.pedido);
    setEditIndex(index);
  };

  const remover = (index) => {
    const novos = clientes.filter((_, i) => i !== index);
    setClientes(novos);
    if (editIndex === index) limparFormulario();
  };

  return (
    <div className="pagina">
      <h2>📝 Cadastro de Clientes</h2>
      <div className="formulario">
        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <input
          type="text"
          placeholder="Telefone"
          value={telefone}
          onChange={(e) => setTelefone(e.target.value)}
        />
        <input
          type="text"
          placeholder="Endereço"
          value={endereco}
          onChange={(e) => setEndereco(e.target.value)}
        />
        <input
          type="text"
          placeholder="Pedido"
          value={pedido}
          onChange={(e) => setPedido(e.target.value)}
        />

        <div className="botoes">
          <button className="btn adicionar" onClick={adicionarOuEditar}>
            {editIndex !== null ? "Atualizar" : "Adicionar"}
          </button>
          {editIndex !== null && (
            <button className="btn cancelar" onClick={limparFormulario}>
              Cancelar
            </button>
          )}
        </div>
      </div>

      {erro && <p className="erro">{erro}</p>}

      {clientes.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Telefone</th>
              <th>Endereço</th>
              <th>Pedido</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((c, i) => (
              <tr key={i}>
                <td>{c.nome}</td>
                <td>{c.telefone}</td>
                <td>{c.endereco}</td>
                <td>{c.pedido}</td>
                <td>
                  <button className="btn editar" onClick={() => editar(i)}>
                    ✏️
                  </button>
                  <button className="btn remover" onClick={() => remover(i)}>
                    ❌
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Cadastro;
