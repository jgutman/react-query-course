import { useLabelsData } from "../helpers/useLabelData";

export default function LabelList({ selected, toggle }) {
  
  const Label = ({ label }) => {
    const isSelectedString = selected.includes(label.id) ? "selected" : "";
    
    // The issues query API appears to expect the label name, not the label id
    return (
      <li>
        <button 
          className={`${label.color} ${isSelectedString}`} 
          onClick={() => toggle(label.name)}
        >
          {label.name}
        </button>
      </li>
    );
  }

  const { data: allLabels, isLoading } = useLabelsData();

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
