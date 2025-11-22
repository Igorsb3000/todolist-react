import "./style.css";

const Task = ({
  todo,
  handleCheck,
  startEdit,
  setIsOpen,
  setIdTarefaExcluir,
}) => {
  return (
    <>
      <div className="text-responsive">
        <input
          type="checkbox"
          className="check-item"
          checked={todo.check}
          onChange={(e) => {
            handleCheck(todo.id, e.target.checked);
          }}
        ></input>
        <span className={todo.check ? "text-risk" : ""}>{todo.text}</span>
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
            setIsOpen(true);
            setIdTarefaExcluir(todo.id);
          }}
        ></button>
      </div>
    </>
  );
};

export default Task;
