#ifndef _SENSESP_SRC_SENSESP_NET_WEB_SERVER_H_
#define _SENSESP_SRC_SENSESP_NET_WEB_SERVER_H_

#include <ESPAsyncWebServer.h>
#include <esp_http_server.h>

#include <functional>

#include "ArduinoJson.h"
#include "sensesp/ui/ui_button.h"
#include "sensesp/system/startable.h"

namespace sensesp {

/**
 * @brief Handles external interactions with the device via the web interface.
 */
class WebServer : public Startable {
 public:
  WebServer();
  ~WebServer() { delete async_server; }
  virtual void start() override;
  void handle_not_found(AsyncWebServerRequest* request);
  void handle_config(AsyncWebServerRequest* request);
  void handle_device_reset(AsyncWebServerRequest* request);
  void handle_device_restart(AsyncWebServerRequest* request);
  void handle_info(AsyncWebServerRequest* request);
  void handle_static_reponse(AsyncWebServerRequest* request,
                             const uint8_t* content, uint32_t size);

  void handle_command(AsyncWebServerRequest* request);

 protected:
  void add_sorted_configurables(JsonArray& config);

 private:
  AsyncWebServer* async_server;
  void handle_config_list(AsyncWebServerRequest* request);
};

}  // namespace sensesp

#endif
