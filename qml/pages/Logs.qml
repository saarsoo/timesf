import QtQuick 2.0
import Sailfish.Silica 1.0
import "../crona.js" as Crona

Page {
    Component.onCompleted: {
        Crona.getLogs(function(logs){
            for (var i = 0; i < logs.length; i++) {
                logsModel.append({text: logs[i].time + " - " + logs[i].type});
            }

            info.text = logs.length ? '' : qsTr("No logs today!");
        },
        function(msg){
            info.text = msg;
        });
    }

    ListModel {
        id: logsModel
    }

    SilicaListView {
        anchors.fill: parent
        model: logsModel

        header: PageHeader {
            title: qsTr("Time log")
        }

        BusyIndicator {
            running: info.text.length == 0 && logsModel.count == 0
            anchors.centerIn: parent
        }

        ViewPlaceholder {
            id: info
            anchors.centerIn: parent
            enabled: info.text.length > 0
        }

        delegate: BackgroundItem {
            Label {
                color: Theme.primaryColor
                x: Theme.paddingLarge
                text: model.text
                font.pixelSize: Theme.fontSizeExtraLarge
            }
        }
    }
}
