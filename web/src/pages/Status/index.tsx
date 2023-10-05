import { AppPage } from "pages/AppPage";
import { PageContents } from "../PageContents";
import { PageHeading } from "../PageHeading";
import { InfoGroups } from "./InfoGroups";

export function StatusPage() {
  return (
    <AppPage>
      <PageHeading title="Device Status" />
      <PageContents>
        <InfoGroups />
      </PageContents>
    </AppPage>
  );
}
