import QtQuick 2.0
import Sailfish.Silica 1.0
import "../crona.js" as Crona

Page {
    id: root

    property bool loaded: false

    Component.onCompleted: {
        Crona.getLogs(function(data){
            for(var i in data){
                logsModel.append(data[i]);
            }
            loaded = true;
        });
    }

    ListModel {
        id: logsModel
    }

    SilicaListView {
        id: logsView
        width: root.width
        height: root.height
        anchors.top: root.top
        model: logsModel
        header: PageHeader {
            title: qsTr("Time log")
        }
        BusyIndicator {
            running: !loaded
            anchors.centerIn: parent
        }
        ViewPlaceholder {
            text: qsTr("No logs today!")
            enabled: loaded && logsModel.count == 0
        }
        delegate: Item {
            width: ListView.view.width
            height: 70

            BackgroundItem {
                Column {
                    Label {
                        text: time + " - " + type
                    }
                }
            }
        }
    }
}
