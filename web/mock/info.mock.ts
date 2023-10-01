import { defineMock } from 'vite-plugin-mock-dev-server'

export default defineMock(
  [
    {
      url: '/info',
      body: {
        items: [
          {
            "name": "Build date",
            "value": "Apr 29 2022 12:34:26",
            "group": "Software",
            "order": 2000
          },
          {
            "name": "Hostname",
            "value": "asyncnew",
            "group": "Network",
            "order": 500
          },
          {
            "name": "MAC Address",
            "value": "94:3C:C6:9A:xx:xx",
            "group": "Network",
            "order": 1100
          },
          {
            "name": "SK connection status",
            "value": "Connected",
            "group": "Network",
            "order": 1600
          },
          {
            "name": "SSID",
            "value": "Sensors",
            "group": "Network",
            "order": 1200
          },
          {
            "name": "SenseESP version",
            "value": "2.4.2-alpha",
            "group": "Software",
            "order": 1900
          },
          {
            "name": "Signal K server address",
            "value": "",
            "group": "Network",
            "order": 1400
          },
          {
            "name": "Signal K server port",
            "value": 0,
            "group": "Network",
            "order": 1500
          },
          {
            "name": "WiFi signal strength",
            "value": -45,
            "group": "Network",
            "order": 1300

          }
        ]
      }
    }
  ]
);
