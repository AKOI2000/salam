"use client";

import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { IoMdMore } from "react-icons/io";
import Modal from "@/app/_components/Modal";
import ConfirmDelete from "../_components/ConfirmDelete";
import Link from "next/link";
import EditProjectForm from "../_components/EditProjectForm";
import { deleteProject } from "../_lib/products-actions";
import { useTransition } from "react";

function DashboardProductCardButtons({ product }) {
  return (
    <div className="products-table-row-buttons">
      <Modal>
        <Modal.Open opens="product-edit-modal">
          <button className="btn-dashboard-secondary">
            <FaEdit />
          </button>
        </Modal.Open>

        <Modal.Window name="product-edit-modal">
          <EditProjectForm product={product}/>
        </Modal.Window>

        <Modal.Open opens="product-delete-modal">
          <button className="btn-dashboard-secondary">
            <MdDeleteForever />
          </button>
        </Modal.Open>

        <Modal.Window name="product-delete-modal">
        <ConfirmDelete resourceName={product.title} onConfirm={() => deleteProject(product.id)}/>
        </Modal.Window>
      </Modal>

      <Link href={`/admin/projects/${product.slug}`} className="btn-dashboard-secondary">
        <IoMdMore />
      </Link>
    </div>
  );
}

export default DashboardProductCardButtons;
