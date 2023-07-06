import IssuesList from "../components/IssuesList";
import LabelList from "../components/LabelList";
import { useState } from "react";

export default function Issues() {
  const [selectedLabels, setSelectedLabels] = useState([]);

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
          <IssuesList selected={selectedLabels} />
        </section>
        <aside>
          <LabelList selected={selectedLabels} toggle={toggleLabel} />
        </aside>
      </main>
    </div>
  );
}
