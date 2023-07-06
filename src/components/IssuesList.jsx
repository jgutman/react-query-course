import { useQuery } from "@tanstack/react-query";
import IssueItem from "./IssueItem";

export default function IssuesList({ selected }) {
  const { data: issues, isLoading } = useQuery(
    ["issues"], 
    () => fetch("/api/issues").then((res) => res.json())
  );
  console.log(`Filtering issues by labels: ${selected}`);
  let filteredIssues = issues;

  if (issues && selected.length > 0) {
    filteredIssues = issues.filter((issue) => {
      return selected.some((label) => issue.labels.includes(label));
    });
  }

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
