import { useState, useEffect } from "react";
import "./TodoApp.css";
import DeleteModal from "./DeleteModal";
import AddNewTask from "./AddNewTask";
import List from "./List";

const TodoApp = () => {
  // Lista de tarefas
  const [todos, setTodos] = useState(() => {
    const stored = localStorage.getItem("todos");
    return stored ? JSON.parse(stored) : [];
  });

  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [draft, setDraft] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [idTarefaExcluir, setIdTarefaExcluir] = useState(0);

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
  const handleDelete = () => {
    setTodos((prevTodos) =>
      prevTodos.filter((todo) => todo.id !== idTarefaExcluir)
    );
  };

  // Função para deletar uma tarefa
  // Recebe o ID da tarefa a ser deletada
  const handleCheck = (id, check) => {
    setTodos((prevTodos) =>
      prevTodos.map((t) => (t.id === id ? { ...t, check: check } : t))
    );
  };

  return (
    <div className="background">
      <div className="app-container">
        <h1 className="title">To-do List</h1>
        {/* Formulário para adicionar nova tarefa*/}
        <AddNewTask
          handleSubmit={handleSubmit}
          inputValue={inputValue}
          setInputValue={setInputValue}
          saveEdit={saveEdit}
        ></AddNewTask>

        {/* Lista de tarefas*/}
        <List
          todos={todos}
          editingId={editingId}
          draft={draft}
          setDraft={setDraft}
          saveEdit={saveEdit}
          handleCheck={handleCheck}
          startEdit={startEdit}
          setIsOpen={setIsOpen}
          setIdTarefaExcluir={setIdTarefaExcluir}
        ></List>

        {/*Modal de confirmação de exclusão */}
        <DeleteModal
          handleDelete={handleDelete}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        ></DeleteModal>
      </div>
    </div>
  );
};

export default TodoApp;
