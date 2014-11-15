import QtQuick 2.0
import Sailfish.Silica 1.0

Page {
    id: page
    SilicaListView {
        id: listView
        anchors.fill: parent
        header: PageHeader {
            title: qsTr("Settings")
        }
        ViewPlaceholder {
            enabled: true
            text: qsTr("Will be some settings here")
        }
    }
}
