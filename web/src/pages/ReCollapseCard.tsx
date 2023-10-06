import Collapse from "bootstrap/js/dist/collapse";
import { useEffect, useId } from "preact/hooks";

type ReCollapseProps = {
  id: string;
  children: React.ReactNode;
  expanded: boolean;
};

/**
 * Renders a collapsible component that can be triggered to show or hide its content.
 * @param {string} id - The id of the collapsible component.
 * @param {React.ReactNode} children - The content to be displayed inside the collapsible component.
 * @param {boolean} expanded - Determines whether the collapsible component should be collapsed or expanded.
 * @returns {JSX.Element} - The collapsible component.
 */
export function ReCollapse({
  id,
  children,
  expanded,
}: ReCollapseProps): JSX.Element {

  console.log("ReCollapse: id=" + id + ", expanded=" + expanded)

  useEffect(() => {
    const collapseEl = document.getElementById(id);
    const bsCollapse = new Collapse(collapseEl, { toggle: false });
    expanded ? bsCollapse.show() : bsCollapse.hide();
  });

  return (
    <div className="collapse" id={id}>
      {children}
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

/**
 * Render a collapsible card component that can be triggered to show or hide its content.
 *
 * The collapse behavior is controlled by a checkbox in the card header.
 */
export function CollapseCard({
  id,
  title,
  children,
  expanded,
  setExpanded,
}) {

  console.log("CollapseCard: id=" + id + ", expanded=" + expanded)

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
      <ReCollapse id={id} expanded={expanded}>
        <div className="card-body">{children}</div>
      </ReCollapse>
    </div>
  );
}
