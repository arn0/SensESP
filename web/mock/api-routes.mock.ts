import { defineMock } from 'vite-plugin-mock-dev-server'
import { readFile } from 'fs/promises'

export default defineMock(
  [
    {
      url: '/api/routes',
      method: 'GET',
      body: [
        { name: "Status", path: "/status", componentName: "StatusPage" },
        { name: "System", path: "/system", componentName: "SystemPage" },
        { name: "WiFi", path: "/wifi", componentName: "WiFiConfigPage" },
        { name: "Signal K", path: "/signalk", componentName: "SignalKPage" },
        { name: "Configuration", path: "/configuration", componentName: "ConfigurationPage" },
        { name: "SensESP Plugin", path: "/sensesp-plugin", componentName: "SensESPPluginPage", loadPath: "/api/plugins/sensesp-plugin.js" },
      ]
      ,
      delay: 100,
    },
    {
      url: '/api/plugins/sensesp-plugin.js',
      method: 'GET',
      headers: {
        'Content-Type': 'application/javascript'
      },
      body: await readFile('../webui-plugins/sample-plugin-js/dist/assets/sensesp-plugin.js', 'utf-8'),
    },
    {
      url: '/api/plugins/__federation_fn_import.js',
      method: 'GET',
      headers: {
        'Content-Type': 'application/javascript'
      },
      body: await readFile('../webui-plugins/sample-plugin-js/dist/assets/__federation_fn_import.js', 'utf-8'),
    },
    {
      url: '/api/plugins/__federation_shared_preact-7ae36016.js',
      method: 'GET',
      headers: {
        'Content-Type': 'application/javascript'
      },
      body: await readFile('../webui-plugins/sample-plugin-js/dist/assets/__federation_shared_preact-7ae36016.js', 'utf-8'),
    },
    {
      url: '/api/plugins/preload-helper-a7f72f97.js',
      method: 'GET',
      headers: {
        'Content-Type': 'application/javascript'
      },
      body: await readFile('../webui-plugins/sample-plugin-js/dist/assets/preload-helper-a7f72f97.js', 'utf-8'),
    },
    {
      url: '/api/plugins/__federation_expose_SensESPPlugin-af7cb6d7.js',
      method: 'GET',
      headers: {
        'Content-Type': 'application/javascript'
      },
      body: await readFile('../webui-plugins/sample-plugin-js/dist/assets/__federation_expose_SensESPPlugin-af7cb6d7.js', 'utf-8'),
    }
  ]
)
