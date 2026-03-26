//used to define module.
sap.ui.define([
    //importing the base controller class.
    "sap/ui/core/mvc/Controller"
    //function recieves the imported class.
], function (Controller) {

    "use strict";
    //creating your own controller name.
    return Controller.extend("basicproject.controller.View1", {
        //function runs when the view loads.
        onInit: function () {

            // --Comparision Operators-- //
            //a variable to store o/p.
            let result = "";

            result += "== Operator Res:\n";
            result += "0 == false : " + (0 == false) + "\n";
            result += '"3" == 3 : ' + ("3" == 3) + "\n\n";

            result += "=== Operator Res:\n";
            result += "1 === true : " + (1 === true) + "\n";
            result += '"7" === 7: ' + ("7" === 7) + "\n\n";
            //Gets UI element with ID txtResult & Displays the result text on screen

            this.getView().byId("txtResult").setText(result);

            // --Promises-- //
            //creating a promise.
            const myPromise = new Promise((resolve, reject) => {

                let success = true;
                //Delay execution (2 seconds)
                setTimeout(() => {
                    if (success) {
                        resolve("Promise: Data loaded successfully\n");
                    } else {
                        reject("Promise: Error while loading data\n");
                    }
                }, 2000);
                // add

            });
            //Runs when promise is successful
            myPromise.then(resultPromise => {
                   let currentText = this.getView().byId("txtResult").getText();
                   currentText += resultPromise;
                   this.getView().byId("txtResult").setText(currentText);
                })
                //Runs if promise fails
                .catch(error => {
                    let currentText = this.getview().byId("txtResult").getText();
                    currentText += error;
                    this.getView().byId("txtResult").setText(currentText);
                });

            // --Calls Async Function-- //
            this.example();
        },
        //async function//
        // --Updated async Function-- //
        example: async function () {
            //Store view in variable
            let oView = this.getView();
            let resultText = oView.byId("txtResult").getText();

            // Print Start in UI
            //Add Async section
            resultText += "\nAsync/Await:\nStart\n";
            oView.byId("txtResult").setText(resultText);

            //Wait until promise completes
            let result = await new Promise((resolve) => {
                setTimeout(() => resolve("Done!\n"), 2000);
            });
            resultText=oView.byId("txtResult").getText();
            // Print Done + End in UI
            resultText += result + "End\n";
            oView.byId("txtResult").setText(resultText);

        }

    });
});