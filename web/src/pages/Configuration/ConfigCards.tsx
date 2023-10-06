import { app_config } from "app_config";
import { useState } from "preact/hooks";
import { ConfigCard } from "./ConfigCard";

const updateCards = async () => {
  try {
    const response = await fetch(app_config.config_path);
    if (!response.ok) {
      throw new Error(`HTTP Error ${response.status} ${response.statusText}`);
    }
    const data = await response.json();

    const items = data["key"];
    return items;
  } catch (e) {
    console.log("Error getting config data from server", e);
  }
};

export function ConfigCards() {
  const [cards, setCards] = useState([]);

  const updateFunc = async () => {
    const items = await updateCards();
    setCards(items);
  };

  if (cards === null || cards.length === 0) {
    updateFunc();

    // Display a spinner while waiting for data. Center the spinner
    // in the page.
    return (
      <div
        class="d-flex align-items-center justify-content-center min"
        style="height: 100vh"
      >
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="vstack gap-4">
      {cards.map((card) => (
        <ConfigCard path={card} />
      ))}
    </div>
  );
}
