import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const handleLoginClick = () => {
        const data = {
            email,
            password
        };

        const messages = getLoginValidationMessages(data);

        if(messages) {
            alert(messages);

            return;
        }

        Inertia.visit(`/`);
    }

    /**
     * @param {Object} data 
     * @returns {Null|String}
     * @todo Verify if the email is correct.
     */
    const getLoginValidationMessages = (data: any) => {
        if(!data.email) {
            return 'O campo Email é obrigatório.';
        }

        if(!data.password) {
            return 'O campo Senha é obrigatório.';
        }

        return null;
    }

    return (
        <body className="hold-transition login-page">
    <div className="login-box">
        <div className="card">
            <div className="login-logo">
                <div className="login-logo pt-3">
                    <img src="/images/example-logo.png" alt="Logo" className="brand-image img-circle w-20"></img>
                    <a href="#"><b>Compras</b></a>
                </div>
            </div>
            <div className="card-body login-card-body">
                <p className="login-box-msg">
                    Faça login para acessar o sistema
                </p>

                <form action="#">
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
                    <div className="row">
                        <div className="col-8">
                            <div className="icheck-primary">
                                <input
                                    type="checkbox"
                                    id="remember"></input>
                                <label className="pl-2">Lembrar-me</label>
                            </div>
                        </div>
                        <div className="col-4">
                            <button
                                type="submit"
                                className="btn btn-primary btn-block"
                                onClick={handleLoginClick}>
                                Entrar
                            </button>
                        </div>
                    </div>
                </form>

                <p className="mb-1">
                    <a href="#">Esqueci minha senha</a>
                </p>
                <p className="mb-0">
                    <a href="#" className="text-center">
                        Registrar nova conta
                    </a>
                </p>
            </div>
        </div>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/admin-lte@3.2/dist/js/adminlte.min.js"></script>
</body>
    );
}
