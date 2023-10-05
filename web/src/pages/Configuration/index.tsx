import { PageContents } from "../PageContents";
import { PageHeading } from "../PageHeading";
import { ConfigCards } from "./ConfigCards";

export function ConfigurationPage() {
  return (
    <div className="ConfigurationPage">
      <PageHeading title="Configuration" />
      <PageContents>
        <ConfigCards />
      </PageContents>
    </div>
  );
}
