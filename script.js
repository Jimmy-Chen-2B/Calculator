document.addEventListener("DOMContentLoaded", () => {
    let displayNum = document.querySelector(".display");
    let hiddenNum = document.querySelector(".sec-number"); //此區塊存放加數、減數、乘數、除數
    let ctrlNumToNum = 1; //當值為0，即切換至輸入加數、減數、乘數、除數
    let ctrlAcToC = 1; //控制全清除(AC)和重新輸入(C)
    let result;
    let numBeCounted; //被加數、被減數、被乘數、被除數
    let numCount; //加數、減數、乘數、除數
    const btnGroup = document.querySelector(".btn-group");
    let whatOperator = document.querySelector(".equal");

    function typeNum(e) {
        //輸入被加數、被減數、被乘數、被除數
        if (displayNum.textContent !== "0") {
            displayNum.textContent += e.target.textContent;
        } else {
            displayNum.textContent = e.target.textContent;
        }
    }

    function typeNum2(e) {
        //輸入加數、減數、乘數、除數，並顯示在輸入區(display)
        if (hiddenNum.textContent !== "0") {
            hiddenNum.textContent += e.target.textContent;
        } else {
            hiddenNum.textContent = e.target.textContent;
        }
        displayNum.textContent = hiddenNum.textContent;
    }

    function decimalPoint() {
        if (!ctrlNumToNum && !hiddenNum.textContent.includes(".")) {
            //添加小數點
            hiddenNum.textContent += ".";
        }
        if (ctrlNumToNum && !displayNum.textContent.includes(".")) {
            displayNum.textContent += ".";
        }
    }

    function zeroing() {
        //全清除，將所有變數回復初始值
        if (ctrlAcToC) {
            displayNum.textContent = "0";
            hiddenNum.textContent = "0";
            ctrlNumToNum = "1";
            numBeCounted = 0;
            numCount = 0;
            result = 0;
            whatOperator.removeAttribute("id");
        } else {
            //如果加數、減數、乘數、除數錯誤，可以重新輸入
            displayNum.textContent = "0"; //再按一次即全清除
            hiddenNum.textContent = "0";
            document.querySelector(".AC").textContent = "AC";
            ctrlAcToC = 1;
        }
    }

    function negativeNum() {
        if (ctrlNumToNum) {
            displayNum.textContent *= -1;
        } else {
            hiddenNum.textContent *= -1;
            displayNum.textContent *= -1;
        }
    }
    function percent() {
        if (ctrlNumToNum) {
            displayNum.textContent /= 100;
        } else {
            hiddenNum.textContent /= 100;
            displayNum.textContent /= 100;
        }
    }

    function typeOperator(e) {
        whatOperator.removeAttribute("id"); //防錯機制
        //利用屬性添加，將點擊加減乘除按鈕的事件連接等號按鈕
        if (e.target.id === "division") {
            whatOperator.setAttribute("id", "division");
        }
        if (e.target.id === "multiply") {
            whatOperator.setAttribute("id", "multiply");
        }
        if (e.target.id === "minus") {
            whatOperator.setAttribute("id", "minus");
        }
        if (e.target.id === "add") {
            whatOperator.setAttribute("id", "add");
        }
    }

    function doCalc(e) {
        //四則運算
        numCount = Number(hiddenNum.textContent);
        if (e.target.id === "division") {
            result = numBeCounted / numCount;
        }
        if (e.target.id === "multiply") {
            result = numBeCounted * numCount;
        }
        if (e.target.id === "minus") {
            result = numBeCounted - numCount;
        }
        if (e.target.id === "add") {
            result = numBeCounted + numCount;
        }
        displayNum.textContent = parseFloat(result.toPrecision(12)); //將計算結果指定給display區
        hiddenNum.textContent = "0"; //將被算數歸零，可以做連續計算
    }

    btnGroup.addEventListener("click", (e) => {
        if (e.target.className === "number" && ctrlNumToNum) {
            //打錯字可以清除
            ctrlAcToC = 0;
            document.querySelector(".AC").textContent = "C";
            typeNum(e);
        } else if (e.target.className === "number" && !ctrlNumToNum) {
            ctrlAcToC = 0;
            document.querySelector(".AC").textContent = "C";
            typeNum2(e);
        }

        if (e.target.className === "decimal-point") {
            decimalPoint();
        }

        if (e.target.className === "AC") {
            zeroing();
        }
        if (e.target.className === "negative") {
            negativeNum();
        }
        if (e.target.className === "percent") {
            percent();
        }
        if (e.target.className === "operator") {
            //按下加減乘除按鈕，將當下值指定給numBeCounted，並切換到被算數模式
            ctrlNumToNum = 0;
            typeOperator(e);
            if (hiddenNum.textContent === "0") {
                numBeCounted = Number(displayNum.textContent);
            } else {
                doCalc(e);
                numBeCounted = Number(displayNum.textContent);
            }
        }

        if (e.target.className === "equal") {
            //將被算數指定給numCount，並計算結果
            doCalc(e);
        }
    });
});
