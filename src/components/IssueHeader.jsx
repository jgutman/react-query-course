import { possibleStatus } from "../helpers/defaultData";
import { relativeDate } from "../helpers/relativeDate";
import { useUserData } from "../helpers/useUserData";
import { GoIssueOpened, GoIssueClosed } from "react-icons/go";

export default function IssueHeader({ 
        title, number, status, createdBy, createdDate, commentCount 
    }) {
    const isDone = status == "done" || status == "cancelled";
    const statusLabel = possibleStatus.find((statusObj) => statusObj.id === status).label;
    const createdByUser = useUserData(createdBy);

    return (
        <header>
        <h2>
          {title} <span>#{number}</span>
        </h2>
        <div>
          <span className={isDone ? "closed" : "open"}>
            {isDone ? <GoIssueClosed/> : <GoIssueOpened/>}
            {statusLabel}
          </span>

          <span className="created-by">
            { createdByUser.isSuccess ? 
                createdByUser.data.name :
                null 
            }
          </span>
          opened this issue {relativeDate(createdDate)} · {commentCount} comments
        </div>
      </header>
    )
}