interface PageHeadingProps {
  title: string;
  subtitle?: string;
}

export function PageHeading(props: PageHeadingProps) {
  return (
    <h1 class="ms-3 display-6">{props.title}</h1>
  );
}
