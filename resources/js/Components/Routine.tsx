import { Inertia } from '@inertiajs/inertia';
import { usePage } from '@inertiajs/react';

interface Orcamento {
    cliente?: number;
    nome_cliente?: string;
    fabricante?: number;
    nome_fabricante?: string;
}

export default function Routine() {
    
    const { orcamentos } = usePage<{ orcamentos: Orcamento[] }>().props;
    
    const loadIncludeRoutine = () => {
        Inertia.visit(`/includeRoutine`, {
            preserveState: true,
            preserveScroll: true, 
        });
    }

    const renderRoutineCard = () => {
        return (
            <div className="card">
                <div className="card-header">
                    <h3 className="card-title">Orçamento</h3>
                </div>
                <div className="card-body">
                    <div className="form-inline">
                        <label className="mr-3">Filtros</label>
                        <select className="custom-select mr-3">
                            <option>Cliente</option>
                            <option selected>Nome do cliente</option>
                            <option>Produto</option>
                            <option>Nome do produto</option>
                            <option>Fabricante</option>
                            <option>Nome do fabricante</option>
                        </select>
                        <input type="text" className="form-control rounded w-50" placeholder="Insira o filtro desejado..."></input>
                        <a className="btn btn-app" onClick={ () => loadIncludeRoutine()}>
                            <i className="fas fa-plus"></i> Incluir
                        </a>
                    </div>
                </div>
                <div id="jsGrid1" className="jsgrid" style={{ position: 'relative', height: '100%', width: '100%' }}>
                    <div className="jsgrid-grid-header jsgrid-header-scrollbar">
                        <table className="jsgrid-table">
                            <thead>
                                <tr className="jsgrid-header-row">
                                    <th className="jsgrid-header-cell jsgrid-header-sortable" style={{ width: '50px' }}>Cliente</th>
                                    <th className="jsgrid-header-cell jsgrid-align-right jsgrid-header-sortable" style={{ width: '150px' }}>Nome do cliente</th>
                                    <th className="jsgrid-header-cell jsgrid-align-center jsgrid-header-sortable" style={{ width: '50px' }}>Fabricante</th>
                                    <th className="jsgrid-header-cell jsgrid-align-center jsgrid-header-sortable" style={{ width: '150px' }}>Nome do fabricante</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orcamentos.map((orcamento, index) => (
                                    <tr key={index} className={index % 2 === 0 ? 'jsgrid-row' : 'jsgrid-alt-row'}>
                                        <td className="jsgrid-cell jsgrid-align-right" style={{ width: '50px' }}>{orcamento.cliente}</td>
                                        <td className="jsgrid-cell" style={{ width: '150px' }}>{orcamento.nome_cliente}</td>
                                        <td className="jsgrid-cell jsgrid-align-right" style={{ width: '50px' }}>{orcamento.fabricante}</td>
                                        <td className="jsgrid-cell" style={{ width: '150px' }}>{orcamento.nome_fabricante}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div id="routine">
            <div className="content">
                <div className="container-fluid">{renderRoutineCard()}</div>
            </div>
        </div>
    );
}