import { SignalKSettings } from "components/SignalKSettings";
import { PageContents } from "components/PageContents";
import { PageHeading } from "components/PageHeading";
import { SKStatusProvider } from "components/SKStatusContext";

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
