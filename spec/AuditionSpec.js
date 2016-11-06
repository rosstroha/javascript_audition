describe("Audition JavaScript Tests", function() {

    it("SpecRunner runs", function() {
        expect(JavaScriptAudition.itRuns()).toBeTruthy();
    });

    describe("Accept Coins - ", function(){
        describe("coinAccepted", function() {
            it("should return a coin if the coin's weight and size matches a dime", function(){
                var validCoin = {
                    weight: 2.268,
                    diameter: 17.91,
                    thickness: 1.35
                };
                var expectedResult = {
                    name: "dime",
                    weight: 2.268,
                    diameter: 17.91,
                    thickness: 1.35,
                    value: 0.10
                };

                var result = JavaScriptAudition.coinAccepted(validCoin);

                expect(result.name).toEqual(expectedResult.name);
                expect(result.weight).toEqual(expectedResult.weight);
                expect(result.diameter).toEqual(expectedResult.diameter);
                expect(result.thickness).toEqual(expectedResult.thickness);
                expect(result.value).toEqual(expectedResult.value);
            });

            it("should return null if the coin's weight and size does not match a quarter, dime or nickel", function(){
                var invalidCoin = { //specs match that of a penny
                    weight: 2.5,
                    diameter: 19.05,
                    thickness: 1.5
                };
                expect(JavaScriptAudition.coinAccepted(invalidCoin)).toBeUndefined();
            });
        });

        describe("coinSlot - ", function(){
            beforeEach(function(){
                this.addToJarSpy = spyOn(JavaScriptAudition, "addToJar");
                this.updateDisplayTextSpy = spyOn(JavaScriptAudition, "updateDisplayText");
            });

            it("should properly handle a VALID coin input by accepting the coin, incrementing the value and updating the display text", function(){
                var coinAcceptedSpy = spyOn(JavaScriptAudition, "coinAccepted").and.returnValue(true);
                var validCoin = {
                    weight: 2.268,
                    diameter: 17.91,
                    thickness: 1.35
                };

                var result = JavaScriptAudition.coinSlot(validCoin);

                expect(coinAcceptedSpy).toHaveBeenCalled();
                expect(this.updateDisplayTextSpy).toHaveBeenCalled();
                expect(this.addToJarSpy).toHaveBeenCalled();
                expect(result).toBeNull();
            });

            it("should properly handle an INVALID coin input by rejecting the coin by returning it to the user", function(){
                var coinAcceptedSpy = spyOn(JavaScriptAudition, "coinAccepted").and.returnValue(false);
                var invalidCoin = { //specs match that of a penny
                    weight: 2.5,
                    diameter: 19.05,
                    thickness: 1.5
                };

                var result = JavaScriptAudition.coinSlot(invalidCoin);

                expect(coinAcceptedSpy).toHaveBeenCalled();
                expect(this.addToJarSpy).not.toHaveBeenCalled();
                expect(this.updateDisplayTextSpy).not.toHaveBeenCalled();
                expect(result).not.toBeUndefined();
                expect(result.weight).toBe(2.5);
                expect(result.diameter).toBe(19.05);
                expect(result.thickness).toBe(1.5);
            });
        });

        describe("addToJar - ", function(){
            it("should add an accepted coin to the 'jar' or where the machine keeps the money", function () {
                var acceptedCoin = {
                    name: "dime",
                    weight: 2.268,
                    diameter: 17.91,
                    thickness: 1.35,
                    value: 0.10
                };

                JavaScriptAudition.addToJar(acceptedCoin);

                expect(JavaScriptAudition.coinsInJar.length).toBeGreaterThan(0);
            });
        });

        describe("updateDisplayText - ", function(){
            it("should display INSERT COIN if the totalEntered value is 0", function () {
                JavaScriptAudition.totalEntered = 0;
                JavaScriptAudition.updateDisplayText();
                expect(JavaScriptAudition.displayText).toEqual("INSERT COIN");
            });
        });
    });

    describe("Feature - Return Coins", function(){
        describe("coinReturn", function(){
            it("should return all coins that have been accepted", function(){
                JavaScriptAudition.coinsInJar = [
                    {
                        name: "dime",
                        weight: 2.268,
                        diameter: 17.91,
                        thickness: 1.35,
                        value: 0.10
                    },
                    {
                        name: "dime",
                        weight: 2.268,
                        diameter: 17.91,
                        thickness: 1.35,
                        value: 0.10
                    },
                    {
                        name: "dime",
                        weight: 2.268,
                        diameter: 17.91,
                        thickness: 1.35,
                        value: 0.10
                    }
                ];

                var returnedCoins = JavaScriptAudition.returnCoins();

                expect(JavaScriptAudition.coinsInJar.length).toEqual(0);
                expect(returnedCoins.length).toEqual(3);
            });

            it("should return nothing if nothing has been accepted", function(){
                JavaScriptAudition.coinsInJar = [];

                var returnedCoins = JavaScriptAudition.returnCoins();

                expect(JavaScriptAudition.coinsInJar.length).toEqual(0);
                expect(returnedCoins.length).toEqual(0);
            });
        });
    });

    describe("Feature - Sold Out", function(){
        describe("soldOut", function(){
            it("should return true if there are no more items for sale", function () {
                JavaScriptAudition.itemsForSale = [];

                expect(JavaScriptAudition.soldOut()).toBeFalsy();
            });

            it("should return false if there are still items for sale", function () {
                JavaScriptAudition.itemsForSale = [{},{}];

                expect(JavaScriptAudition.soldOut()).toBeTruthy();
            });
        });
    });

});
