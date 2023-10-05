import { AppPage } from "pages/AppPage";
import { PageContents } from "../PageContents";
import { PageHeading } from "../PageHeading";
import { WiFiSettings } from "./WiFiSettings";

export function WiFiConfigPage() {
  return (
    <AppPage>
      <PageHeading title="WiFi Configuration" />
      <PageContents>
        <WiFiSettings />
      </PageContents>
    </AppPage>
  );
}
