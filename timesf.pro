# NOTICE:
#
# Application name defined in TARGET has a corresponding QML filename.
# If name defined in TARGET is changed, the following needs to be done
# to match new name:
#   - corresponding QML filename must be changed
#   - desktop icon filename must be changed
#   - desktop filename must be changed
#   - icon definition filename in desktop file must be changed
#   - translation filenames have to be changed

# The name of your application
TARGET = timesf

CONFIG += sailfishapp

SOURCES += src/timesf.cpp

OTHER_FILES += qml/timesf.qml \
    qml/cover/CoverPage.qml \
    rpm/timesf.changes.in \
    rpm/timesf.spec \
    rpm/timesf.yaml \
    translations/*.ts \
    timesf.desktop \
    qml/pages/Settings.qml \
    qml/pages/Logs.qml \
    qml/pages/Time.qml

# to disable building translations every time, comment out the
# following CONFIG line
CONFIG += sailfishapp_i18n
TRANSLATIONS += translations/timesf-de.ts

