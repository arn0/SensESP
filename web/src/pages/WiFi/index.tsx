import { PageContents } from "../PageContents";
import { PageHeading } from "../PageHeading";
import { WiFiSettings } from "./WiFiSettings";

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
