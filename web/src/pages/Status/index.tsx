import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { InfoGroups } from "../../components/InfoGroups";

export function StatusPage() {
  return (
    <div className="StatusPage">
      <Typography variant="h3">Device Status</Typography>
      <Box>
      <Paper elevation={3}>
      <InfoGroups />
      </Paper>
      </Box>
    </div>
  );
}
