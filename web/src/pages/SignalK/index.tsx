import { AppPage } from "pages/AppPage";
import { type JSX } from "preact";
import { PageContents } from "../PageContents";
import { PageHeading } from "../PageHeading";
import { SKStatusProvider } from "./SKStatusContext";
import { SignalKSettingsPanel } from "./SignalKSettingsPanel";

export function SignalKPage(): JSX.Element {
  return (
    <AppPage>
      <PageHeading title="Signal K Configuration" />
      <PageContents>
        <SKStatusProvider>
          <SignalKSettingsPanel />
        </SKStatusProvider>
      </PageContents>
    </AppPage>
  );
}
