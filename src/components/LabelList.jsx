import { useLabelsData } from "../helpers/useLabelData";

export default function LabelList({ selected, toggle }) {
  const allLabels = useLabelsData();

  const Label = ({ label }) => {
    const handleClick = () => {
      console.log(`${label.name} clicked`);
      toggle(label.id);
    };
    const isSelectedString = selected.includes(label.id) ? "selected" : "";

    return (
      <li>
        <button className={`${label.color} ${isSelectedString}`} onClick={handleClick}>
          {label.name}
        </button>
      </li>
    );
  }

  return (
    <div className="labels">
      <h3>Labels</h3>
      {
        allLabels.isSuccess ?
        <ul>
          {
            allLabels.data.map((label) => (
              <Label key={label.id} label={label}/>
            ))
          }
        </ul> :
        <p>Loading...</p>
      }
    </div>
  );
}
