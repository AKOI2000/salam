import { useTransition } from "react";

function ConfirmDelete({ resourceName, onCloseModal, onConfirm }) {
  const [isPending, startTransition] = useTransition();

  const handleConfirm = () => {
    startTransition(async () => {
      await onConfirm();
      onCloseModal?.(); // close the modal after delete succeeds
    });
  };

  return (
    <div className="confirm-delete">
      <h3>Delete {resourceName}</h3>

      <p>
        Are you sure you want to delete this {resourceName} permanently? This
        action cannot be undone.
      </p>

      <div className="flex">
        <button
          disabled={isPending}
          onClick={onCloseModal}
          className="btn-dashboard-tertiary"
        >
          Cancel
        </button>
        <button
          disabled={isPending}
          onClick={handleConfirm}
          className="btn-dashboard-primary"
        >
          {isPending ? "Deleting..." : "Delete"}
        </button>
      </div>
    </div>
  );
}

export default ConfirmDelete;