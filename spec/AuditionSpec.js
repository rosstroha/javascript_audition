describe("Audition JavaScript Tests", function() {

    it("SpecRunner runs", function() {
        expect(JavaScriptAudition.itRuns()).toBeTruthy();
    });

    describe("Accept Coins", function(){
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
                    thickness: 1.35
                };

                var result = JavaScriptAudition.coinAccepted(validCoin);

                expect(result.name).toEqual(expectedResult.name);
                expect(result.weight).toEqual(expectedResult.weight);
                expect(result.diameter).toEqual(expectedResult.diameter);
                expect(result.thickness).toEqual(expectedResult.thickness);
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

        describe("coinSlot", function(){
            beforeEach(function(){
                this.addToJarSpy = spyOn(JavaScriptAudition, "addToJar");
                this.updateDisplayTextSpy = spyOn(JavaScriptAudition, "updateDisplayText");
            });

            it("should properly handle a VALID coin input by accepting the coin, incrementing the value and updating the display text", function(){
                var acceptedCoinsSpy = spyOn(JavaScriptAudition, "acceptedCoins").and.returnValue(true);
                var validCoin = {
                    weight: 2.268,
                    diameter: 17.91,
                    thickness: 1.35
                };

                var result = JavaScriptAudition.coinSlot(validCoin);

                expect(acceptedCoinsSpy).toHaveBeenCalled();
                expect(this.updateDisplayTextSpy).toHaveBeenCalledWith("0.10");
                expect(this.addToJarSpy).toHaveBeenCalled();
                expect(result).toBeUndefined();
            });

            it("should properly handle an INVALID coin input by rejecting the coin by returning it to the user", function(){
                var acceptedCoinsSpy = spyOn(JavaScriptAudition, "acceptedCoins").and.returnValue(false);
                var invalidCoin = { //specs match that of a penny
                    weight: 2.5,
                    diameter: 19.05,
                    thickness: 1.5
                };

                var result = JavaScriptAudition.coinSlot(invalidCoin);

                expect(acceptedCoinsSpy).toHaveBeenCalled();
                expect(this.addToJarSpy).not.toHaveBeenCalled();
                expect(this.updateDisplayTextSpy).not.toHaveBeenCalled();
                expect(result).not.toBeUndefined();
                expect(result.weight).toBe(2.5);
                expect(result.diameter).toBe(19.05);
                expect(result.thickness).toBe(1.5);
            });
        })
    });

});
