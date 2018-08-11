import React, { Component } from 'react';
import FormField from '../widgets/FormFields/formFields';
import style from './dashboard.css';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html'
import { firebaseTeams, firebaseArticles, firebase } from '../../firebase'
import Uploader from '../widgets/fileuploader/fileupload';

class Dashboard extends Component {

    state = {
        editorState:EditorState.createEmpty(),
        postError:'',
        loading:false,
        formdata:{
            author:{
                element:'input',
                value:'',
                config:{
                    name:'author_input',
                    type:'text',
                    placeholder:'Enter Author Name'
                },
                validation:{
                    required:true,
                },
                valid:false,
                touched:false,
                validationMessage:''
                
            },
            title:{
                element:'input',
                value:'',
                config:{
                    name:'title_input',
                    type:'text',
                    placeholder:'Enter the title'
                },
                validation:{
                    required:true,
                },
                valid:false,
                touched:false,
                validationMessage:''
            },
            body:{
                element:'texeditor',
                value:'',
                valid:true,
                touched:false,
                validationMessage:'CHill'
            },
            image:{
                element:'image',
                value:'',
                valid:true,
                touched:false,
                validationMessage:'CHill'
            },
            team:{
                element:'select',
                value:'',
                config:{
                    name:'teams_input',
                    options:[]
                },
                validation:{
                    required:true,
                },
                valid:false,
                touched:false,
                validationMessage:''
            }
        }
    }

    updateForm = (element, content='') => {
        // console.log("________>"+element)
        const newFormdata = {
            ...this.state.formdata
        }
        const newElement = {
            ...newFormdata[element.id]
        }

        if(content === ''){
            newElement.value = element.event.target.value
        } else{
            newElement.value = content
        }

        if(element.blur) {
            let validData = this.validate(newElement);
            console.log(validData)
            console.log("ME aagya")
            // console.log("&&&&&&&&&&&&&&&&&&&&&" + content)
            newElement.valid = validData[0];
            newElement.validationMessage = validData[1];
        }
        
        newElement.touched = element.blur;
        newFormdata[element.id] = newElement;
        // console.log(newFormdata)
        this.setState({
            formdata:newFormdata
        })
    }

    validate = (element) => {
        let error = [true, ''];

        if(element.validation.required){
            const valid = element.value.trim() !=='';
            const message = `${!valid ? 'This is reuiered':''}`
            error = !valid ? [valid, message] : error
        }
        return error;
    }

    sumbitForm = () => {
        let dataToSumbit = {};
        let formIsValid = true;
        for(let key in this.state.formdata ) {
            dataToSumbit[key] = this.state.formdata[key].value;
        }
        for(let key in this.state.formdata){
            formIsValid = this.state.formdata[key].valid && formIsValid;
        }

        console.log(dataToSumbit)
        if(formIsValid){
            console.log("POSTTTTTTTtt")
            this.setState({
                loading:true,
                postError:''
            })
            firebaseArticles.orderByChild("id")
            .limitToLast(1).once('value')
            .then( snapshot => {
                let articleId = null;
                snapshot.forEach(childSnapshot => {
                    articleId = childSnapshot.val().id
                })
                console.log(articleId)
                dataToSumbit['date'] = firebase.database.ServerValue.TIMESTAMP
                dataToSumbit['id'] = articleId+1
                dataToSumbit['team'] = parseInt(dataToSumbit['team']);
                firebaseArticles.push(dataToSumbit)
                .then( article => {
                    // alert(this.props.history)
                    console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")

                    this.props.history.push(`articles/${article.id}`)
                }).catch(e=>{
                    this.setState({
                        postError:e.message
                    })
                })
            })


        }
        else{
            this.setState({
                postError:'SOmething went wromg'
            })
        }
    }

    componentDidMount() {
        this.loadTeams()
    }

    loadTeams = () => {
        let team = [];
        firebaseTeams.once('value')
        .then((snapshot)=>{
        
        snapshot.forEach((childSnapshot)=> {
            team.push({
                id:childSnapshot.val().id,
                name: childSnapshot.val().city
            })
            // console.log(childSnapshot.val())


        })
        const newFormdata = {...this.state.formdata};
        const newElement = {...newFormdata['team']};
        newElement.config.options = team;
        newFormdata['team'] = newElement;
        // console.log(newFormdata)
        this.setState({
            formdata:newFormdata
        })
    })
    }
    sumbitButtons = () => (

        this.state.loading ? 
        '...loading...'
        :
        
        <div>
            <button type="sumbit">Sumbit </button>
        </div>
    )
    sumbitError = () => {
        
        this.state.postError !== '' ?
        // console.log(this.state.postError)
        alert(this.state.postError)
        :
        ''
    }
    onEditorStateChange = (editorState) => {

        let contentState = editorState.getCurrentContent();
        let rawState = convertToRaw(contentState);
        let html = stateToHTML(contentState)
        console.log(html)
        this.updateForm({id:'body'},html)
        this.setState({
            editorState
        })
    }

    storeFilename = (filename) => {
        this.updateForm({id:'image'}, filename)
    }

    render(){
        return(
            <div className={style.postContainer}>
                <form onSubmit={this.sumbitForm}>
                    <h2>Add post</h2>
                    
                    <div><Uploader 
                        filename = {(filename) => this.storeFilename(filename)}
                    /> </div>
                    <FormField
                    id={'author'}
                    formdata={this.state.formdata.author}
                    change={(element)=>this.updateForm(element)}
                    />
                    <FormField
                    id={'title'}
                    formdata={this.state.formdata.title}
                    change={(element)=>this.updateForm(element)}
                    />
                    <Editor
                        editorState={this.state.editorState}
                        wrapperClassName="myEditor-wrapper"
                        editorClassName="myEditor-editor"
                        onEditorStateChange={this.onEditorStateChange}
                    
                    />
                    <FormField
                    id={'team'}
                    formdata={this.state.formdata.team}
                    change={(element)=>this.updateForm(element)}
                    
                    />
                    { this.sumbitButtons() }

                </form>
                
                { this.sumbitError() }

            </div>
        )
    }


}

export default Dashboard;