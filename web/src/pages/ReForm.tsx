export function ReFormInput(props) {
  return (
    <div>
      <label className="form-label" htmlFor={props.id}>
        {props.label}
      </label>
      <input className="form-control" {...props} />
    </div>
  );
}

export function ReFormFloatInput(props) {
  return (
    <div className="form-floating mb-3">
      <input className="form-control" {...props} />
      <label className="form-label" htmlFor={props.id}>
        {props.label}
      </label>
    </div>
  );
}

export function ReFormSelect(props) {
  return (
    <div className="mb-3">
      <label className="form-label" htmlFor={props.id}>
        {props.label}
      </label>
      <select className="form-select" {...props} />
      {props.children}
    </div>
  );
}

export function ReFormCheck(props) {
  return (
    <div className="form-check mb-3">
      <input className="form-check-input" {...props} />
      <label className="form-check-label" htmlFor={props.id}>
        {props.label}
      </label>
    </div>
  );
}

export function ReFormSwitch(props) {
  return (
    <div className="form-check form-switch mb-3">
      <input className="form-check-input" role="switch" {...props} />
      <label className="form-check-label" htmlFor={props.id}>
        {props.label}
      </label>
    </div>
  );
}
