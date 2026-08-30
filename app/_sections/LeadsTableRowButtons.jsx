"use client";
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import Modal from "@/app/_components/Modal";
import ConfirmDelete from "../_components/ConfirmDelete";
import LeadsDetail from "./LeadsDetail";
import { deleteLead } from "../_lib/leads-actions";

function LeadsTableRowButtons({ data }) {
  return (
    <div className="products-table-row-buttons">
      <Modal>
        <Modal.Open opens="product-edit-modal">
          {(openModal) => (
            <button className="btn-dashboard-secondary" onClick={openModal}>
              <FaEdit />
            </button>
          )}
        </Modal.Open>

        <Modal.Window name="product-edit-modal">
          <LeadsDetail data={data} />
        </Modal.Window>

        <Modal.Open opens="product-delete-modal">
          {(openModal) => (
            <button className="btn-dashboard-secondary" onClick={openModal}>
              <MdDeleteForever />
            </button>
          )}
        </Modal.Open>

        <Modal.Window name="product-delete-modal">
          <ConfirmDelete resourceName="lead" onConfirm={() => deleteLead(data.id)} />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default LeadsTableRowButtons;