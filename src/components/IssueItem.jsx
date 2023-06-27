import { Link } from "react-router-dom";
import { GoIssueOpened, GoIssueClosed, GoComment } from "react-icons/go";
import { relativeDate } from "../helpers/relativeDate";
import { defaultLabels, defaultUsers } from "../helpers/defaultData";

export default function IssueItem({ 
    title, number, assignee, commentCount, createdBy, createdDate, labels, status 
  }) {
    const createdByUser = defaultUsers.find((user) => user.id === createdBy);
    const assigneeUser = defaultUsers.find((user) => user.id === assignee);

    return (
      <li>
        <div>
          {status === "done" || status === "cancelled" ? 
          <GoIssueClosed style={{ color: "red" }}/> : 
          <GoIssueOpened style={{ color: "green" }}/>} 
        </div>
        <div className="issue-content">
          <span>
            <Link to={`/issue/${number}`}>{title}</Link>
            {labels.map((label) => {
              const labelData = defaultLabels.find((l) => l.name === label);
              return <span key={label} className={`label ${labelData?.color || "white"}`}>{label}</span>
            })}
          </span>
          <small>#{number} opened {relativeDate(createdDate)} by {createdByUser?.name}</small>
        </div>
        {assigneeUser ? 
          <div>
            <img className="assigned-to" src={assigneeUser.profilePictureUrl} alt={assigneeUser.name} />
          </div>
        : null
        }
        {commentCount > 0 ?
          <span className="comment-count">
            <GoComment />
            {commentCount}
          </span>
        : null
        }
      </li>
    )
}