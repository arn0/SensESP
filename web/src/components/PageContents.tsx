import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

export function PageContents(props: any) {
  return (
    <Box>

        {props.children}

    </Box>
  );
}
