var selectorRules = {};
function Validator(options) {
    function valiable (inputElement,rules) {
        var errorElement = inputElement.parentElement.querySelector(options.errorSelector);
        var errorMessage;
        var rule = selectorRules[rules.selector]
        for (var i = 0 ; i < rule.length ; ++i) {
            errorMessage = rule[i](inputElement.value);
            if(errorMessage){
                break;
            }
        }
        if (errorMessage) {
            errorElement.innerText = errorMessage;
            inputElement.parentElement.classList.add('invalid');     
        }
        else {
            errorElement.innerText = ''; 
            inputElement.parentElement.classList.remove('invalid');
        }
        return !errorMessage;

    }
    var formElement = document.querySelector(options.form);
    if (formElement) {
        formElement.onsubmit = function(e) {
            e.preventDefault();
            var isFormValid = true;
            options.rule.forEach(function(rules) {
                var inputElement = formElement.querySelector(rules.selector);
                var isValid = valiable(inputElement,rules);
                if (!isValid) {
                    isFormValid = false;
                }
            });
            
            if (isFormValid) {
                if (typeof options.onSubmit === 'function'){
                    var enableSubmit = formElement.querySelectorAll('[name]:not([disabled])');
                    var formValue = Array.from(enableSubmit).reduce(function(values,input){
                        values[input.name] = input.value;
                        return  values;
                    },{});
                    options.onSubmit(formValue);
                }
            }
        }
           
        options.rule.forEach(function(rules) {
            if (Array.isArray(selectorRules[rules.selector])) {
                selectorRules[rules.selector].push(rules.test);
            }
            else {
                selectorRules[rules.selector] = [rules.test]; 
            }
            var inputElement = formElement.querySelector(rules.selector); 
            var errorElement = inputElement.parentElement.querySelector(options.errorSelector)
            if (inputElement) {
                inputElement.onblur = function() {
                    valiable(inputElement,rules);
                }
                inputElement.oninput = function () {
                    errorElement.innerText = '';
                    inputElement.parentElement.classList.remove('invalid');
                }
            }
        });
    }
}

Validator.isEequired = function(selector,message) {
    return {
        selector: selector,
        test:function(value) {
            return value.trim() ? undefined : message|| 'Vui lòng nhập trường này';
        }
    };
}

Validator.isEmail = function(selector,message) {
    return {
        selector:selector,
        test:function(value) {
            var regax = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regax.test(value) ? undefined : message || "Vui lòng nhập email";
        }
    };
}

Validator.isLength = function(selector,min,message) {
    return {
        selector:selector,
        test:function(value) {
            return value.length >= min ? undefined : message || `Tối thiểu ${min} kí tự`;
        }
    };
}

Validator.isComfirm = function(selector,getConfirm,message) {
    return {
        selector:selector,
        test:function(value) {
            return value == getConfirm() ? undefined : message || "Giá trị nhập vào không chính xác";
        }
    };
}

