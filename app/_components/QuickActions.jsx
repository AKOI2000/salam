import Link from "next/link";
import { MdKeyboardArrowRight, MdOutlinePeopleAlt } from "react-icons/md";

import { FaChartLine } from "react-icons/fa6";
import QuickActionClient from "./QuickActionClient";

async function QuickActions() {
  return (
    <div className="quick_actions">
      <h6>Quick Actions</h6>

      <div className="actions">
        <QuickActionClient />

        <Link href={"/admin/analytics"} className="action">
          <div className="action_group">
            <p className="action_icon created">
              <FaChartLine />
            </p>
            <div className="action_text">
              <p className="action_text-main">View Analytics</p>
              <p className="action_text-sub">Go to analytics dashboard</p>
            </div>
          </div>

          <p className="action_btn">
            <MdKeyboardArrowRight />
          </p>
        </Link>

        <Link href={"/admin/leads"} className="action">
          <div className="action_group">
            <p className="action_icon deleted">
              <MdOutlinePeopleAlt />
            </p>
            <div className="action_text">
              <p className="action_text-main">Manage Leads</p>
              <p className="action_text-sub">View and manage leads</p>
            </div>
          </div>

          <p className="action_btn">
            <MdKeyboardArrowRight />
          </p>
        </Link>
      </div>
    </div>
  );
}

export default QuickActions;
