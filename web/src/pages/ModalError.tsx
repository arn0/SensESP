import { Modal } from "bootstrap";
import { useEffect } from "preact/hooks";

export function ModalError({ id, title, children, show, onHide }) {
  console.log("ModalError:", id, title, children, show, onHide);

  if (show) {
    useEffect(() => {
      const modal = Modal.getOrCreateInstance("#" + id);
      modal.show();
    });
  }

  return (
    <>
      <div id={id} class="modal fade" role="dialog" tabindex={-1}>
        <div class="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{title}</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                onClick={onHide}
              ></button>
            </div>
            <div className="modal-body">{children}</div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={onHide}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
