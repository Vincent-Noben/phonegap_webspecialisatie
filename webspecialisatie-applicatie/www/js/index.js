var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.functionWatcher();
        //app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },
    functionWatcher: function () {
        // ~~~~~~~~~~~~~~~~ //
        // Objects to watch //
        // ~~~~~~~~~~~~~~~~ //
        // Camera
        var cameraTakenButton = document.getElementById('cameraTake');
        var cameraSelectedButton = document.getElementById('cameraSelect');
        // Geolocation
        var geolocationButton = document.getElementById('geolocationButton');
        // Dialogs
        var alertButton = document.getElementById('alert');
        var confirmButton = document.getElementById('confirm');
        var promptButton = document.getElementById('prompt');
        var beepButton = document.getElementById('beep');
        // Vibration
        var buzzerButton = document.getElementById('buzzer');

        // ~~~~~~~~~~~~~~~~ //
        // Onclick to watch //
        // ~~~~~~~~~~~~~~~~ //
        // Camera
        cameraTakenButton.setAttribute('onclick','app.cameraTaken()');
        cameraSelectedButton.setAttribute('onclick','app.cameraSelected()');
        // Geolocation
        geolocationButton.setAttribute('onclick','app.geolocationGetCurrentPosition()');
        // Dialogs
        alertButton.setAttribute('onclick', 'app.alert()');
        confirmButton.setAttribute('onclick', 'app.confirm()');
        promptButton.setAttribute('onclick', 'app.prompt()');
        beepButton.setAttribute('onclick', 'app.beep()');
        // Vibration
        buzzerButton.setAttribute('onclick', 'app.buzzer()');
    },
    // ~~~~~~~~~~~~~~~~ //
    // API calls to run //
    // ~~~~~~~~~~~~~~~~ //
    // Camera
    cameraTaken: function() {
        navigator.camera.getPicture(onSuccess, onFail, { quality: 100,
            destinationType: Camera.DestinationType.DATA_URL
        });

        function onSuccess(imageData) {
            var image = document.getElementById('cameraTaken');
            image.src = "data:image/jpeg;base64," + imageData;
        }

        function onFail(message) {
            navigator.notification.alert(message, '', "Camera error");
        }
    },
    cameraSelected: function() {
        navigator.camera.getPicture(onSuccess, onFail, {
            quality: 100,
            sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
            destinationType: Camera.DestinationType.DATA_URL
        });

        function onSuccess(imageData) {
            var image = document.getElementById('cameraSelected');
            image.src = "data:image/jpeg;base64," + imageData;
        }

        function onFail(message) {
            navigator.notification.alert(message, '', "Camera error");
        }
    },
    // Geolocation
    geolocationGetCurrentPosition: function() {
        //alert("geolocation function called");
        var onSuccess = function(position) {
            navigator.notification.alert(
                  'Latitude: '          + position.coords.latitude          + '\n' +
                  'Longitude: '         + position.coords.longitude         + '\n' +
                  'Altitude: '          + position.coords.altitude          + '\n' +
                  'Accuracy: '          + position.coords.accuracy          + '\n' +
                  'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
                  'Heading: '           + position.coords.heading           + '\n' +
                  'Speed: '             + position.coords.speed             + '\n' +
                  'Timestamp: '         + position.timestamp                + '\n',
                  '',"Your location:");
        };

        // onError Callback receives a PositionError object
        //
        function onError(error) {
            alert('code: '    + error.code    + '\n' +
                  'message: ' + error.message + '\n');
        }

        navigator.geolocation.getCurrentPosition(onSuccess, onError);
        },
    // Dialogs
    alert: function() {
        navigator.notification.alert("This is an alert", callback, "This is a alert title", "This is the button");
        function callback (e) {
            alert("e = "+e);
            // Both button and dismiss give: "e = 0"

        }
    },
    confirm: function() {
        navigator.notification.confirm("Do you want to confirm this?", callback,"This is a confirmation title", ["Yes","No","Maybe"]);
        function callback (e) {
            alert("e = "+e);
            // Dismiss: "e = 0"
            // Buttons: "e = 1 to 3"
            // 4 or more buttons will be denied and not shown
        }
    },
    prompt: function() {
        navigator.notification.prompt("Write your name please",'',"This is a prompt title", ["Save this","Cancel"],"This is default text");
    },
    beep: function() {
        navigator.notification.beep(1);
    },
    // Vibration
    buzzer: function() {
        navigator.notification.vibrate(300);
    }
};
