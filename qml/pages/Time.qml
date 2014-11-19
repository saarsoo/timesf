import QtQuick 2.0
import Sailfish.Silica 1.0
import "../crona.js" as Crona


Page {
    function load(callback) {
        busyIndicator.running = true;
        callback(function(msg){
            busyIndicator.running = false;
            logText.text = msg;
            logText.visible = true;

            return timer.running ? timer.restart() : timer.start();
        });
    }

    SilicaFlickable {
        anchors.fill: parent
        width: parent.width
        contentHeight: column.height

        PullDownMenu {
            MenuItem {
                text: qsTr("Settings")
                onClicked: pageStack.push(Qt.resolvedUrl("Settings.qml"))
            }

            MenuItem {
                text: qsTr("Show log")
                onClicked: pageStack.push(Qt.resolvedUrl("Logs.qml"))
            }
        }

        Column {
            id: column
            width: parent.width
            PageHeader {
                title: qsTr("Timesf")
            }
            Label {
                x: Theme.paddingLarge
                text: qsTr("A timesf application")
                color: Theme.secondaryHighlightColor
                font.pixelSize: Theme.fontSizeExtraLarge
            }

            Button {
                width: parent.width
                text: qsTr("In")
                onClicked: load(function(callback){
                    Crona.clockIn(function(){
                        callback(qsTr("Logged In!"));
                    }, callback);
                })
            }

            Button {
                width: parent.width
                text: qsTr("Out")
                onClicked: load(function(callback){
                    Crona.clockOut(function(){
                        callback(qsTr("Logged Out!"));
                    }, callback);
                })
            }

            BusyIndicator {
                id: busyIndicator
                anchors.horizontalCenter: parent.horizontalCenter
            }

            Timer {
                id: timer
                interval: 2500
                running: false
                repeat: false
                onTriggered: logText.visible = false
            }

            Label {
                x: Theme.paddingLarge
                id: logText
                visible: false
            }
        }
    }
}


