import QtQuick.LocalStorage 2.0
import QtQuick 2.0
import Sailfish.Silica 1.0
import "../database.js" as DB

Page {
    id: page

    Component.onCompleted: {
        var settings = DB.getSettings();
        url.text = settings.url;
        userId.text = settings.userId;
        pin.text = settings.pin;
    }

    SilicaFlickable {
        PullDownMenu {
            MenuItem {
                text: qsTr("Save")
                onClicked: {
                    var settings = {
                        url: url.text,
                        userId: userId.text,
                        pin: pin.text
                    };
                    DB.saveSettings(settings);
                }
            }
        }

        width: parent.width
        anchors.fill: parent

        PageHeader {
            title: qsTr("Settings")
        }

        Column {
            anchors.centerIn: parent
            width: parent.width

            Label {
                anchors.horizontalCenter: parent.horizontalCenter
                text: qsTr("Crona base url")
            }

            TextField {
                id: url
                width: parent.width
            }

            Label {
                anchors.horizontalCenter: parent.horizontalCenter
                text: qsTr("User ID")
            }

            TextField {
                id: userId
                width: parent.width
            }

            Label {
                anchors.horizontalCenter: parent.horizontalCenter
                text: qsTr("Pin")
            }

            TextField {
                id: pin
                echoMode: TextInput.Password
                width: parent.width
            }
        }
    }
}
