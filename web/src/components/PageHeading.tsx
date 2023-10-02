import Typography from "@mui/material/Typography";

interface PageHeadingProps {
  title: string;
  subtitle?: string;
}

export function PageHeading(props: PageHeadingProps) {
  return (
    <Typography variant="h4" mt={2} mb={2}>
      {props.title}
    </Typography>
  );
}
