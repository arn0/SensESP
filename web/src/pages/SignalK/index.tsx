import { AppPage } from "pages/AppPage";
import { PageContents } from "../PageContents";
import { PageHeading } from "../PageHeading";
import { SKStatusProvider } from "./SKStatusContext";
import { SignalKSettingsPanel } from "./SignalKSettingsPanel";

export const SignalKPage = () => {
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
};
