set(SENSESP_DIR src)

set(includes
    ${SENSESP_DIR}
    )

set(srcs
    ${SENSESP_DIR}/sensesp_app.cpp
    ${SENSESP_DIR}/sensesp_base_app.cpp
    ${SENSESP_DIR}/sensesp_minimal_app.cpp
    )


    idf_component_register(SRCS "${srcs}"
    INCLUDE_DIRS "${includes}"
    )

    # https://github.com/espressif/esp-joylink/blob/9f0c784fea029fd5b01f3265598c22ec55d57fa3/CMakeLists.txt