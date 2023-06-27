import { useQuery } from "@tanstack/react-query";
import { IssueItem } from "./IssueItem";

export default function IssuesList() {
  const { data: issues, isLoading } = useQuery(
    ["issues"], 
    () => fetch("/api/issues").then((res) => res.json())
  );
  
  if (!isLoading)
    console.log(issues);

  return (
    <div>
      <h2>Issues List</h2>
      {isLoading ? 
        <p>Loading...</p> :
        <ul className="issues-list">
          {issues.map((issue) => 
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
