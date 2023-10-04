import { SignalKSettings } from "src/components/SignalKSettings";
import { PageContents } from "../../components/PageContents";
import { PageHeading } from "../../components/PageHeading";

export function SignalKConfigPage() {
  return (
    <div className="SignalKConfigPage">
      <PageHeading title="Signal K Configuration" />
      <PageContents>
        <SignalKSettings />
      </PageContents>
    </div>
  );
}
