import {
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Collapse,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Paper,
  Select,
  Stack,
  Switch,
  TextField,
  Typography
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { styled } from "@mui/material/styles";

import { useState } from "react";

/**
 * This component is a collapsible accordion with a title in the summary and
 * a radio box at the right end of the summary.
 */
export function WiFiAccordion(props: any) {
  const [expanded, setExpanded] = useState(false);

  const handleExpandedChange = () => {
    setExpanded(!expanded);
  };

  return (
    <Card>
      <CardHeader
        title={props.title}
        subheader={props.description}
        action={<Checkbox onClick={handleExpandedChange} />}
        sx={{ backgroundColor: "#eee" }}
      />
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>{props.children}</CardContent>
      </Collapse>
    </Card>
  );
}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export function WiFiSettings() {
  const [mode, setMode] = useState("AP"); // AP or Client
  const [apSettings, setApSettings] = useState({
    ssid: "",
    passphrase: "",
    channel: "Auto",
    hidden: "No",
  });

  const [clientSettings, setClientSettings] = useState([
    {
      ssid: "",
      passphrase: "",
      dhcp: true,
      ipAddress: "",
      netmask: "",
      gateway: "",
      dnsServer: "",
    },
  ]);

  const handleModeChange = (event) => {
    setMode(event.target.value);
  };

  const handleApSettingsChange = (field) => (event) => {
    setApSettings({ ...apSettings, [field]: event.target.value });
  };

  // Replace this part with real data from scanning WiFi
  const availableNetworks = [
    "Network1",
    "Network2",
    "Network3",
    "Network4",
    "Network11",
    "Network12",
    "Network13",
    "Network14",
  ];

  return (
    <div>
      <Stack spacing={4}>
        <WiFiAccordion
          title="Access Point"
          description="Create a new WiFi network"
        >
          <FormGroup>
            <Stack spacing={2}>
              <TextField
                variant="outlined"
                label="SSID"
                value={apSettings.ssid}
                onChange={handleApSettingsChange("ssid")}
              />
              <TextField
                label="Passphrase"
                value={apSettings.passphrase}
                type="password"
                onChange={handleApSettingsChange("passphrase")}
              />
              <FormControl>
                <InputLabel>Channel</InputLabel>
                <Select
                  value={apSettings.channel}
                  label="Channel"
                  onChange={handleApSettingsChange("channel")}
                >
                  <MenuItem value="Auto">Auto</MenuItem>
                  {[...Array(11).keys()].map((i) => (
                    <MenuItem value={i + 1}>{i + 1}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControlLabel control={<Switch />} label="Hidden" />
            </Stack>
          </FormGroup>
        </WiFiAccordion>

        <WiFiAccordion title="Client" description="Connect to existing WiFi">
          <Grid container spacing={2}>
            <Grid xs={6}>
                <Typography variant="subtitle1">Available Networks</Typography>
              <Paper style={{ maxHeight: 300, overflow: "auto" }}>
                <List>
                  {availableNetworks.map((network) => (
                    <ListItem>
                      <ListItemText primary={network} />
                    </ListItem>
                  ))}
                </List>
              </Paper>
            </Grid>
            <Grid xs={6}> Form </Grid>
          </Grid>
        </WiFiAccordion>
      </Stack>
    </div>
  );
  //  <div>

  //    {mode === "Client" && (
  //      <div style={{ display: "flex", justifyContent: "space-between" }}>
  //        <div>
  //          <h4>Available Networks</h4>
  //          {/* List available networks here, perhaps using Material UI List components */}
  //        </div>
  //        <div>
  //          <h4>Configuration</h4>
  //          {clientSettings.map((setting, index) => (
  //            <div key={index}>{/* Configuration items go here */}</div>
  //          ))}
  //        </div>
  //      </div>
  //    )}
  //  </div>
  //</>
  //);
}
