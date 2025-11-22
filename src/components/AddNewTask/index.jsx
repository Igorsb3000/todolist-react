import "./style.css";

const AddNewTask = ({ handleSubmit, inputValue, setInputValue, saveEdit }) => {
  return (
    <form className="form-container" onSubmit={handleSubmit}>
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
  );
};

export default AddNewTask;
