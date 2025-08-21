$(document).ready(function() {
    let display = $('#display');
    display.val('');
    let currentInput = '';
    let history = [];

    // Button click handle
    $('.btn').click(function() {
        const id = $(this).attr('id');
        handleInput(id, $(this).text());
    });

    // Keyboard input handle
    $(document).keydown(function(e) {
        const key = e.key;

        if ($.isNumeric(key) || ['+', '-', '*', '/', '.'].includes(key)) {
            currentInput += key;
            display.val(currentInput);
        } else if (key === 'Enter') {
            e.preventDefault();
            calculate();
        } else if (key === 'Backspace') {
            currentInput = currentInput.slice(0, -1);
            display.val(currentInput);
        } else if (key.toLowerCase() === 'c') {
            currentInput = '';
            display.val('');
        }
    });

    function calculate() {
        try {
            let result = eval(currentInput).toString();

            // save in history
            history.push(currentInput + " = " + result);
            let listItem = $("<li></li>").text(currentInput + " = " + result);
            $("#historyList").prepend(listItem);

            // show result
            display.val(result);
            currentInput = result;
        } catch (e) {
            display.val('Error');
            currentInput = '';
        }
    }

    function handleInput(id, text) {
        if (id === 'clear') {
            currentInput = '';
            display.val('');
        } else if (id === 'backspace') {
            currentInput = currentInput.slice(0, -1);
            display.val(currentInput);
        } else if (id === 'equals') {
            calculate();
        } else {
            currentInput += text;
            display.val(currentInput);
        }
    }
});
