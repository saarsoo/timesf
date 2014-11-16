import QtQuick 2.0
import Sailfish.Silica 1.0
import "../timesf.js" as TimeJS


Page {
    id: page

    // To enable PullDownMenu, place our content in a SilicaFlickable
    SilicaFlickable {
        anchors.fill: parent

        // PullDownMenu and PushUpMenu must be declared in SilicaFlickable, SilicaListView or SilicaGridView
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

        // Tell SilicaFlickable the height of its content.
        contentHeight: column.height

        // Place our content in a Column.  The PageHeader is always placed at the top
        // of the page, followed by our content.
        Column {
            id: column
            width: page.width
            spacing: Theme.paddingLarge
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
                onClicked: {
                    busyIndicator.running = true;
                    TimeJS.logIn(function(data){
                        busyIndicator.running = false;
                        logInText.visible = true;
                        timerIn.start();
                    })
                }
            }
            Button {
                width: parent.width
                text: qsTr("Out")
                onClicked: {
                    busyIndicator.running = true;
                    TimeJS.logOut(function(data){
                        busyIndicator.running = false;
                        logOutText.visible = true;
                        timerOut.start();
                    })
                }
            }
            BusyIndicator {
                id: busyIndicator
                anchors.horizontalCenter: parent.horizontalCenter
            }
            Timer {
                id: timerIn
                interval: 2500
                running: false
                repeat: false
                onTriggered: logInText.visible = false
            }
            Timer {
                id: timerOut
                interval: 2500
                running: false
                repeat: false
                onTriggered: logOutText.visible = false
            }
            Label {
                id: logInText
                visible: false
                text: qsTr("Logged In!")
            }
            Label {
                id: logOutText
                visible: false
                text: qsTr("Logged Out!")
            }
        }
    }
}


