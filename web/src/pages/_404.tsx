import { AppPage } from "./AppPage";
import { PageContents } from "./PageContents";
import { PageHeading } from "./PageHeading";

export function NotFound() {
  return (
    <AppPage>
    <PageHeading title="&nbsp;" />
    <PageContents>
    <h1>404: Not Found</h1>
      <p>Sorry!</p>
    </PageContents>
  </AppPage>
  );
}
