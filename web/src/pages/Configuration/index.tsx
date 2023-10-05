import { AppPage } from "pages/AppPage";
import { PageContents } from "../PageContents";
import { PageHeading } from "../PageHeading";
import { ConfigCards } from "./ConfigCards";

export function ConfigurationPage() {
  return (
    <AppPage>
      <PageHeading title="Configuration" />
      <PageContents>
        <ConfigCards />
      </PageContents>
    </AppPage>
  );
}
