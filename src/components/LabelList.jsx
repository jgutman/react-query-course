import { useLabelsData } from "../helpers/useLabelData";

export default function LabelList() {
  const allLabels = useLabelsData();

  if (allLabels.isSuccess)
    console.log(allLabels.data);

  return (
    <div className="labels">
      <h3>Labels</h3>
      {
        allLabels.isSuccess ?
        <ul>
          {
            allLabels.data.map((label) => (
              <li key={label.id}>
                <button class={label.color}>
                  {label.name}
                </button>
              </li>
            ))
          }
        </ul> :
        null
      }
    </div>
  );
}
