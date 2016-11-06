"use strict";

var JavaScriptAudition = {
    // Weight in grams
    // thickness and diameter in millimeters
    acceptedCoins : [
        {
            name: "quarter",
            weight: 5.67,
            diameter: 21.21,
            thickness: 1.95
        },
        {
            name: "dime",
            weight: 2.268,
            diameter: 17.91,
            thickness: 1.35
        },
        {
            name: "nickel",
            weight: 5.67,
            diameter: 21.21,
            thickness: 1.95
        }
    ],

    itRuns: function() {
        return true;
    },

    coinAccepted: function(inputCoin){
        return this.acceptedCoins.find(function(acceptedCoin){
            return acceptedCoin.weight === inputCoin.weight &&
                acceptedCoin.diameter === inputCoin.diameter &&
                acceptedCoin.thickness === inputCoin.thickness;
        });
    }

};