import { PageContents } from "../PageContents";
import { PageHeading } from "../PageHeading";
import { SKStatusProvider } from "./SKStatusContext";
import { SignalKSettings } from "./SignalKSettings";

export const SignalKPage = () => {
  return (
    <div className="SignalKConfigPage">
      <SKStatusProvider>
        <PageHeading title="Signal K Configuration" />
        <PageContents>
          <SignalKSettings />
        </PageContents>
      </SKStatusProvider>
    </div>
  );
};
