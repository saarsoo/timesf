import QtQuick 2.0
import Sailfish.Silica 1.0
import "../timesf.js" as TimeJS

Page {
    id: root

    property bool loaded: false

    Component.onCompleted: {
        TimeJS.getLogs(function(data){
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
        //anchors.fill: parent
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
            height: 50

            BackgroundItem {
                Label {
                    text: type + ":" + time
                }
            }
        }
    }
}
