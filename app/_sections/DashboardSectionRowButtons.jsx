"use client";

import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import Modal from "../_components/Modal";
import ConfirmDelete from "../_components/ConfirmDelete";
import EditSectionForm from "../_components/EditSectionForm";
import { deleteSection } from "../_lib/sections-actions";

function DashboardSectionRowButtons({section, params}) {
  
  return (
    <div className="products-table-row-buttons">
      <Modal>
        <Modal.Open opens="section-edit">
          <button className="btn-dashboard-secondary">
            <FaEdit />
          </button>
        </Modal.Open>

        <Modal.Window name="section-edit">
          <EditSectionForm section={section} params={params} />
        </Modal.Window>

        <Modal.Open opens="section-delete">
          <button className="btn-dashboard-secondary">
            <MdDeleteForever />
          </button>
        </Modal.Open>

        <Modal.Window name="section-delete">
          <ConfirmDelete resourceName={section.section_type} onConfirm={() => deleteSection(section.id, params)} />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default DashboardSectionRowButtons;
