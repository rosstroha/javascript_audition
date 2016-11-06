describe("Audition JavaScript Tests", function() {

    it("SpecRunner runs", function() {
        expect(JavaScriptAudition.itRuns()).toBeTruthy();
    });

    describe("Accept Coins", function(){
        describe("coinAccepted", function() {
            it("should return a coin if the coin's weight and size matches a dime", function(){
                var coin = {
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

                var result = JavaScriptAudition.coinAccepted(coin);

                expect(result.name).toEqual(expectedResult.name);
                expect(result.weight).toEqual(expectedResult.weight);
                expect(result.diameter).toEqual(expectedResult.diameter);
                expect(result.thickness).toEqual(expectedResult.thickness);
            });

            it("should return null if the coin's weight and size does not match a quarter, dime or nickel", function(){
                var coin = { //specs match that of a penny
                    weight: 2.5,
                    diameter: 19.05,
                    thickness: 1.5
                };
                expect(JavaScriptAudition.coinAccepted(coin)).toBeUndefined();
            });
        });
    });

});
