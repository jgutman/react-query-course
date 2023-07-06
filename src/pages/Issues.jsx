import { useState } from "react";

import IssuesList from "../components/IssuesList";
import LabelList from "../components/LabelList";
import StatusList from "../components/StatusList";

export default function Issues() {
  const [selectedLabels, setSelectedLabels] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("");

  const toggleLabel = (label) => { 
    setSelectedLabels((prev) => {
      // if already selected, unselect it by removing from list
      if (prev.includes(label)) {
        return prev.filter((id) => id !== label);
      // otherwise, select it by adding to the list
      } else {
        // We can eliminate some unnecessary re-queries by sorting the labels
        return [...prev, label].toSorted();
      }
    });
  }

  return (
    <div>
      <main>
        <section>
          <IssuesList labels={selectedLabels} status={selectedStatus}/>
        </section>
        <aside>
          <LabelList 
            selected={selectedLabels} 
            toggle={toggleLabel} 
          />
          <h3>Status</h3>
          <StatusList 
            selected={selectedStatus} 
            onChange={(event) => setSelectedStatus(event.target.value)}
          />
        </aside>
      </main>
    </div>
  );
}
