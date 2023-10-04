import { defineMock } from 'vite-plugin-mock-dev-server'

export default defineMock(
  [
    {
      url: '/config',
      method: 'GET',
      body: {
        key: [
          "/System/WiFi Settings",
          "/System/Signal K Settings",
          "/Transforms/Linear"
        ]
      },
      delay: 800,
    },
    {
      url: '/config/System/Signal K Settings',
      method: 'GET',
      body: {
        "config": {
          "sk_address": "",
          "sk_port": 0,
          "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkZXZpY2UiOiI0NTMxODliOC04NzNkLTkxMzUtNDFjYy1jYzFjMzg4ZWU1YzUiLCJpYXQiOjE2NTA4OTg3MjB9.5ENWogKknEbHf9Ppc-xl5zgJvBrzy0WcIH0tyymcfVg",
          "client_id": "453189b8-873d-9135-41cc-cc1c388ee5c5",
          "polling_href": ""
        },
        "schema": {
          "type": "object",
          "properties": {
            "sk_address": {
              "title": "Signal K server address (readonly)",
              "type": "string",
              "readOnly": true
            },
            "sk_port": {
              "title": "Signal K server port (readonly)",
              "type": "integer",
              "readOnly": true
            },
            "client_id": {
              "title": "Client ID  (readonly)",
              "type": "string",
              "readOnly": true
            },
            "token": {
              "title": "Server authorization token (readonly)",
              "type": "string",
              "readOnly": true
            },
            "polling_href": {
              "title": "Server authorization polling href (readonly)",
              "type": "string",
              "readOnly": true
            }
          }
        },
        "description": ""
      },
      delay: 600,
    },
    {
      url: '/config/System/WiFi Settings',
      method: 'GET',
      body: {
        "config": {
          "hostname": "asyncnew",
          "default_hostname": "asyncnew",
          "ssid": "Hat Labs Sensors",
          "password": "kanneluuri2406"
        },
        "schema": {
          "type": "object",
          "properties": {
            "ssid": {
              "title": "WiFi SSID",
              "type": "string"
            },
            "password": {
              "title": "WiFi password",
              "type": "string",
              "format": "password"
            },
            "hostname": {
              "title": "Device hostname",
              "type": "string"
            }
          }
        },
        "description": ""
      },
      delay: 1200,
    },
    {
      url: '/config/Transforms/Linear',
      method: 'GET',
      body: {
        "config": {
          "offset": 0,
          "multiplier": 1,
          "value": 80.20713806
        },
        "schema": {
          "type": "object",
          "properties": {
            "multiplier": {
              "title": "Multiplier",
              "type": "number",
              "readOnly": false
            },
            "offset": {
              "title": "Constant offset",
              "type": "number",
              "readOnly": false
            },
            "value": {
              "title": "Last value",
              "type": "number",
              "readOnly": true
            }
          }
        },
        "description": "Linear transform custom description"
      },
      delay: 400,
    },
  ]
)
