import { createPortal } from "react-dom";
import "./ConfirmModal.css";
export default function ConfirmModal({
  open,
  title,
  message,
  onConfirm,
  onClose,
}) {
  if (!open) return null;

  return createPortal(
    <div className="backdrop">
      <div className="modal">
        <h2>{title}</h2>
        <p>{message}</p>

        <div className="actions">
          <button className="btn danger" onClick={onConfirm}>
            Sim
          </button>
          <button className="btn" onClick={onClose}>
            Cancelar
          </button>
        </div>
      </div>
    </div>,
    document.body // ← renderiza fora do #root
  );
}
