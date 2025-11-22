import EditTask from "../EditTask";
import Task from "../Task";
import "./style.css";

const List = ({
  todos,
  editingId,
  draft,
  setDraft,
  saveEdit,
  handleCheck,
  startEdit,
  setIsOpen,
  setIdTarefaExcluir,
}) => {
  return (
    <>
      {todos.length === 0 && <p className="empty">Não há tarefas!</p>}
      <ul className="todo-list">
        {todos.map((todo) => {
          return (
            <li key={todo.id} className="todo-item">
              {editingId === todo.id ? (
                <EditTask
                  todo={todo}
                  draft={draft}
                  setDraft={setDraft}
                  saveEdit={saveEdit}
                ></EditTask>
              ) : (
                <Task
                  todo={todo}
                  handleCheck={handleCheck}
                  startEdit={startEdit}
                  setIsOpen={setIsOpen}
                  setIdTarefaExcluir={setIdTarefaExcluir}
                ></Task>
              )}
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default List;
