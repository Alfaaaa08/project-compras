import React from 'react';
import Sidebar from './Sidebar';
import Routine from './Routine';
import { InertiaApp } from '@inertiajs/inertia-react';
console.log('fnsjadk')
type MainLayoutProps = {
    children: React.ReactNode;
};

export default function MainLayout({ children }: MainLayoutProps) {
    return (
        <div className="wrapper">
            <Sidebar />
            <Routine />
            <div className="content-wrapper">
                {children} {/* Dynamic content goes here */}
            </div>
            <footer className="main-footer">
            <div className="row">
                <div className="col-md-3 offset-md-0">
                    <form action="">
                        <div className="input-group">
                            <input type="search" className="form-control form-control-lg" placeholder="Procure pela rotina"></input>
                            <div className="input-group-append">
                                <button type="submit" className="btn btn-lg btn-default">
                                    <i className="fa fa-search"></i>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </footer>
        </div>
    );
}