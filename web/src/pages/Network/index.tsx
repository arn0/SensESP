import { PageContents } from "../../components/PageContents";
import { PageHeading } from "../../components/PageHeading";
import { WiFiSettings } from "../../components/WiFiSettings";

export function Network() {
  return (
    <div className="Network">
      <PageHeading title="Network Configuration" />
      <PageContents>
          <WiFiSettings />
      </PageContents>
    </div>
  );
}
