sap.ui.define([
    "sap/ui/core/mvc/Controller"
], function (Controller) {
    "use strict";

    return Controller.extend("basicproject.controller.View1", {

        onInit: function () {

            // --Comparision Operators-- //
            var result = "";
            result += "== Op Results:\n";
            result += "0 == '' : " + (0 == "") + "\n";
            result += '"10" == 10 : ' + ("10" == 10) + "\n";
            result += "null == undefined : " + (null == undefined) + "\n";
            result += "true == 1 : " + (true == 1) + "\n\n";

            result += "=== Op Results:\n";
            result += "0 === '' : " + (0 === "") + "\n";
            result += '"10" === 10 : ' + ("10" === 10) + "\n";
            result += "null === undefined : " + (null === undefined) + "\n";
            result += "true === 1 : " + (true === 1) + "\n\n";

            // Shows Initial Result
            this.getView().byId("txtResult").setText(result);

            // --Promises-- //
            const myPromise = new Promise((resolve, reject) => {

                let success = true; // changed value

                setTimeout(() => {
                    if (success) {
                        resolve("Data loaded successfully");
                    } else {
                        reject("Error while loading data");
                    }
                }, 2000);

            });

            myPromise
                .then(resultPromise => {
                    result += resultPromise;
                    this.getView().byId("txtResult").setText(result);
                })
                .catch(error => {
                    result += error;
                    this.getView().byId("txtResult").setText(result);
                });
        },

        // --Button Function(Imp)-- //
        onCompare: function () {

            let val1 = this.getView().byId("ip1").getValue();
            let val2 = this.getView().byId("ip2").getValue();

            let result = "";

            result += "== Result: " + (val1 == val2) + "\n";
            result += "=== Result: " + (val1 === val2);

            this.getView().byId("txtResult").setText(result);
        }

    });
});