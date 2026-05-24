function ConfirmDelete({ resourceName, disabled, onCloseModal, onConfirm }) {
  return (
    <div className="confirm-delete">
      <h3>Delete {resourceName}</h3>

      <p>
        Are you sure you want to delete this {resourceName} permanently? This
        action cannot be undone.
      </p>

      <div className="flex">
        <button
          disabled={disabled}
          onClick={onCloseModal}
          className="btn-dashboard-primary"
        >
          Cancel
        </button>
        <button
          disabled={disabled}
          onClick={onConfirm}
          className="btn-dashboard-tertiary"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default ConfirmDelete;
