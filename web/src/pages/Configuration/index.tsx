import { ConfigCards } from "../../components/ConfigCards";
import { PageContents } from "../../components/PageContents";
import { PageHeading } from "../../components/PageHeading";

export function Configuration() {
    return (
      <div className="ConfigurationPage">
        <PageHeading title="Configuration" />
        <PageContents>
          <ConfigCards />
        </PageContents>
      </div>
    );
  }
