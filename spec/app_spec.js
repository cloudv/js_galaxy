describe('app', function () {
    var input1, input2, input3, input4, input5;
    var statement1, statement2, statement3;
    beforeEach(function () {
        input1 = "how much is pish tegj glob glob ?";
        input2 = "how many Credits is glob prok Silver ?";
        input3 = "how many Credits is glob prok Gold ?";
        input4 = "how many Credits is glob prok Iron ?";
        input5 = "how much wood could a woodchuck chuck if a woodchuck could chuck wood ?";
        statement1 = "glob glob Silver is 34 Credits";
        statement2 = "glob prok Gold is 57800 Credits";
        statement3 = "pish pish Iron is 3910 Credits";
        app.goods = {};
    });
    describe('init goods', function () {
        it('should call findCost with correct unit when init', function () {
            spyOn(app, 'findCost');

            app.init(statement1);

            expect(app.findCost).toHaveBeenCalledWith('glob');
        });

        it('should calculate good with price correct when init', function () {
            app.init(statement1);
            app.init(statement2);
            app.init(statement3);

            expect(app.findGoods('Silver')).toBe(17);
            expect(app.findGoods('Gold')).toBe(14450);
            expect(app.findGoods('Iron')).toBe(195.5);
        });
    });

    describe('get result', function () {
        beforeEach(function () {
            app.init(statement1);
            app.init(statement2);
            app.init(statement3);
        });

        it('should call validation when get result', function () {
            spyOn(app, 'validation');

            app.getResult(input1);

            expect(app.validation).toHaveBeenCalledWith(input1);
            expect(app.validation).toBeTruthy();
        });

        it('should call findCost when get result', function () {
            spyOn(app, 'findCost');

            app.getResult(input2);

            expect(app.findCost).toHaveBeenCalled();
        });

        it('should return 42 when how much is pish tegj glob glob ?', function () {
            expect(app.getResult(input1)).toBe(42);
        });

        it('should return 68 how many Credits is glob prok Silver ?', function () {
            expect(app.getResult(input2)).toBe(68);
        });

        it('should return 57800 how many Credits is glob prok Gold ?', function () {
            expect(app.getResult(input3)).toBe(57800);
        });

        it('should return 782 how many Credits is glob prok Iron ?', function () {
            expect(app.getResult(input4)).toBe(782);
        });

        it('should return "no idea balabala" how much wood could a woodchuck chuck if a woodchuck could chuck wood ?', function () {
            expect(app.getResult(input5)).toBe('I have no idea what you are talking about');
        });

    });
});