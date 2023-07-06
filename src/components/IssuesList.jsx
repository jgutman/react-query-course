import { useQuery } from "@tanstack/react-query";
import IssueItem from "./IssueItem";

export default function IssuesList({ labels, status }) {
  const { data: filteredIssues, isLoading } = useQuery(
    ["issues", { labels, status }], 
    () => {
      // Instead of querying for all issues, we can query for only the issues that have 
      // the selected labels and the selected status
      // That way we don't have to filter out the returned results
      const labelsQuery = labels.map((label) => `labels[]=${label}`).join("&");
      const statusQuery = status ? `&status=${status}` : "";
      return fetch(`/api/issues?${labelsQuery}${statusQuery}`).then((res) => res.json())
    }
  );

  return (
    <div>
      <h2>Issues List</h2>
      {isLoading ? 
        <p>Loading...</p> :
        <ul className="issues-list">
          {filteredIssues.map((issue) => 
            <IssueItem 
              key={issue.id} 
              commentCount={issue.comments.length}
              {...issue}
            />
          )}
        </ul>
      } 
    </div>
  );
}
