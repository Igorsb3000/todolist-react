import { useState, useEffect } from "react";
import "./TodoApp.css";

// DESAFIOS:

// Salvar itens em localStorage - feito
// Carregar os itens com useEffect - feito
// Deletar itens com uma função e evento - feito
// Editar itens - feito
// Adicionar checkbox para marcar como concluído - feito

// A fazer:
// Responsividade
// Ajsute automático de textos grandes
// Acessibilidade

const TodoApp = () => {
  // Lista de tarefas
  const [todos, setTodos] = useState(() => {
    const stored = localStorage.getItem("todos");
    return stored ? JSON.parse(stored) : [];
  });

  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [draft, setDraft] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  const [inputValue, setInputValue] = useState("");

  // Adicionar nova tarefa
  const handleSubmit = (e) => {
    e.preventDefault(); // Previne o comportamento padrão do formulário de atualizar a página após o envio

    if (inputValue.trim() !== "") {
      const newTodo = {
        id: Date.now(), // Gera um ID único baseado no timestamp atual
        text: inputValue.trim(), // Remove espaços em branco extras
        check: false, // Inicializa o estado de verificação como falso
      };
      setTodos((prevTodos) => [...prevTodos, newTodo]);
      setInputValue(""); // Limpa o campo de entrada após adicionar a tarefa
    }
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const startEdit = (todo) => {
    setEditingId(todo.id);
    setEditingText(todo.text);
    setDraft(todo.text); // Define o draft com o texto atual da tarefa
  };

  const saveEdit = () => {
    if (draft.trim() === "") {
      // Quando o draft estiver vazio, cancela a edição e retorna para o valor original
      setEditingId(null);
      return;
    }
    setTodos((prevTodos) =>
      prevTodos.map((t) => (t.id === editingId ? { ...t, text: draft } : t))
    );
    setEditingId(null);
    setEditingText("");
  };

  // Função para deletar uma tarefa
  // Recebe o ID da tarefa a ser deletada
  const handleDelete = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  // Função para deletar uma tarefa
  // Recebe o ID da tarefa a ser deletada
  const handleCheck = (id, check) => {
    //setIsChecked(e.target.checked);
    setTodos((prevTodos) =>
      prevTodos.map((t) => (t.id === id ? { ...t, check: check } : t))
    );

    //prevTodos.map((t) => (t.id === id ? { ...t, check: isChecked } : t));
  };

  return (
    <div className="app-container">
      <h1 className="title">To-do List</h1>
      {/* Formulário para adicionar novas tarefas*/}
      <form className="form-container" onSubmit={handleSubmit}>
        {/* Input */}
        <input
          className="input-field"
          type="text"
          placeholder="Adicione uma tarefa..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onBlur={saveEdit}
        ></input>
        <button type="submit" className="bi bi-plus btn btn-success ">
          Adicionar
        </button>
      </form>

      {/* Lista de tarefas*/}
      {todos.length === 0 && <p className="empty">Não há tarefas.</p>}
      <ul className="todo-list">
        {todos.map((todo) => {
          return editingId === todo.id ? (
            <div className="todo-item">
              <input
                key={todo.id}
                type="text"
                className="input-field"
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onBlur={saveEdit}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    saveEdit();
                  }
                }}
                autoFocus
              ></input>
              <button
                className="bi bi-check btn btn-success"
                onClick={saveEdit}
              ></button>
            </div>
          ) : (
            <li key={todo.id} className="todo-item">
              <div className="text-responsive">
                <input
                  type="checkbox"
                  className="check-item"
                  checked={todo.check}
                  onChange={(e) => {
                    handleCheck(todo.id, e.target.checked);
                  }}
                ></input>
                <span className={todo.check ? "text-risk" : ""}>
                  {todo.text}
                </span>
              </div>

              <div className="todo-actions">
                <button
                  className="bi bi-pencil btn btn-primary"
                  onClick={() => {
                    startEdit(todo);
                  }}
                ></button>
                <button
                  className="bi bi-trash btn btn-danger"
                  onClick={() => {
                    handleDelete(todo.id);
                  }}
                ></button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TodoApp;
