import { useLocation } from "preact-iso";

export function Header() {
  const { url } = useLocation();

  return (
    <header>
      <nav>
        <a href="/ui/status" className={url == "/ui/status" && "active"}>
          Status
        </a>
        <a href="/ui/system" className={url == "/ui/system" && "active"}>
          System
        </a>
        <a href="/ui/wifi" className={url == "/ui/wifi" && "active"}>
          WiFi
        </a>
        <a href="/ui/signalk" className={url == "/ui/signalk" && "active"}>
          Signal K
        </a>
        <a
          href="/ui/configuration"
          className={url == "/ui/configuration" && "active"}
        >
          Configuration
        </a>
      </nav>
    </header>
  );
}
