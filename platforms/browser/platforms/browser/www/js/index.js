/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
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
        console.log('Received Device Ready Event');
        console.log('calling setup push');
        app.setupPush();
    },
    setupPush: function() {
        console.log('calling push init');
        var push = PushNotification.init({
            "android": {
                 "senderID": "",
                 "icon": "phonegap",
                 "iconColor": "black",
                 "vibrate": true 
            },
            "browser": {
                 "pushServiceURL": "http://push.api.phonegap.com/v1/push"
             },
            "ios": {
                "sound": true,
                "vibration": true,
                "badge": true
            },
            "windows": {}
        });
        console.log('after init');

        push.on('registration', function(data) {
            console.log('registration event: ' + data.registrationId);
            alert('registration event: ' + data.registrationId);

            var oldRegId = localStorage.getItem('registrationId');
            if (oldRegId !== data.registrationId) {
                // Save new registration ID
                localStorage.setItem('registrationId', data.registrationId);
                // Post registrationId to your app server as the value has changed
            }

                      /*  var FCM = require('fcm-node');
                        console.log('¡?');
                        // Replace these with your own values.
                        var apiKey = 'AAAADGbP4X8:APA91bGAEPTVeS_GAGEqUyTYV63nKEd1NvIJI0ZTBwke93z5oK17maXMC-4Smy8GO3Kx2h-tPotSzsqpQNBMgPQ9PAOKOTNwqMGDwPFzU9NqvpSLfml6CkKubW90MVrMjcs0Tq5JkmNJymOkD6lxMEM_JCVrKweXBw';
                        var deviceID = data.registrationId;
                        var fcm = new FCM(apiKey);

                        var message = {
                          to: deviceID,
                          data: {
                            title: 'Boomedic',
                            message: 'Simple non-localizable text for message!'
                            // Constant with formatted params
                            // message: {"locKey": "push_message_fox", "locData": ["fox", "dog"]});
                          }
                        };

                        fcm.send(message, (err, response) => {
                          if (err) {
                            console.log(err);
                            console.log('Something has gone wrong!');
                          } else {
                            console.log('Successfully sent with response: ', response);
                          }
                        });*/
            //listeningElement.setAttribute('style', 'display:none;');
            //receivedElement.setAttribute('style', 'display:block;');
        });

        push.on('error', function(e) {
            console.log("push error = " + e.message);
        });

        push.on('notification', function(data) {
            
            console.log('notification event');
            navigator.notification.alert(
                data.message,         // message
                null,                 // callback
                data.title,           // title
                'Ok'                  // buttonName
            );
       });
    }
};
