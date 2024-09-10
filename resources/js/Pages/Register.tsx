import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';

export default function Register() {
    const [name, setName]                       = useState('');
    const [email, setEmail]                     = useState('');
    const [password, setPassword]               = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    /**
     * @todo Add the registering of the user
     */
    const handleRegisterButtonClick = (e: any) => {
        e.preventDefault();

        const data = {
            name,
            email,
            password,
            confirmPassword
        }

        const messages = getRegisterValidationMessages(data);

        if(messages) {
            alert(messages)

            return;
        }

        Inertia.post('/save/register', data, {
            onError : error => console.log(error),
            onSuccess : success => console.log(success)
        });
    } 

    /**
     * @param {Object} data 
     * @return {Null|String}
     * @todo Verify if the email is already registered in the system.
     */
    const getRegisterValidationMessages = (data : any) => {
        if(!data.name) {
            return 'O campo Nome é obrigatório.'
        }
        if(!data.email) {
            return 'O campo Email é obrigatório.';
        }
        if(!data.password) {
            return 'O campo senha é obrigatório.';
        }
        if(!data.confirmPassword) {
            return 'Confirme sua senha.';
        }
        if(data.password != data.confirmPassword) {
            return 'Suas senhas não são iguais.'
        }

        return null;
    }

    return (
        <body className="hold-transition register-page">
            <div className="register-box">
                <div className="card">
                    <div className="login-logo">
                        <div className="login-logo pt-3">
                            <img src="/images/example-logo.png" alt="Logo" className="brand-image img-circle w-20"></img>
                            <a href="#"><b>Compras</b></a>
                        </div>
                    </div>
                    <div className="card-body register-card-body">
                        <p className="login-box-msg">Registrar nova conta</p>

                        <form action="#" noValidate>
                            <div className="input-group mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Nome completo"
                                    onChange={(e) => setName(e.target.value)}></input>
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-user"></span>
                                    </div>
                                </div>
                            </div>
                            <div className="input-group mb-3">
                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="Email"
                                    onChange={(e) => setEmail(e.target.value)}></input>
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-envelope"></span>
                                    </div>
                                </div>
                            </div>
                            <div className="input-group mb-3">
                                {/* @todo Add an 'eye' button to show/hide the password */}
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Senha"
                                    onChange={(e) => setPassword(e.target.value)}></input>
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-lock"></span>
                                    </div>
                                </div>
                            </div>
                            <div className="input-group mb-3">
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Confirme a senha"
                                    onChange={(e) => setConfirmPassword(e.target.value)}></input>
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-lock"></span>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-8">
                                    <div className="icheck-primary">
                                        <input
                                            type="checkbox"
                                            id="agreeTerms"
                                            name="terms"
                                            value="agree"></input>
                                        <label htmlFor="agreeTerms" className="pl-2">
                                            Eu aceito os <a href="#">termos</a>
                                        </label>
                                    </div>
                                </div>
                                <div className="col-4">
                                    <button
                                        className="btn btn-primary btn-block"
                                        onClick={(e) => handleRegisterButtonClick(e)}>
                                        Registrar
                                    </button>
                                </div>
                            </div>
                        </form>

                        <p className="mb-0">
                            <a href="/login" className="text-center">
                                Já tenho uma conta
                            </a>
                        </p>
                    </div>
                </div>
            </div>
            <script src="https://cdn.jsdelivr.net/npm/admin-lte@3.2/dist/js/adminlte.min.js"></script>
        </body>
    );
}