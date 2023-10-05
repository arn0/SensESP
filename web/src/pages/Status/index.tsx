import { PageContents } from "../PageContents";
import { PageHeading } from "../PageHeading";
import { InfoGroups } from "./InfoGroups";

export function StatusPage() {
  return (
    <div className="StatusPage">
      <PageHeading title="Device Status" />
      <PageContents>
        <InfoGroups />
      </PageContents>
    </div>
  );
}
