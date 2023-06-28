import IssuesList from "../components/IssuesList";
import LabelList from "../components/LabelList";

export default function Issues() {
  return (
    <div>
      <main>
        <section>
          <IssuesList />
        </section>
        <aside>
          <LabelList />
        </aside>
      </main>
    </div>
  );
}
