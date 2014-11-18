import QtQuick 2.0
import Sailfish.Silica 1.0
import "../crona.js" as Crona

Page {
    id: root

    property bool loaded: false
    property bool failed: false

    Component.onCompleted: {
        Crona.getLogs(function(logs){
            for (var i = 0; i < logs.length; i++) {
                logsModel.append(logs[i]);
            }

            loaded = true;
        },
        function(msg){
            errorLabel.text = msg;
            failed = true;
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
            enabled: loaded && logsModel.count == 0 && !failed
        }
        ViewPlaceholder {
            id: errorLabel
            enabled: failed
        }
        delegate: Item {
            height: 40

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
