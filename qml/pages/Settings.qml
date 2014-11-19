import QtQuick.LocalStorage 2.0
import QtQuick 2.0
import Sailfish.Silica 1.0
import "../database.js" as DB

Page {
    Component.onCompleted: {
        var settings = DB.getSettings();
        url.text = settings.url;
        userId.text = settings.userId;
        pin.text = settings.pin;
    }

    SilicaFlickable {
        anchors.fill: parent

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

        contentHeight: column.height

        Column {
            id: column
            width: parent.width
            spacing: Theme.paddingLarge

            PageHeader {
                title: qsTr("Settings")
            }

            TextField {
                id: url
                placeholderText: qsTr("Crona base url")
                label: qsTr("Crona base url")
                EnterKey.enabled: text.length > 0
                EnterKey.iconSource: "image://theme/icon-m-enter-next"
                EnterKey.onClicked: userId.focus = true
                width: parent.width
            }

            TextField {
                id: userId
                placeholderText: qsTr("User ID")
                label: qsTr("User ID")
                EnterKey.enabled: text.length > 0
                EnterKey.iconSource: "image://theme/icon-m-enter-next"
                EnterKey.onClicked: pin.focus = true
                width: parent.width
            }

            TextField {
                id: pin
                placeholderText: qsTr("Pin")
                label: qsTr("Pin")
                EnterKey.enabled: text.length > 0
                EnterKey.iconSource: "image://theme/icon-m-enter-next"
                EnterKey.onClicked: url.focus = true
                width: parent.width
                echoMode: TextInput.Password
            }
        }
    }
}
