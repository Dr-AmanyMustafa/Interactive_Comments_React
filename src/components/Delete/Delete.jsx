const Delete = ({ onConfirm, onCancel }) => {
    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <h2>Are you sure you want to delete this reply?</h2>
          <div className="modal-actions">
            <button onClick={onConfirm} className="confirm-button">OK</button>
            <button onClick={onCancel} className="cancel-button">Cancel</button>
          </div>
        </div>
      </div>
    );
  };
export default Delete