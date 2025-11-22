import "./style.css";

const EditTask = ({ todo, draft, setDraft, saveEdit }) => {
  return (
    <>
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
    </>
  );
};
export default EditTask;
