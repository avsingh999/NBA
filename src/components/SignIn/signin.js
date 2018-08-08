import React, { Component } from "react";
import style from './signin.css';
import FormField from "../widgets/FormFields/formFields";
class SignIn extends Component {
    state = {
        registerError:'',
        loading:false,
        formdata:{
            email:{
                element:'input',
                value:'',
                config:{
                    name:'email_input',
                    type:'email',
                    placeholder:'Enter eMail'
                },
                validation:{
                    required:true,
                    email:true
                },
                valid:false,
                touched:false,
                validationMessage:''
                
            },
            password:{
                element:'input',
                value:'',
                config:{
                    name:'password_input',
                    type:'password',
                    placeholder:'Enter password'
                },
                validation:{
                    required:true,
                    password:true
                },
                valid:false,
                touched:false,
                validationMessage:''
            }
        }
    }

    updateForm = (element) => {
        const newFormdata = {
            ...this.state.formdata
        }
        const newElement = {
            ...newFormdata[element.id]
        }
        newElement.value = element.event.target.value;
        newFormdata[element.id] = newElement;
        if(element.blur) {
            let valiData = this.validate(newElement)
        }
        newFormdata[element.id] = newElement;

        this.setState({
            formdata:newFormdata
        })
    }

    render(){
        return(
            <div className={style.logContainer}>
            <h2>Register/Login</h2>
                <FormField
                id={"email"}
                formdata={this.state.formdata.email}
                change={(element)=>this.updateForm(element)}
                />
                <FormField
                id={"password"}
                formdata={this.state.formdata.password}
                change={(element)=>this.updateForm(element)}
                />
            </div>
        )
    }
}

export default SignIn ;