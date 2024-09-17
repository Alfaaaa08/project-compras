import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { usePage } from '@inertiajs/react';
import { createPublicKey } from 'crypto';

interface Orcamento {
    id                 :  number;
    cliente            :  number;
    nome_cliente       ?: string;
    fabricante         ?: number;
    nome_fabricante    ?: string;
    data_hora_cadastro ?: string;
}

export default function Routine() {
    const [ selectedFilter, setSelectedFilter ] = useState(''); 
    const [ filterValue,    setFilterValue ] = useState(''); 
    const { orcamentos } = usePage<{ orcamentos: Orcamento[] }>().props;
    
    // Estado para controlar a posição e visibilidade do menu de contexto
    const [contextMenu, setContextMenu] = useState<{visible: boolean, x: number, y: number, item: number | null}>({
        visible: false,
        x: 0,
        y: 0,
        item: null
    });

    const loadIncludeRoutine = () => {
        Inertia.visit(`/includeRoutine`, {
            preserveState: true,
            preserveScroll: true, 
        });
    }

    const handleContextMenu = (event: React.MouseEvent, item: Orcamento) => {
        console.log(item)
        event.preventDefault();
        setContextMenu({
            visible: true,
            x: event.clientX,
            y: event.clientY,
            item: item.id
        });
    };

    const handleOutsideClick = () => {
        setContextMenu({
            visible: false,
            x: 0,
            y: 0,
            item: null
        });
    };

    const handleConsultarClick = () => {
        Inertia.visit(`/routine`, {
            data: {
                'selectedFilter' : selectedFilter,
                'filterValue' : filterValue
            },
            preserveState: true,
            preserveScroll: true, 
            // only: ['routineComponent']
        });

    }

    const handleAlterar = () => {
        if (contextMenu.item) {
            Inertia.visit(`/includeRoutine`, {
                data: {
                    'id' : contextMenu.item
                }
            });
        }
    };

    const handleExcluir = () => {
        const formData = new FormData();

        if(contextMenu.item) {
            formData.append('item', contextMenu.item.toString());

            Inertia.post('/orcamento/routine/delete', formData, {
                onError : error => console.log(error),
                onSuccess : success => console.log(success)
            });
        }
    }

    const handleImprimir = () => {
        const formData = new FormData();

        if(contextMenu.item) {
            formData.append('item', contextMenu.item.toString());
            Inertia.post('/orcamento/routine/print', formData)
        }
    }

    return (
        <div id="routine" onClick={handleOutsideClick}>
            <div className="content">
                <div className="container-fluid">
                    <div className="card">
                        <div className="card-header">
                            <h3 className="card-title">Orçamento</h3>
                        </div>
                        <div className="card-body">
                            <div className="form-inline">
                                <label className="mr-3">Filtros</label>
                                <select onChange={(e) => {setSelectedFilter(e.target.value)}} className="custom-select mr-3">
                                    <option value={1}>Cliente</option>
                                    <option value={2}>Nome do cliente</option>
                                    <option value={3}>Orçamento</option>
                                    <option value={4}>Produto</option>
                                </select>
                                <input onChange={(e) => setFilterValue(e.target.value)} type="text" className="form-control rounded w-50" placeholder="Insira o filtro desejado..." />
                                <a className="btn ml-3 btn-outline-primary" onClick={handleConsultarClick}>
                                    <i className="fas fa-search"></i> Consultar
                                </a>
                                <a className="btn ml-3 btn-outline-primary" onClick={loadIncludeRoutine}>
                                    <i className="fas fa-plus"></i>   Incluir
                                </a>
                            </div>
                        </div>
                        <div id="jsGrid1" className="jsgrid" style={{ position: 'relative', height: '100%', width: '100%' }}>
                            <div className="jsgrid-grid-header jsgrid-header-scrollbar">
                                <table className="jsgrid-table">
                                    <thead>
                                        <tr className="jsgrid-header-row">
                                            <th className="jsgrid-header-cell jsgrid-header-sortable" style={{ width: '50px' }}>Orçamento</th>
                                            <th className="jsgrid-header-cell jsgrid-header-sortable" style={{ width: '50px' }}>Cliente</th>
                                            <th className="jsgrid-header-cell jsgrid-align-right jsgrid-header-sortable" style={{ width: '150px' }}>Nome do cliente</th>
                                            <th className="jsgrid-header-cell jsgrid-align-center jsgrid-header-sortable" style={{ width: '50px' }}>Fabricante</th>
                                            <th className="jsgrid-header-cell jsgrid-align-center jsgrid-header-sortable" style={{ width: '150px' }}>Nome do fabricante</th>
                                            <th className="jsgrid-header-cell jsgrid-align-center jsgrid-header-sortable" style={{ width: '150px' }}>Data/Hora</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orcamentos.map((orcamento, index) => (
                                            <tr key={index} className={index % 2 === 0 ? 'jsgrid-row' : 'jsgrid-alt-row'} onContextMenu={(e) => handleContextMenu(e, orcamento)}>
                                                <td className="jsgrid-cell jsgrid-align-right" style={{ width: '50px' }}>{orcamento.id}</td>
                                                <td className="jsgrid-cell jsgrid-align-right" style={{ width: '50px' }}>{orcamento.cliente}</td>
                                                <td className="jsgrid-cell" style={{ width: '150px' }}>{orcamento.nome_cliente}</td>
                                                <td className="jsgrid-cell jsgrid-align-right" style={{ width: '50px' }}>{orcamento.fabricante}</td>
                                                <td className="jsgrid-cell" style={{ width: '150px' }}>{orcamento.nome_fabricante}</td>
                                                <td className="jsgrid-cell" style={{ width: '150px' }}>{orcamento.data_hora_cadastro}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {contextMenu.visible && (
                <div style={{ top: contextMenu.y, left: contextMenu.x, position: 'absolute', zIndex: 1000, backgroundColor: '#fff', boxShadow: '0px 0px 10px rgba(0,0,0,0.2)' }}>
                    <ul className="list-group">
                        <li className="list-group-item list-group-item-action" onClick={handleAlterar}><i className="fas fa-pen pr-2"></i>Alterar</li>
                        <li className="list-group-item list-group-item-action" onClick={handleExcluir}><i className="fas fa-trash pr-2"></i>Excluir</li>
                        <li className="list-group-item list-group-item-action" onClick={handleImprimir}><i className="fas fa-print pr-2"></i>Imprimir</li>
                    </ul>
                </div>
            )}
        </div>
    );
}