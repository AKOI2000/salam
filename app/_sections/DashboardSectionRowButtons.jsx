"use client";

import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import Modal from "../_components/Modal";
import ConfirmDelete from "../_components/ConfirmDelete";
import EditSectionForm from "../_components/EditSection.form";

function DashboardSectionRowButtons() {
  return (
    <div className="products-table-row-buttons">
      <Modal>
        <Modal.Open opens="section-edit">
          <button className="btn-dashboard-secondary">
            <FaEdit />
          </button>
        </Modal.Open>

        <Modal.Window name="section-edit">
          <EditSectionForm />
        </Modal.Window>

        <Modal.Open opens="section-delete">
          <button className="btn-dashboard-secondary">
            <MdDeleteForever />
          </button>
        </Modal.Open>

        <Modal.Window name="section-delete">
          <ConfirmDelete />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default DashboardSectionRowButtons;
