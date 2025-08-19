import { useState, useEffect } from "react";

function ListaClientes() {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    const dados = localStorage.getItem("clientes");
    if (dados) setClientes(JSON.parse(dados));
  }, []);

  const remover = (index) => {
    const novos = clientes.filter((_, i) => i !== index);
    setClientes(novos);
    localStorage.setItem("clientes", JSON.stringify(novos));
  };

  return (
    <div className="pagina">
      <h2>📋 Lista de Clientes</h2>
      {clientes.length > 0 ? (
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
                  <button className="btn remover" onClick={() => remover(i)}>
                    ❌
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Nenhum cliente cadastrado.</p>
      )}
    </div>
  );
}

export default ListaClientes;
