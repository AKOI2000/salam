"use client";

import { FaPlus } from "react-icons/fa";
import { MdKeyboardArrowRight } from "react-icons/md";
import Modal from "./Modal";
import AddProjectForm from "./AddProjectForm";

function QuickActionClient() {
  return (
    <Modal>
      <Modal.Open opens="addProject">
        <div className="action">
          <div className="action_group">
            <p className="action_icon updated">
              <FaPlus />
            </p>
            <div className="action_text">
              <p className="action_text-main">Add New Project</p>
              <p className="action_text-sub">Create a new project</p>
            </div>
          </div>

          <p className="action_btn">
            <MdKeyboardArrowRight />
          </p>
        </div>
      </Modal.Open>

      <Modal.Window name="addProject">
        <AddProjectForm />
      </Modal.Window>
    </Modal>
  );
}

export default QuickActionClient;
