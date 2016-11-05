describe("Audition JavaScript Tests", function() {

    it("SpecRunner runs", function() {
        expect(JavaScriptAudition.itRuns()).toBeTruthy();
    });

    describe("Accept Coins", function(){
        describe("coinAccepted", function() {
            it("should return true if the coin's weight and size matches a dime", function(){
                var coin = {
                    weight: 2.268,
                    diameter: 17.91,
                    thickness: 1.35
                };
                expect(JavaScriptAudition.coinAccepted(coin)).toBeTruthy();
            });

            it("should return false if the coin's weight and size does not match a quarter, dime or nickel", function(){
                var coin = { //specs match that of a penny
                    weight: 2.5,
                    diameter: 19.05,
                    thickness: 1.5
                };
                expect(JavaScriptAudition.coinAccepted(coin)).toBeTruthy();
            });
        });
    });

});
