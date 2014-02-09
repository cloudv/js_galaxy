var app = (function () {
    var self = this;
    var digital_unit = {glob: 1, prok: 5, pish: 10, tegj: 50};
    var goods = {};

    function findCost(key) {
        return digital_unit[key];
    }

    function findGoods(key) {
        return goods[key];
    }

    function validation(input) {
        if (/\sis\s/.test(input))
            return true;
        return false;
    }

    function initGoods(statement) {
        var cost = statement.match(/\d+/g);
        var input_unit = statement.split(" is ")[0].split(" ");
        var metal_cost = 0;
        var div_num = 1;
        //to let spyOn work should use this.findCost instead findCost
        var first_num = app.findCost(input_unit[0]);
        var second_num = app.findCost(input_unit[1]);
        if (first_num < second_num) {
            metal_cost = cost / (second_num - first_num);
        } else {
            metal_cost = cost / (first_num + second_num);
        }
        goods[input_unit[2]] = metal_cost;
    }

    function getResult(input) {
        if (!app.validation(input))
            return 'I have no idea what you are talking about';
        var input_unit = input.split(" is ")[1].match(/\w{3,6}/g);
        var j = 0;
        var result = 0;
        var last = input_unit[input_unit.length - 1];
        var length = 0;
        if (digital_unit[last])
            length = input_unit.length;
        else
            length = input_unit.length - 1;
        for (var i = 0; i < length; i++) {
            if (i + 1 < length) {
                j = i + 1
                var current = app.findCost(input_unit[i]);
                var next = app.findCost(input_unit[j]);
                if (next > current) {
                    result += next - current;
                    i++
                } else {
                    result += current;
                }
            } else {
                result += app.findCost(input_unit[i]);
            }
        }
        if (length == input_unit.length - 1)
            result = result * goods[last];
        return result;
    }
    return {
        init : initGoods,
        getResult : getResult,
        findGoods : findGoods,
        findCost : findCost,
        validation : validation
    }
}());






