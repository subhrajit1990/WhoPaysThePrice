export default class CommonValidationFunctions{
    constructor(){
        this.err="";
    }
    nullCheck(s) {
      this.err = s.length ? 0 : 5;
    return this.err;
    }
   
}
