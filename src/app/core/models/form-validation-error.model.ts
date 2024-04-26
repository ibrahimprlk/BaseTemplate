import { FormGroup } from "@angular/forms"

export interface FormValidationErrorModel{
    form:FormGroup 
    name?:string 
    controlName:string 
    validateName:string
}