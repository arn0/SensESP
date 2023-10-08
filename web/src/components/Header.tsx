import { useLocation } from "preact-iso";

export function Header() {
  const { url } = useLocation();

  return (
    <header>
      <nav>
        <a href="/status" className={url == "/status" && "active"}>
          Status
        </a>
        <a href="/system" className={url == "/system" && "active"}>
          System
        </a>
        <a href="/wifi" className={url == "/wifi" && "active"}>
          WiFi
        </a>
        <a href="/signalk" className={url == "/signalk" && "active"}>
          Signal K
        </a>
        <a
          href="/configuration"
          className={url == "/configuration" && "active"}
        >
          Configuration
        </a>
      </nav>
    </header>
  );
}
