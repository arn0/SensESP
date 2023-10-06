export function Card({ title, children }) {
  return (
    <div className="card">
      <div className="card-header">{title}</div>
      <div className="card-body">{children}</div>
    </div>
  );
}

export function ButtonCard({
  title,
  buttonText,
  isButtonEnabled,
  onClick,
  children,
}) {
  return (
    <Card title={title}>
      {children}
      <button
        type="button"
        className="btn btn-primary mt-3"
        disabled={!isButtonEnabled}
        onClick={onClick}
      >
        {buttonText}
      </button>
    </Card>
  );
}

type ButtonTitleProps = {
  title: string;
  description?: string;
};

export function ButtonTitle({ title, description } : ButtonTitleProps) {
  return (
    <>
      <strong>{title}</strong>
      {description && (
        <>
          <br /> <small>{description}</small>
        </>
      )}
      <p>{description}</p>
    </>
  );
}
