import CommonValidationFunctions from './CommonValidationFunctions'

export default class CommonValidationEngine extends CommonValidationFunctions {
	constructor(form, formValidator) {
		super(); // must call while extending a class, this constructor is from extending class
		this.form = form;
		this.formValidator = formValidator;
	}

	commonValidatorValid(element, fnName) {
		console.log(element.type+" :: "+fnName);
		if (element.type === 'text' || element.type === 'textarea' || element.type === 'email' || element.type === 'tel') { // More element type goes here
			return this[fnName](element.value);
		} else {
			return this[fnName](element);
		}
	}

	commonValidationFields() {
		let errorCount = 0,
			element,
			n,
			tempForm = this.form,
			formValidator = this.formValidator,
			self = this;

		Object.keys(tempForm).map(function (key, index) {
			if (typeof parseInt(key) == "number" && !isNaN(parseInt(key))) {
				element = tempForm[index];
				if (!element.hasAttribute("name")) {
					n = element.id;
				} else if (element.hasAttribute("src")) {
					n = element.src;
				} else {
					n = element.name;
				}
				if (formValidator[n] && formValidator[n].verify) {
					(formValidator[n].verify).map(function (i, e) {
						let err = self.commonValidatorValid(element, i);
						if (err) {
							formValidator[n].err = err;
							element.className="error-box";
							console.log(element + "ERROR " + formValidator[n].message[e] || "Error occured"); // code for error message display
							errorCount++;
						}
					})
				}
			}
		});
		if (errorCount > 0) {
			return false;
		}
		console.log("Validation starts with validation engine" + this.form + " :: ");
		return true;
	}
}
