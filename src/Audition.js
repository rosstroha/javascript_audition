"use strict";

var JavaScriptAudition = {
    // Weight in grams
    // thickness and diameter in millimeters
    acceptedCoins : [
        {
            name: "quarter",
            weight: 5.67,
            diameter: 21.21,
            thickness: 1.95,
            value: 0.25
        },
        {
            name: "dime",
            weight: 2.268,
            diameter: 17.91,
            thickness: 1.35,
            value: 0.10
        },
        {
            name: "nickel",
            weight: 5.67,
            diameter: 21.21,
            thickness: 1.95,
            value: 0.05
        }
    ],

    displayText: "INSERT COIN",

    totalEntered: 0,

    coinsInJar: [],

    itRuns: function() {
        return true;
    },

    coinAccepted: function(inputCoin){
        return this.acceptedCoins.find(function(acceptedCoin){
            return acceptedCoin.weight === inputCoin.weight &&
                acceptedCoin.diameter === inputCoin.diameter &&
                acceptedCoin.thickness === inputCoin.thickness;
        });
    },

    coinSlot: function (inputCoin) {
        var coinAcceptedResult = this.coinAccepted(inputCoin);
        if(coinAcceptedResult){
            this.addToJar(coinAcceptedResult);
            this.totalEntered += coinAcceptedResult.value;
            this.updateDisplayText();
            return null;
        } else {
            return inputCoin;
        }
    },

    addToJar: function (acceptedCoin) {
        this.coinsInJar.push(acceptedCoin);
    },

    updateDisplayText: function () {
        this.displayText = this.totalEntered ? this.totalEntered : "INSERT COIN";
    }

};