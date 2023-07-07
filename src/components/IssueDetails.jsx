import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import IssueHeader from "./IssueHeader";
import CommentList from "./CommentList";

function useIssueData(number) {
  return useQuery(
    ["issues", number ], 
    () => fetch(`/api/issues/${number}`).then((res) => res.json())
  );
}

function useCommentData(number) {
  return useQuery(
    ["issues", number, "comments" ], 
    () => fetch(`/api/issues/${number}/comments`).then((res) => res.json())
  );
}

export default function IssueDetails() {
  const { number } = useParams();
  const { data: issue, isLoading: isIssueLoading } = useIssueData(number);
  const { data: comments, isLoading: isCommentsLoading } = useCommentData(number);

  if (isIssueLoading)
    return <p>Loading...</p>;

  return (
    <div className="issue-details">
      <IssueHeader {...issue} commentCount={ issue.comments?.length || 0 } />
      <main>
        {
          isCommentsLoading ?
            <p>Loading comments...</p> :
            <CommentList comments={comments} />
        }
        <aside>
          Sidebar: TODO
        </aside>
      </main>
    </div>
  );
}
