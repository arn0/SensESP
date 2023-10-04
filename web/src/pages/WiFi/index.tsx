import { PageContents } from "../../components/PageContents";
import { PageHeading } from "../../components/PageHeading";
import { WiFiSettings } from "../../components/WiFiSettings";

export function WiFiConfigPage() {
  return (
    <div className="WiFiConfigPage">
      <PageHeading title="WiFi Configuration" />
      <PageContents>
          <WiFiSettings />
      </PageContents>
    </div>
  );
}
