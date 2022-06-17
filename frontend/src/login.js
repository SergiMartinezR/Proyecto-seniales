import React, { Component, component } from 'react';

class Login extends Component {

    state = {
        credentials: { username: '', password: '' }
    }

    login = event => {
        console.log(this.state.credentials);
        fetch('http://127.0.0.1:8000/login/', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(this.state.credentials)
        }).then(data => data.json()).then(
            data => {
                console.log(data.token);
            }
        ).catch(error => console.error(error))
    }

    inputChanged = event => {
        const cred = this.state.credentials;
        cred[event.target.name] = event.target.value;
        this.setState({credentials: cred})
    }

    render() {
        return (
            <div>
                <h1>Iniciar Sesión</h1>
                <label>
                    Número de teléfono:
                    <input type="text" name="username"
                        value={this.state.credentials.username}
                        onChange = {this.inputChanged}
                    />
                </label>
                <br />
                <label>
                    Contraseña:
                    <input type="password" name="password"
                        value={this.state.credentials.password}
                        onChange = {this.inputChanged}
                    />
                </label>
                <br />
                <button onClick={this.login}>Iniciar Sesión</button>
            </div>
        );
    }

}

export default Login;