import FormControl from "@mui/material/FormControl";
import { PageContents } from "../../components/PageContents";
import { PageHeading } from "../../components/PageHeading";
import { WiFiSettings } from "../../components/WiFiSettings";

export function Network() {
  return (
    <div className="Network">
      <PageHeading title="Network Configuration" />
      <PageContents>
        <FormControl fullWidth>
          <WiFiSettings />
        </FormControl>
      </PageContents>
    </div>
  );
}
