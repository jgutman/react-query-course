import { possibleStatus } from "../helpers/defaultData";

export default function StatusList({ selected, onChange }) {
    return (
        <select className="status-select" value={selected} onChange={onChange}>
            <option value="">Select a status to filter</option>
            {
                possibleStatus.map((status) => (
                    <option key={status.id} value={status.id}>{status.label}</option>
                ))
            }
        </select>
    )
};
  