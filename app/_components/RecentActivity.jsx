import { formatDistanceToNow } from "date-fns";
import { getRecentActivityApi } from "../_lib/activityAPI";
import { FaRegFolderOpen } from "react-icons/fa";
import { MdOutlinePeople } from "react-icons/md";
import { FiBriefcase } from "react-icons/fi";

async function RecentActivity() {
  const recentActivity = await getRecentActivityApi();

  return (
    <div className="recent_activity">
      <h6>Recent Activity</h6>

      <div className="activities">
        {recentActivity.map((activity) => (
          <div className="activity" key={activity.id}>
            <div className="activity_group">
              <p
                className={`activity_icon ${
                  activity.action === "created"
                    ? "created"
                    : activity.action === "updated"
                      ? "updated"
                      : activity.action === "deleted"
                        ? "deleted"
                        : ""
                }`}
              >
                {activity.type === "section" ? (
                  <FaRegFolderOpen />
                ) : activity.type === "project" ? (
                  <FiBriefcase />
                ) : activity.type === "lead" ? (
                  <MdOutlinePeople />
                ) : null}
              </p>
              <p className="activity_text">{activity.message}</p>
            </div>
            <p className="activity_time">
              {formatDistanceToNow(new Date(activity.created_at), {
                addSuffix: true,
              })}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecentActivity;
