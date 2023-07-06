import { useQuery } from "@tanstack/react-query";
import IssueItem from "./IssueItem";

export default function IssuesList({ selected }) {
  const { data: filteredIssues, isLoading } = useQuery(
    ["issues", { selected }], 
    () => {
      // Instead of querying for all issues, we can query for only the issues that have the selected labels
      // Then we don't have to filter out the returned results
      const queryString = selected.map((label) => `labels[]=${label}`).join("&");
      return fetch(`/api/issues?${queryString}`).then((res) => res.json())
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
              title={issue.title}
              number={issue.number}
              assignee={issue.assignee}
              commentCount={issue.comments.length}
              createdBy={issue.createdBy}
              createdDate={issue.createdDate}
              labels={issue.labels}
              status={issue.status}
            />
          )}
        </ul>
      } 
    </div>
  );
}
