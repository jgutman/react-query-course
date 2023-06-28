import { Link } from "react-router-dom";
import { GoIssueOpened, GoIssueClosed, GoComment } from "react-icons/go";
import { relativeDate } from "../helpers/relativeDate";
import { defaultLabels } from "../helpers/defaultData";
import { useUserData } from "../helpers/useUserData";

export default function IssueItem({ 
    title, number, assignee, commentCount, createdBy, createdDate, labels, status 
  }) {

    const createdByUser = useUserData(createdBy);
    const assigneeUser = useUserData(assignee);

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
          <small>#{number} opened {relativeDate(createdDate)} 
            { createdByUser.isSuccess ? 
                ` by ${createdByUser.data.name}` :
                null 
            }
          </small>
        </div>
        { assignee && assigneeUser.isSuccess ? // check that issue has an assignee and that the user data is available  
            <img className="assigned-to" 
                 src={assigneeUser.data.profilePictureUrl} 
                 alt={`Assigned to ${assigneeUser.data.name}`} 
            /> :
            null
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