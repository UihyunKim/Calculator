$(document).ready(function() {
    var history = null;
    var result = null;
    var inputArr = [];
    var arithArr = [];

    function updateHistory(param) {
        if (param === "final") {
            var temp = $(".history").html() + " " + inputArr.join("");
            $(".history").html(temp);
        } else if (param === "reset") {
            $(".history").html("0");
        } else {
            $(".history").html(arithArr.join(" "));
        }
    }

    function resetOperator() {
        // reset operator ui
        $(".operator li").removeClass();
        $(".operator li:nth-child(3)").addClass("yellowed");
    }

    function resetIndicator() {
        // reset history
        updateHistory("reset");
        // reset currentInput
        $(".currentInput").html("0");
        // reset variables
        inputArr = [];
        arithArr = [];
    }

    function fixToFloat(value) {
        if (value % 1 !== 0) {
            value = value.toFixed(2);
        }
        return value;
    }

    function calculate(arr) {
        switch (arr[1]) {
            case "+":
                return fixToFloat(arr[0] + arr[2]);
            case "−":
                return fixToFloat(arr[0] - arr[2]);
            case "×":
                return fixToFloat(arr[0] * arr[2]);
            case "÷":
                return fixToFloat(arr[0] / arr[2]);
            default:
        }
    }

    // click on operator
    $(".operator li").click(function() {
        switch ($(this).html()) {
            case "+":
            case "−":
            case "×":
            case "÷":
                if (inputArr.length && !arithArr.length) { // input operator
                    arithArr.push(+inputArr.join(""));
                    arithArr.push($(this).html());
                    inputArr = [];
                    updateHistory();
                    $(this).siblings().removeClass("yellowed");
                    $(this).addClass("yellowed");
                } else if (!inputArr.length && arithArr[1]) { // change operator
                    arithArr[1] = $(this).html();
                    updateHistory();
                    $(this).siblings().removeClass("yellowed");
                    $(this).addClass("yellowed");
                } else if (inputArr.length && arithArr[1]) { // calculate!
                    arithArr.push(+inputArr.join(""));
                    inputArr = [];
                    result = calculate(arithArr);
                    arithArr = [];
                    arithArr.push(result);
                    arithArr.push($(this).html());
                    updateHistory();
                    $(".currentInput").html(arithArr[0]);
                    $(this).siblings().removeClass("yellowed");
                    $(this).addClass("yellowed");
                }
                break;
            case "=":
                if (inputArr.length && arithArr[1]) {
                    arithArr.push(+inputArr.join(""));
                    result = calculate(arithArr);
                    updateHistory("final");
                    arithArr = [];
                    inputArr = [];
                    // arithArr.push(result);
                    inputArr.push(result);
                    $(".currentInput").html(inputArr[0]);
                    $(this).siblings().removeClass("yellowed");
                    $(this).addClass("yellowed");
                }
                break;
            default:

        }
    });

    function checkNumpadInput(value) {
        switch (value) {
            case ".":
                if (inputArr.length && inputArr.indexOf(value) === -1) {
                    inputArr.push(value);
                }
                $(".currentInput").html(inputArr.join(""));
                break;
            case "0":
                if (!(inputArr.indexOf(".") === -1 && inputArr[0] === 0)) {
                    inputArr.push(+value);
                }
                $(".currentInput").html(inputArr.join(""));
                break;
            case "⌫":
                inputArr.pop();
                if (!inputArr.length) {
                    inputArr.push(0);
                }
                $(".currentInput").html(inputArr.join(""));
                break;
                // for number 1 ~ 9
            default:
                if (inputArr[0] === 0 && inputArr.indexOf(".") === -1) {
                    inputArr[0] = +value;
                } else {
                    inputArr.push(+value);
                }
                $(".currentInput").html(inputArr.join(""));

        }


    }

    // click on numpad => change color
    $(".numpad li")
        .mousedown(function() {
            $(this).addClass("lighted").data("couldBeClick", true);
        })
        // prevent drag accident after mousedown
        .mousemove(function() {
            $(this).removeClass().data("couldBeClick", false);
        })
        .mouseup(function() {
            $(this).removeClass();
            if ($(this).data("couldBeClick")) {
                checkNumpadInput($(this).text());
            }
        });

    // click reset button
    $(".reset").click(function() {
        resetOperator();
        resetIndicator();
    });
});
