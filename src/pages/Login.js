import React from 'react';

import TextField from '@material-ui/core/TextField';
import { Button, CircularProgress } from '@material-ui/core';


import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useHistory,
    withRouter
  } from "react-router-dom";

class Login extends React.Component {

    constructor(props) {
        super();
        this.state={
            email:"",
            errorEmail:"",
            password:"",
            errorPassword:"",
            isLoading:false
        }
    }



    emailChange(event){
        this.setState({
            email:event.target.value
        });

        if (event.target.value === "") {
            this.setState({
                errorEmail:"Email required."
            })
        }else{
            this.setState({
                errorEmail:""
            })
        }

    }

    passwordChange(event){
        this.setState({
            password:event.target.value
        });

        if (event.target.value === "") {
            this.setState({
                errorPassword:"password required."
            })
        }else{
            this.setState({
                errorPassword:""
            })
        }

    }


    redirect(){
        let history = useHistory();
        history.replace('/home');
    }
    

    login(){
        this.setState({
            isLoading:true
        });

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({"password":this.state.password,"email":this.state.email});

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        fetch("http://127.0.0.1:3500/users/auth", requestOptions)
        .then(response => 
            response.text()
        )
        .then(result => {
            console.log(result);
            let res =  JSON.parse(result);
            
            this.setState({
                isLoading:false
            });
            
            
            if (res.success) {
                // navigate to home and save tokens
                window.localStorage.setItem('token',res.token);
                this.props.history.push('/home');
            }

        })
        .catch(error => console.log('error', error));



    }



    render() {
        return (<div>

            <h1>login</h1>

            <TextField
                label="Email"
                id="email"
                value={this.state.email}
                helperText={this.state.errorEmail}
                margin="dense"
                variant="outlined"
                onChange={ (event)=>{ this.emailChange(event) } }
            />
            <TextField
                label="Password"
                id="password"
                value={this.state.password}
                helperText={this.state.errorPassword}
                margin="dense"
                variant="outlined"
                type="password"
                onChange={ (event)=>{ this.passwordChange(event) } }
            />
            <Button onClick={ ()=>{ this.login() } } disabled={ this.state.email === "" && this.state.password === "" } variant="contained">CONNECT</Button>
            {
                this.state.isLoading ?
                <div>
                    <CircularProgress />
                </div>
                :
                <div>
                    
                </div>
            }


        </div>);
    }
}

export default withRouter(Login) ;