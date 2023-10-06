import { useId } from "react";

export function NetworkList({ selectedNetwork, setSelectedNetwork }) {
  const id = useId();

  // Replace this part with real data from scanning WiFi
  const availableNetworks = [
    { name: "Network 1", strength: -20 },
    { name: "Network 2", strength: -31 },
    { name: "Network 3", strength: -43 },
    { name: "Network 4", strength: -19 },
    { name: "Network 11", strength: -7 },
    { name: "Network 12", strength: -21 },
    { name: "Network 13", strength: -66 },
    { name: "Network 18", strength: -45 },
    { name: "Network 19", strength: -2 },
    { name: "Network 28", strength: -84 },
    { name: "Network 26", strength: -23 },
    { name: "Network 25", strength: -33 },
    { name: "Network 21", strength: -14 },
    { name: "Network 22", strength: -16 },
    { name: "Network 23", strength: -27 },
    { name: "Network 24", strength: -72 },
  ];

  const sortedNetworks = availableNetworks.sort(
    (a, b) => b.strength - a.strength
  );

  return (
    <ul
      className="list-group"
      id={id + "-networks"}
      style={{ maxHeight: "400px" }}
    >
      {sortedNetworks.map((network) => (
        <NetworkListItem
          name={network.name}
          strength={network.strength}
          active={network.name === selectedNetwork}
          setActive={() => setSelectedNetwork(network.name)} />
      ))}
    </ul>
  );

  function NetworkListItem({ name, strength, active, setActive }) {
    function handleSelect(event) {
      event.target.active = true;
      setActive();
    }

    return (
      <li
        className={"list-group-item d-flex justify-content-between align-items-start" +
          (active ? " active" : "")}
        id={name}
        onClick={handleSelect}
      >
        <div class="ms-2 me-auto">{name}</div>
        <div style={{ fontSize: "smaller" }}> {strength}</div>
      </li>
    );
  }
}
