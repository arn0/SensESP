import { AppPage } from "pages/AppPage";
import { PageContents } from "../PageContents";
import { PageHeading } from "../PageHeading";
import { WiFiSettingsPanel } from "./WiFiSettingsPanel";

export function WiFiConfigPage() {
  return (
    <AppPage>
      <PageHeading title="WiFi Configuration" />
      <PageContents>
        <WiFiSettingsPanel />
      </PageContents>
    </AppPage>
  );
}
