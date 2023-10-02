import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { InfoGroups } from "../../components/InfoGroups";
import { PageHeading } from "../../components/PageHeading";
import { PageContents } from "../../components/PageContents";

export function StatusPage() {
  return (
    <div className="StatusPage">
      <PageHeading title="Device Status" />
      <PageContents>
        <InfoGroups />
      </PageContents>
    </div>
  );
}
