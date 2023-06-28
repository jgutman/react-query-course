import { Link } from "react-router-dom";
import { GoIssueOpened, GoIssueClosed, GoComment } from "react-icons/go";
import { relativeDate } from "../helpers/relativeDate";
import { useUserData } from "../helpers/useUserData";
import { useLabelsData } from "../helpers/useLabelData";

export default function IssueItem({ 
    title, number, assignee, commentCount, createdBy, createdDate, labels, status 
  }) {

    // Every issue must have a createdBy user, but not every issue has an assignee
    const createdByUser = useUserData(createdBy);
    let assigneeUser;
    if (assignee)
        assigneeUser = useUserData(assignee);
    
    const allLabels = useLabelsData();

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
            {allLabels.isSuccess ?
             labels.map((label) => {
              const issueLabel = allLabels.data.find((l) => l.id === label);
              return (
                <span key={issueLabel.id} className={`label ${issueLabel.color}`}>
                    {issueLabel.name}
                </span>
              )
            }) : null}
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