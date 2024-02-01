import {
  InputDirtyContext,
  InputDirtyContextType,
} from "common/InputDirtyContext";
import { type JSX } from "preact";
import { useContext } from "preact/hooks";

interface FormInputProps {
  id: string;
  label: string;
  type?: string;
  as?: string;
  placeholder?: string;
  readOnly?: boolean;
  value?: string | number;
  step?: number;
  disabled?: boolean;
  checked?: boolean;
  onchange?: (e: JSX.TargetedEvent<HTMLInputElement, Event>) => void;
}

export function FormInput(props: FormInputProps): JSX.Element {
  const { isInputDirty, setInputDirty } =
    useContext<InputDirtyContextType>(InputDirtyContext);
  return (
    <div>
      <label className="form-label" htmlFor={props.id}>
        {props.label}
      </label>

      {props.as === "textarea" ? (
        <textarea
          className="form-control"
          onChange={() => setInputDirty(true)}
          {...props}
        />
      ) : (
        <input
          className="form-control"
          onChange={() => setInputDirty(true)}
          {...props}
        />
      )}
    </div>
  );
}

interface FormFloatInputProps {
  id: string;
  label: string;
}

export function FormFloatInput(props: FormFloatInputProps): JSX.Element {
  const { isInputDirty, setInputDirty } =
    useContext<InputDirtyContextType>(InputDirtyContext);

  return (
    <div className="form-floating mb-3">
      <input
        className="form-control"
        onChange={() => setInputDirty(true)}
        {...props}
      />
      <label className="form-label" htmlFor={props.id}>
        {props.label}
      </label>
    </div>
  );
}

interface FormSelectProps {
  id: string;
  label: string;
  children: React.ReactNode;
}

export function FormSelect(props: FormSelectProps): JSX.Element {
  const { isInputDirty, setInputDirty } =
    useContext<InputDirtyContextType>(InputDirtyContext);

  return (
    <div className="mb-3">
      <label className="form-label" htmlFor={props.id}>
        {props.label}
      </label>
      <select
        className="form-select"
        onChange={() => setInputDirty(true)}
        {...props}
      />
      {props.children}
    </div>
  );
}

interface FormCheckProps {
  id: string;
  name: string;
  type: string;
  checked: boolean;
  label: string;
  onchange: (e: JSX.TargetedEvent<HTMLInputElement, Event>) => void;
}

export function FormCheck(props: FormCheckProps): JSX.Element {
  const { isInputDirty, setInputDirty } =
    useContext<InputDirtyContextType>(InputDirtyContext);

  return (
    <div className="form-check">
      <input
        className="form-check-input"
        onChange={() => setInputDirty(true)}
        {...props}
      />
      <label className="form-check-label" htmlFor={props.id}>
        {props.label}
      </label>
    </div>
  );
}

export function FormSwitch(
  props: JSX.IntrinsicAttributes & JSX.HTMLAttributes<HTMLInputElement>,
): JSX.Element {
  const { isInputDirty, setInputDirty } =
    useContext<InputDirtyContextType>(InputDirtyContext);

  // Extend props.onChange (if it exists) to set the dirty flag
  if (props.onChange) {
    const onChange = props.onChange;
    props.onChange = (e) => {
      setInputDirty(true);
      onChange(e);
    };
  }

  return (
    <div className="form-check form-switch mb-3">
      <input
        className="form-check-input"
        role="switch"
        {...props}
      />
      <label className="form-check-label" htmlFor={props.id}>
        {props.label}
      </label>
    </div>
  );
}
