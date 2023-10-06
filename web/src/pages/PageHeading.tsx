interface PageHeadingProps {
  title: string;
  subtitle?: string;
}

export function PageHeading(props: PageHeadingProps) {
  return <h1 class="display-6">{props.title}</h1>;
}
