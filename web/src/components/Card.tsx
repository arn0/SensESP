import { ReactNode, useId } from "preact/compat";
import { Collapse } from "./Collapse";

export function Card({ title, children }) {
  return (
    <div className="card">
      <div className="card-header">{title}</div>
      <div className="card-body">{children}</div>
    </div>
  );
}

type ButtonCardProps = {
  title: string;
  buttonText: string;
  buttonVariant?: string;
  isButtonEnabled: boolean;
  onClick: () => void;
  children: ReactNode;
};

export function ButtonCard({
  title,
  buttonText,
  buttonVariant = "primary",
  isButtonEnabled,
  onClick,
  children,
}: ButtonCardProps) {
  return (
    <Card title={title}>
      {children}
      <button
        type="button"
        className={`btn btn-${buttonVariant} mt-3`}
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

export function ButtonTitle({ title, description }: ButtonTitleProps) {
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

/**
 * Render a collapsible card component that can be triggered to show or hide its content.
 *
 * The collapse behavior is controlled by a checkbox in the card header.
 */

export function CollapseCard({ id, title, children, expanded, setExpanded }) {
  return (
    <div className="card">
      <div className="card-header justify-content-between align-items-start">
        <div className="d-flex">
          <div className="me-auto">
            <div className="card-title">{title}</div>
          </div>
          <div className="col-auto">
            <CheckToggle expanded={expanded} setExpanded={setExpanded} />
          </div>
        </div>
      </div>
      <Collapse id={id} expanded={expanded}>
        <div className="card-body">{children}</div>
      </Collapse>
    </div>
  );
}

function CheckToggle({ expanded, setExpanded }) {
  const id = useId();

  return (
    <div>
      <input
        className="form-check-input"
        type="checkbox"
        value=""
        id={id}
        checked={expanded}
        onClick={() => setExpanded(!expanded)}
      />
    </div>
  );
}
