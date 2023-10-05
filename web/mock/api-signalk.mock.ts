import { defineMock } from 'vite-plugin-mock-dev-server'

export default defineMock(
  [
    {
      url: '/api/signalk/status',
      delay: 800,
      method: 'GET',
      body: () => {
        const status_choices = [
          "connected",
          "disconnected",
          "connecting",
          "unknown",
          "unauthorized",
          "error",
          "authenticating",
        ];
        const random_status = status_choices[
          Math.floor(Math.random() * status_choices.length)
        ];
        // create rx and tx deltas with random values between 0 and 100000
        const random_rx_deltas = Math.floor(Math.random() * 100000);
        const random_tx_deltas = Math.floor(Math.random() * 100000);
        const data = {
          connection_status: random_status,
          num_rx_deltas: random_rx_deltas,
          num_tx_deltas: random_tx_deltas,
        };
        return data;
      }
    },
  ]
);
