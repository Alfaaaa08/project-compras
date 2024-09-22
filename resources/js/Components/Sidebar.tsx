import React, { useState, useEffect } from 'react';
import { Inertia } from '@inertiajs/inertia';

export default function Sidebar() {
    const [activeRoutine, setActiveRoutine] = useState<string | null>(null);

    useEffect(() => {
        const path = window.location.pathname;

        if (path.includes('routine')) {
            setActiveRoutine('routine');
        } 
        if (path.includes('entidade-routine')) {
            setActiveRoutine('entidade-routine');
        }
    }, []); 

    const loadMainPage = () => {
        Inertia.visit(`/`, {
            preserveState: true,
            preserveScroll: true, 
        });
    }

    const loadRoutine = (routineId: string) => {
        setActiveRoutine(routineId);
        
        Inertia.visit(`/${routineId}`, {
            preserveState: true,
            preserveScroll: true, 
            // only: ['routineComponent']
        });
    };

    return (
<aside className="main-sidebar sidebar-dark-primary elevation-4">
    <a href="#" className="brand-link" onClick={() => loadMainPage()}>
    <img src="/images/example-logo.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3"></img>
        
        <span className="brand-text font-weight-ligh">COMPRAS</span>
    </a>
    <div className="sidebar">
        <nav className="mt-2">
            <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu">
                <li className="nav-item menu-open">
                    <a href="#" className="nav-link active">
                        <p>
                            Rotinas
                        </p>
                    </a>
                    <ul className="nav nav-treeview">
                        <li className="nav-item">
                            <a href="#"className={`nav-link m-2 ${activeRoutine === 'routine' ? 'active' : ''}`} id="routine" onClick={(e: React.MouseEvent<HTMLAnchorElement>) => loadRoutine(e.currentTarget.id)}>
                                <i className="far fa-circle nav-icon"></i>
                                <p>Orçamento</p>
                            </a>
                            <a href="#"className={`nav-link m-2 ${activeRoutine === 'entidade-routine' ? 'active' : ''}`} id="entidade-routine" onClick={(e: React.MouseEvent<HTMLAnchorElement>) => loadRoutine(e.currentTarget.id)}>
                                <i className="far fa-circle nav-icon"></i>
                                <p>Entidades</p>
                            </a>
                        </li>
                    </ul>
                </li>
            </ul>
        </nav>
    </div>
</aside>
    );
}