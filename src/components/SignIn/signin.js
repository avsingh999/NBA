import React, { Component } from "react";
import style from './signin.css';
import FormField from "../widgets/FormFields/formFields";
import {firebase} from '../../firebase';

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
            let validData = this.validate(newElement);
            console.log(validData)
            newElement.valid = validData[0];
            newElement.validationMessage = validData[1];
        }
        newElement.touched = element.blur;
        newFormdata[element.id] = newElement;
        console.log(newFormdata)
        this.setState({
            formdata:newFormdata
        })
    }
    validate = (element) => {
        let error = [true, ''];
        if(element.validation.email){
            const valid = /\S+@\S+\.\S+/.test(element.value)
            const message = `${!valid ? 'Must be valid mail':'valid'}`
            error = !valid ? [valid, message] : error
        }

        if(element.validation.password){
            const valid = element.value.length>=5;
            const message = `${!valid ? 'Must be grater 5':'validd'}`
            error = !valid ? [valid, message] : error
        }


        if(element.validation.required){
            const valid = element.value.trim() !=='';
            const message = `${!valid ? 'THis is reuiered':''}`
            error = !valid ? [valid, message] : error
        }
        return error;
    }
    sumbitButtons = () => (

        this.state.loading ? 
        '...loading...'
        :
        
        <div>
            <button onClick={(event)=>this.sumbitForm(event, false)}>Register </button>
            <button onClick={(event)=>this.sumbitForm(event, true)}>Login </button>
        </div>
    )

    sumbitForm = (event, type) => {
        event.preventDefault();
        if(type !== null){
            let dataToSumbit = {};
            let formIsValid = true;
            for(let key in this.state.formdata ) {
                dataToSumbit[key] = this.state.formdata[key].value;
            }
            for(let key in this.state.formdata){
                formIsValid = this.state.formdata[key].valid && formIsValid;
            }

            if(formIsValid){
                this.setState({
                    loading:true,
                    registerError:''
                })
                if(type){
                    firebase.auth()
                    .signInWithEmailAndPassword(
                        dataToSumbit.email,
                        dataToSumbit.password
                    ).then(()=> {
                        this.props.history.push('/')
                    }).catch(error=>{
                        this.setState({
                            loading:false,
                        registerError:error.message
                        })
                    })
                }
                else{ 
                    firebase.auth()
                    .createUserWithEmailAndPassword(
                        dataToSumbit.email,
                        dataToSumbit.password
                    ).then(()=> {
                        this.props.history.push('/')
                    }).catch(error=>{
                        this.setState({
                            loading:false,
                        registerError:error.message
                        })
                    })
                }
            }
        }
    }

    sumbitError = () => {
        
        this.state.registerError !== '' ?
        <div className={style.error}> { this.state.registerError }</div>
        :
        console.log(this.state.registerError)
    }
    render(){
        return(
            <div className={style.logContainer}>
            <form onSubmit={(event)=>this.sumbitForm(event, null)}>
                <div className={style.logContainer2}>
                    <h2>Register / Login</h2>
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

                    { this.sumbitButtons() }
                    
                </div>
                { this.sumbitError() }
               
            </form>
            </div>
            
        )
    }
}

export default SignIn ;