import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import IssueHeader from "./IssueHeader";

function useIssueData(number) {
  return useQuery(
    ["issues", number ], 
    () => {
      // Instead of querying for all issues, we can query for only the issues that have 
      // the selected labels and the selected status
      // That way we don't have to filter out the returned results
      return fetch(`/api/issues/${number}`).then((res) => res.json())
    }
  );
}

export default function IssueDetails() {
  const { number } = useParams();
  const { data: issue, isLoading } = useIssueData(number);

  if (isLoading)
    return <p>Loading...</p>;

  console.log(issue);

  return (
    <div className="issue-details">
      <IssueHeader {...issue} commentCount={ issue.comments.length } />
    </div>
  );
}
