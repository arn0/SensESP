import { useLocation } from "preact-iso";

export function Header() {
  const { url } = useLocation();

  return (
    <header>
      <nav>
        <a href="/ui/status" className={url == "/ui/status" && "active"}>
          Status
        </a>
        <a href="/ui/network" className={url == "/ui/network" && "active"}>
          Network
        </a>
        <a
          href="/ui/configuration"
          className={url == "/ui/configuration" && "active"}
        >
          Configuration
        </a>
        <a href="/ui/control" className={url == "/ui/control" && "active"}>
          Control
        </a>
        <a href="/404" className={url == "/404" && "active"}>
          404
        </a>
      </nav>
    </header>
  );
}
