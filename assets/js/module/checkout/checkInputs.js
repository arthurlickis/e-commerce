export default class CheckInputs {
    constructor() {
        this.formCheckout = document.querySelector(".form-checkout");
        this.labels = document.querySelectorAll("label");
        this.inputs = document.querySelectorAll(".form-checkout__input");
    };

    validFormCheckout() {
        this.removeErrorMesage();
        
        const checks = [
            { method: this.isEmpty.bind(this), name: "isEmpty" },
            { method: this.onlyLettersInName.bind(this), name: "onlyLettersInName" },
            { method: this.searchAtAndDot.bind(this), name: "searchAtAndDot" },
            { method: this.checkLengthInputs.bind(this), name: "checkLengthInputs" },
            { method: this.validCpf.bind(this), name: "validCpf" }
        ];
        
        let isValid = true;
    
        for (let check of checks) {
            switch (check.name) {
                case "isEmpty":
                case "onlyLettersInName":
                case "searchAtAndDot":
                case "checkLengthInputs":
                case "validCpf":
                    if (!check.method()) {
                        isValid = false;
                    }
                    break;
            };
        };
        return isValid;
    };
    

    errorMesage(msg) {
        const divError = document.createElement("div");
        divError.classList.add("error");
        divError.innerText = msg;
        return divError;
    };

    removeErrorMesage() {
        const errorMesage = this.formCheckout.querySelectorAll(".error");
        errorMesage.forEach(msg => msg.remove());
    };

    showLabel(index) {
        return this.labels[index].innerText;
    };

    isEmpty() {
        let isValid = true;
        this.inputs.forEach((input, index) => {
            if (input.value === "") {
                input.insertAdjacentElement("afterend", this.errorMesage(`O campo ${this.showLabel(index)} não pode estar vazio!`));
                isValid = false;
            };
        });
        return isValid;
    };

    onlyLettersInName() {
        let isValid = true;
        const regex = /^[a-zA-Z\s]+$/;
        this.inputs.forEach((input, index) => {
            if (input.classList.contains("name")) {
                if (!regex.test(input.value)) {
                    input.insertAdjacentElement("afterend", this.errorMesage(`O campo ${this.showLabel(index)} aceita apenas letras!`));
                    isValid = false;
                };
            };
        });
        return isValid;
    };

    searchAtAndDot() {
        let isValid = true;
        this.inputs.forEach((input, index) => {
            if (input.classList.contains("email")) {
                const hasAt = input.value.indexOf("@");
                const hasDot = input.value.lastIndexOf(".");
                if (hasAt <= -1 || hasDot <= -1) {
                    input.insertAdjacentElement("afterend", this.errorMesage(`O campo ${this.showLabel(index)} está faltando incompleto!`));
                    isValid = false;
                };
            };
        });
        return isValid;
    };

    validCpf() {
        let isValid = true;
        this.inputs.forEach((input, index) => {
            if (input.classList.contains("cpf")) {
                const cpf = input.value;

                const cleanCpf = cpf.replace(/\D+/g, '');
                
                if (cleanCpf.length !== 11) {
                    input.insertAdjacentElement("afterend", this.errorMesage(`O campo ${this.showLabel(index)} está com uma quantia de caracteres inválida!`));
                    isValid = false;
                };

                if (cleanCpf.charAt(0).repeat(11) === cleanCpf) {
                    input.insertAdjacentElement("afterend", this.errorMesage(`O campo ${this.showLabel(index)} está inválido!`));
                    isValid = false;
                };

                const cpfNoDigits = cleanCpf.slice(0, 9);
                const cpfDigtOne = this.generatesDigit(cpfNoDigits);
                const cpfDigtTwo = this.generatesDigit(cpfNoDigits + cpfDigtOne);

                const newCpf = cpfNoDigits + cpfDigtOne + cpfDigtTwo;
                if (newCpf !== cleanCpf) {
                    input.insertAdjacentElement("afterend", this.errorMesage(`O campo ${this.showLabel(index)} não é válido!`));
                    isValid = false;
                };
            };
        });
        return isValid;
    };

    generatesDigit(cpfNoDigits) {
        let total = 0;
        let reverse = cpfNoDigits.length + 1;
    
        for(let stringNumbers of cpfNoDigits) {
          total += reverse * Number(stringNumbers);
          reverse--;
        };
    
        const digit = 11 - (total % 11);
        return digit <= 9 ? String(digit) : '0';
    };

    checkLengthInputs() {
        let isValid = true;
        this.inputs.forEach((input, index) => {
            if (!(input.classList.contains("cpf"))) {
                if (input.value.length < 10 || input.value.length > 50) {
                    input.insertAdjacentElement("afterend", this.errorMesage(`O campo ${this.showLabel(index)} precisa ter entre 10 a 50 caracteres!`));
                    isValid = false;
                };
            };
        });
        return isValid;
    };
};