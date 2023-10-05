import Collapse from "bootstrap/js/dist/collapse";
import { useEffect } from "preact/hooks";

type ReCollapseProps = {
  id: string;
  children: React.ReactNode;
  isCollapsed: boolean;
};

/**
 * Renders a collapsible component that can be triggered to show or hide its content.
 * @param {string} id - The id of the collapsible component.
 * @param {React.ReactNode} children - The content to be displayed inside the collapsible component.
 * @param {boolean} isCollapsed - Determines whether the collapsible component should be collapsed or expanded.
 * @returns {JSX.Element} - The collapsible component.
 */
export function ReCollapse({ id, children, isCollapsed }: ReCollapseProps): JSX.Element {
  useEffect(() => {
    const collapseEl = document.getElementById(id);
    const bsCollapse = new Collapse(collapseEl, {toggle: false});
    isCollapsed ? bsCollapse.hide() : bsCollapse.show();
  });

  return (
    <div className="collapse" id={id}>
      {children}
    </div>
  );
}
