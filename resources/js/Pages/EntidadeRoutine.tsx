import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { usePage } from '@inertiajs/react';
import { createPublicKey } from 'crypto';

export default function EntidadeRoutine() {
    const [ selectedFilter, setSelectedFilter ] = useState(''); 
    const [ filterValue,    setFilterValue ] = useState(''); 

const handleConsultarClick = () => {

}

const loadIncludeEntidadeRoutine = () => {

}

    return (
        <div id="entidade-routine">
            <div className="content">
                <div className="container-fluid">
                    <div className="card">
                        <div className="card-header">
                            <h3 className="card-title">Entidade</h3>
                        </div>
                        <div className="card-body">
                            <div className="form-inline">
                                <label className="mr-3">Filtros</label>
                                <select onChange={(e) => {setSelectedFilter(e.target.value)}} className="custom-select mr-3">
                                    <option value={1}>Entidade</option>
                                    <option value={2}>Nome da entidade</option>
                                    <option value={3}>CNPJ</option>
                                    <option value={4}>Telefone</option>
                                </select>
                                <input onChange={(e) => setFilterValue(e.target.value)} type="text" className="form-control rounded w-50" placeholder="Insira o filtro desejado..." />
                                <a className="btn ml-3 btn-outline-primary" onClick={handleConsultarClick}>
                                    <i className="fas fa-search"></i> Consultar
                                </a>
                                <a className="btn ml-3 btn-outline-primary" onClick={loadIncludeEntidadeRoutine}>
                                    <i className="fas fa-plus"></i>Incluir
                                </a>
                            </div>
                        </div>
                        <div id="jsGrid1" className="jsgrid" style={{ position: 'relative', height: '100%', width: '100%' }}>
                            <div className="jsgrid-grid-header jsgrid-header-scrollbar">
                                <table className="jsgrid-table">
                                    <thead>
                                        <tr className="jsgrid-header-row">
                                            <th className="jsgrid-header-cell jsgrid-align-center jsgrid-header-sortable" style={{ width: '50px' }}>Entidade</th>
                                            <th className="jsgrid-header-cell jsgrid-align-center jsgrid-header-sortable" style={{ width: '250px' }}>Nome da entidade</th>
                                            <th className="jsgrid-header-cell jsgrid-align-center jsgrid-header-sortable" style={{ width: '70px' }}>CNPJ</th>
                                            <th className="jsgrid-header-cell jsgrid-align-center jsgrid-header-sortable" style={{ width: '150px' }}>CEP</th>
                                            <th className="jsgrid-header-cell jsgrid-align-center jsgrid-header-sortable" style={{ width: '150px' }}>Telefone</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/* {orcamentos.map((orcamento, index) => (
                                            <tr key={index} className={index % 2 === 0 ? 'jsgrid-row' : 'jsgrid-alt-row'} onContextMenu={(e) => handleContextMenu(e, orcamento)}>
                                                <td className="jsgrid-cell jsgrid-align-right" style={{ width: '50px' }}>{orcamento.id}</td>
                                                <td className="jsgrid-cell jsgrid-align-right" style={{ width: '50px' }}>{orcamento.cliente}</td>
                                                <td className="jsgrid-cell" style={{ width: '150px' }}>{orcamento.nome_cliente}</td>
                                                <td className="jsgrid-cell jsgrid-align-right" style={{ width: '50px' }}>{orcamento.fabricante}</td>
                                                <td className="jsgrid-cell" style={{ width: '150px' }}>{orcamento.nome_fabricante}</td>
                                                <td className="jsgrid-cell" style={{ width: '150px' }}>{orcamento.data_hora_cadastro}</td>
                                            </tr>
                                        ))} */}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* {contextMenu.visible && (
                <div style={{ top: contextMenu.y, left: contextMenu.x, position: 'absolute', zIndex: 1000, backgroundColor: '#fff', boxShadow: '0px 0px 10px rgba(0,0,0,0.2)' }}>
                    <ul className="list-group">
                        <li className="list-group-item list-group-item-action" onClick={handleAlterar}><i className="fas fa-pen pr-2"></i>Alterar</li>
                        <li className="list-group-item list-group-item-action" onClick={handleExcluir}><i className="fas fa-trash pr-2"></i>Excluir</li>
                        <li className="list-group-item list-group-item-action" onClick={handleImprimir}><i className="fas fa-print pr-2"></i>Imprimir</li>
                    </ul>
                </div>
            )} */}
        </div>
    );
}