import { useQuery } from "@tanstack/react-query";
import IssueItem from "./IssueItem";

export default function IssuesList({ search, labels, status }) {
  const { data: filteredIssues, isLoading } = useQuery(
    ["issues", { labels, status }], 
    () => {
      // Instead of querying for all issues, we can query for only the issues that have 
      // the selected labels and the selected status
      // That way we don't have to filter out the returned results
      const labelsQuery = labels.map((label) => `labels[]=${label}`).join("&");
      const statusQuery = status ? `&status=${status}` : "";
      return fetch(`/api/issues?${labelsQuery}${statusQuery}`).then((res) => res.json())
    },
    { enabled: !search } // only query if we're not searching, otherwise we'll use the search query
  );

  const { data: searchedIssues, isLoading: isSearching } = useQuery(
    ["issues", "search", { search }],
    // note that the search API is case-sensitive for some reason
    () => fetch(`/api/search/issues?q=${search}`).then((res) => res.json()),
    { enabled: !!search }
  )

  const makeIssueItem = (issue) => (
    <IssueItem key={issue.id} commentCount={issue.comments.length} {...issue} />
  );

  if (search) {
    return (
      <>
        <h2>Search Results</h2>
        {
          isSearching ?
            <p>Loading...</p> :
            <>
              <p>{searchedIssues.count} Results</p>
              <ul className="issues-list">
              {searchedIssues.items.map(makeIssueItem)}
              </ul>
            </>
        }
      </>
    );
  } else 
    return (
      <>
        <h2>Issues List</h2>
        { 
          isLoading ?
            <p>Loading...</p> :
            <ul className="issues-list">
              {filteredIssues.map(makeIssueItem)}
            </ul>
        } 
      </>
    );
}