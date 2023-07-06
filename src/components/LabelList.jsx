import { useLabelsData } from "../helpers/useLabelData";

export default function LabelList({ selected, toggle }) {
  const { data: allLabels, isLoading } = useLabelsData();

  const Label = ({ label }) => {
    const isSelectedString = selected.includes(label.id) ? "selected" : "";

    return (
      <li>
        <button 
          className={`${label.color} ${isSelectedString}`} 
          onClick={() => toggle(label.id)}
        >
          {label.name}
        </button>
      </li>
    );
  }

  return (
    <div className="labels">
      <h3>Labels</h3>
      {
        isLoading ?
        <p>Loading...</p> :
        <ul>
          {
            allLabels.map((label) => (
              <Label key={label.id} label={label}/>
            ))
          }
        </ul>
      }
    </div>
  );
}
