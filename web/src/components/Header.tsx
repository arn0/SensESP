import { RouteInstruction } from "App";
import { type JSX } from "preact";
import { useLocation } from "preact-iso";

type HeaderProps = {
  routes: RouteInstruction[];
};

function RouteLink({ route }: { route: RouteInstruction }): JSX.Element {
  const { url } = useLocation();

  return (
    <li className="nav-item">
      <a
        href={route.path}
        className={`nav-link${
          url === route.path ? " active" : " link-body-emphasis"
        }`}
      >
        {route.name}
      </a>
    </li>
  );
}

export function Header({ routes }: HeaderProps): JSX.Element {
  return (
    <>
      <header className="navbar navbar-expand d-flex flex-wrap justify-content-center bg-body-secondary">
        <div className="container px-3">
          <a
            href="/"
            className="navbar-brand d-flex align-items-center mb-0 ms-2 me-4 text-decoration-none"
          >
            <img
              src="/SensESP_logo_symbol.svg"
              width="45"
              height="34"
              alt="SensESP logo"
              className="d-inline-block align-items-center"
            />
          </a>
          <nav className="navbar-nav mb-0">
            <ul className="nav nav-pills">
              {routes.map((route) => (
                <RouteLink key={route.path} route={route} />
              ))}
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
}
