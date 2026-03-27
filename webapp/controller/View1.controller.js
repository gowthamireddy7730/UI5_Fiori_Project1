sap.ui.define([
    // Importing required SAP UI5 modules
    "sap/ui/core/mvc/Controller",   // Base controller class
    "sap/m/Button",                 // Button control
    "sap/m/Image",                  // Image control
    "sap/m/VBox",                   // Vertical layout container
    "sap/ui/core/theming/Parameters"// Used to get theme-based colors
], function (Controller, Button, Image, VBox, Parameters) {
    "use strict"; // Enforces strict JavaScript rules

    // Creating and extending a controller
    return Controller.extend("basicproject.controller.View1", {

        // Lifecycle method - called once when view is initialized
        onInit: function () {

            // --Operators-- //
            let result = ""; // Initialize empty string

            // Adding loose equality results (== checks value only)
            result += "== Results:\n";
            result += "0 == false : " + (0 == false) + "\n"; // true
            result += '"3" == 3 : ' + ("3" == 3) + "\n\n";   // true

            // Adding strict equality results (=== checks value + type)
            result += "=== Results:\n";
            result += "1 === true : " + (1 === true) + "\n"; // false
            result += '"7" === 7 : ' + ("7" === 7) + "\n\n";   // false

            // Display result in Text control with id "txtResult"
            this.getView().byId("txtResult").setText(result);

            // --Promises-- //
            // Creating a Promise (async operation)
            const myPromise = new Promise((resolve, reject) => {

                let success = true; // condition variable

                // Simulating async operation (2 seconds delay)
                setTimeout(() => {
                    if (success) {
                        resolve("Promise : Data loaded successfully\n"); // success case
                    } else {
                        reject("Promise : Error while loading data\n"); // failure case
                    }
                    
                }, 2000);

            });

            // Handling promise result
            myPromise
                .then(resultPromise => { // runs when resolved
                    let currentText = this.getView().byId("txtResult").getText();
                    currentText += resultPromise; // append result
                    this.getView().byId("txtResult").setText(currentText);
                })
                .catch(error => { // runs when rejected
                    let currentText = this.getView().byId("txtResult").getText();
                    currentText += error; // append error
                    this.getView().byId("txtResult").setText(currentText);
                })
                .finally(() => {
                    let txt = this.getView().byId("txtResult").getText();
                    txt += "Finally Block\n";
                    this.getView().byId("txtResult").setText(txt);
                });

            // --Async-- //
            this.example(); // calling async/await function

            // --Create Image UI-- //
            var oPage = this.getView().byId("page"); 
            // Get Page control from view

            // Create VBox (vertical layout)
            var oVBox = new VBox({
                id: this.createId("imgBox") // unique ID for VBox
            });

            // Create "Open Image" button
            var oButton = this._createTextButton(
                "Open Image",                 // button text
                "darkgreen",                  // color type
                this.onShowImage.bind(this)   // event handler
            );

            oVBox.addItem(oButton); // add button to VBox
            oPage.addContent(oVBox); // add VBox to page
        },

        // --Creates Button-- //
        _createTextButton: function (text, colorType, fnPress) {

            var sColor; // variable to store color

            // Decide color based on type
            if (colorType === "darkgreen") {
                sColor = "#006400"; // dark green
            } else if (colorType === "purple") {
                sColor = "#800080"; // purple
            }

            // Create button
            var oBtn = new Button({
                text: text,        // button text
                type: "Transparent", // transparent style
                press: fnPress     // event handler
            });

            // Apply custom color after rendering
            oBtn.addEventDelegate({
                onAfterRendering: function () {
                    this.$().find(".sapMBtnInner").css("color", sColor);
                    // change text color using jQuery
                }
            }, oBtn);

            return oBtn; // return created button
        },

        // --Shows Image-- //
        onShowImage: function () {

            var oVBox = this.getView().byId("imgBox"); 
            // get VBox

            oVBox.removeAllItems(); 
            // clear existing items

            // Create Open button again
            var oOpenBtn = this._createTextButton(
                "Open Image",
                "darkgreen",
                this.onShowImage.bind(this)
            );

            // Create Close button
            var oCloseBtn = this._createTextButton(
                "Close Image",
                "purple",
                this.onCloseImage.bind(this)
            );

            // Create Image control
            var oImage = new Image({
                src: "images/Arjundas.jpg", // image path
                width: "100%",              // full width
                height: "100%"              // full height
            });

            // Add controls to VBox
            oVBox.addItem(oOpenBtn);
            oVBox.addItem(oCloseBtn);
            oVBox.addItem(oImage);
        },

        // --Close Image-- //
        onCloseImage: function () {

            var oVBox = this.getView().byId("imgBox"); 
            // get VBox

            oVBox.removeAllItems(); 
            // remove all items (image + buttons)

            // Add only Open button again
            var oButton = this._createTextButton(
                "Open Image",
                "darkgreen",
                this.onShowImage.bind(this)
            );

            oVBox.addItem(oButton);
        },

        // --Async Function-- //
        example: async function () {

            let oView = this.getView(); 
            // get current view

            let resultText = oView.byId("txtResult").getText(); 
            // get existing text

            resultText += "\nAsync/Await:\nStart\n"; 
            // append start text

            oView.byId("txtResult").setText(resultText);

            // wait for async operation (2 seconds)
            let result = await new Promise((resolve) => {
                setTimeout(() => resolve("Done!\n"), 2000);
            });

            resultText = oView.byId("txtResult").getText();

            resultText += result + "End\n"; 
            // append result and end text

            oView.byId("txtResult").setText(resultText);
        }

    });
});
