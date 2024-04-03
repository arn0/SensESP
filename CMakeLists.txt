
set(srcs
  src/sensesp_app.cpp
  src/sensesp_base_app.cpp
  src/sensesp_minimal_app.cpp
  src/sensesp/controllers/smart_switch_controller.cpp
  src/sensesp/controllers/system_status_controller.cpp
  src/sensesp/net/debug_output.cpp
  src/sensesp/net/discovery.cpp
  src/sensesp/net/http_server.cpp
  src/sensesp/net/networking.cpp
  src/sensesp/net/ota.cpp
  src/sensesp/net/ws_client.cpp
  src/sensesp/sensors/analog_input.cpp
  src/sensesp/sensors/digital_input.cpp
  src/sensesp/sensors/digital_output.cpp
  src/sensesp/sensors/sensor.cpp
  src/sensesp/sensors/system_info.cpp
  src/sensesp/signalk/signalk_delta_queue.cpp
  src/sensesp/signalk/signalk_emitter.cpp
  src/sensesp/signalk/signalk_listener.cpp
  src/sensesp/signalk/signalk_metadata.cpp
  src/sensesp/signalk/signalk_output.cpp
  src/sensesp/signalk/signalk_position.cpp
  src/sensesp/signalk/signalk_put_request_listener.cpp
  src/sensesp/signalk/signalk_put_request.cpp
  src/sensesp/signalk/signalk_time.cpp
  src/sensesp/system/button.cpp
  src/sensesp/system/configurable.cpp
  src/sensesp/system/filesystem.cpp
  src/sensesp/system/hash.cpp
  src/sensesp/system/led_blinker.cpp
  src/sensesp/system/local_debug.cpp
  src/sensesp/system/observable.cpp
  src/sensesp/system/pwm_output.cpp
  src/sensesp/system/resettable.cpp
  src/sensesp/system/rgb_led.cpp
  src/sensesp/system/startable.cpp
  src/sensesp/system/system_status_led.cpp
  src/sensesp/system/uuid.cpp
  src/sensesp/transforms/air_density.cpp
  src/sensesp/transforms/analogvoltage.cpp
  src/sensesp/transforms/angle_correction.cpp
  src/sensesp/transforms/change_filter.cpp
  src/sensesp/transforms/click_type.cpp
  src/sensesp/transforms/curveinterpolator.cpp
  src/sensesp/transforms/dew_point.cpp
  src/sensesp/transforms/difference.cpp
  src/sensesp/transforms/frequency.cpp
  src/sensesp/transforms/heat_index.cpp
  src/sensesp/transforms/lambda_transform.cpp
  src/sensesp/transforms/linear.cpp
  src/sensesp/transforms/median.cpp
  src/sensesp/transforms/moving_average.cpp
  src/sensesp/transforms/press_repeater.cpp
  src/sensesp/transforms/repeat_report.cpp
  src/sensesp/transforms/threshold.cpp
  src/sensesp/transforms/timestring.cpp
  src/sensesp/transforms/transform.cpp
  src/sensesp/transforms/truth_text.cpp
  src/sensesp/transforms/typecast.cpp
  src/sensesp/transforms/voltage_multiplier.cpp
  src/sensesp/transforms/voltagedivider.cpp
  src/sensesp/types/position.cpp
  src/sensesp/ui/ui_button.cpp
  src/sensesp/ui/ui_output.cpp
  )


set(includedirs src )
#set(priv_includes src/sensesp src/sensesp/controllers src/sensesp/system )

set(requires
  arduino-esp32
  ReactESP
  AsyncTCP
  #ESPAsyncTCP
  ESPAsyncWebServer
  ESPAsyncWiFiManager
  ArduinoJson
  WebSockets
  elapsedMillis
  AceButton
  RemoteDebug
  )

idf_component_register( INCLUDE_DIRS ${includedirs}
                        #PRIV_INCLUDE_DIRS ${priv_includes} 
                        SRCS ${srcs}
                        REQUIRES ${requires}
                        )

target_compile_options(${COMPONENT_TARGET} PUBLIC
    -DLED_BUILTIN=8
    )
