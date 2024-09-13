import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { createPublicKey } from 'crypto';

interface Cliente {
    nome        : string,
    fantasia    ?: string,
    endereco    ?: string,
    rg          ?: string,
    cpf_cnpj    ?: string,
    cidade      ?: string,
    uf          ?: string,
    bairro      ?: string,
    complemento ?: string,
    cep         ?: string,
    telefone    ?: string,
    celular     ?: string,
    vendedor    ?: string
}

interface Produto {
    nome           :  '',
    quantidade     ?: string,
    valor_unitario :  string,
    desconto       ?: string,
    acrescimo      ?: string
}

export default function IncludeRoutine() {
    const [cliente, setCliente] = useState<Cliente>({
        nome:        '',
        fantasia:    '',
        endereco:    '',
        rg:          '',
        cpf_cnpj:    '',
        cidade:      '',
        uf:          '',
        bairro:      '',
        complemento: '',
        cep:         '',
        telefone:    '',
        celular:     '',
        vendedor:    ''
    });

    const [produto, setProduto] = useState<Produto>({
        nome           : '',
        quantidade     : '',
        valor_unitario : '',
        desconto       : '',
        acrescimo      : ''
    });

    const [fabricante, setFabricante]     = useState('');
    const [cnpj, setCnpj]                 = useState('');
    const [products, setProducts]         = useState<Produto[]>([]); 
    const [editingIndex, setEditingIndex] = useState<number | null>(null); 
    const [isGridLocked, setIsGridLocked] = useState(false); 

    const handleClienteChange = (element: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = element.target;
        setCliente(prevCliente => ({
            ...prevCliente,
            [name]: value
        }));
    };

    const handleProdutoChange = (element: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = element.target;

        setProduto(previousProduct => ({
            ...previousProduct,
            [name]: value
        }));
    };

    const getValidationMessagesAddOrUpdateProduct = () => {
        if (!produto.nome) {
            return 'Informe o nome do produto.';
        }

        if (!produto.valor_unitario) {
            return 'Informe o valor do produto';
        }
    };

    const addOrUpdateProduct = () => {
        const newProduct: Produto = { 
            nome           : produto.nome,
            quantidade     : produto.quantidade,
            valor_unitario : produto.valor_unitario,
            desconto       : produto.desconto,
            acrescimo      : produto.acrescimo
         };

        if (editingIndex !== null) {
            const updatedProducts = [...products];
            
            updatedProducts[editingIndex] = newProduct;

            setProducts(updatedProducts);

            resetEditing();
        } 
        else {
            setProducts([...products, newProduct]);
            resetFields();
        }
    };

    const resetFields = () => {
        setProduto({
            nome           : '',
            quantidade     : '',
            valor_unitario : '',
            desconto       : '',
            acrescimo      : ''
        })
    };

    const resetEditing = () => {
        setEditingIndex(null);
        setIsGridLocked(false);
        resetFields();
    };

    const handleAddButtonClick = () => {
        const validationMessage = getValidationMessagesAddOrUpdateProduct();

        if (validationMessage) {
            alert(validationMessage);
            return;
        }

        addOrUpdateProduct();
    };

    const handleEditProduct = (index: number) => {
        const productToEdit = products[index];

        setProduto({
            nome           : productToEdit.nome,
            quantidade     : productToEdit.quantidade,
            valor_unitario : productToEdit.valor_unitario,
            desconto       : productToEdit.desconto,
            acrescimo      : productToEdit.acrescimo
        })

        setEditingIndex(index);
        setIsGridLocked(true);
    };

    const handleDeleteProduct = (index: number) => {
        const updatedProducts = products.filter((_, i) => i !== index);

        setProducts(updatedProducts);
    };

    const handleConfirm = () => {
        const validationMessage = getConfirmValidationMessages()
        
        if(validationMessage) {
            return alert(validationMessage);
        }

        const formData = new FormData();
        
        Object.keys(cliente).forEach(key => {
            formData.append(`cliente[${key}]`, cliente[key as keyof Cliente] || '');
        });

        formData.append('fabricante[nome]', fabricante);
        formData.append('fabricante[cnpj]', cnpj);

        products.forEach((produto, index) => {
            Object.keys(produto).forEach(key => {
                formData.append(`produtos[${index}][${key}]`, produto[key as keyof Produto] || '');
            });
        });

        Inertia.post('/orcamento/routine/include', formData, {
            onError : error => console.log(error),
            onSuccess : success => console.log(success)
        });
    };

    const getConfirmValidationMessages = () => {
        if(!cliente.nome) {
            return 'É obrigatório informar o nome do cliente.';
        }

        if(products.length == 0) {
            return 'É obrigatório informar ao menos um produto.';
        }
    }

    const handleCancel = () => {
        Inertia.visit(`/Routine`, {
            preserveState: true,
            preserveScroll: true, 
        });

        window.history.back();
    };

    const renderIncludeRoutine = () => {
        return (
            <>
                <div className="card">
                    <div className="card-header mt-2">
                        <h3 className="card-title">Orçamento</h3>
                    </div>
                    <div className="card ml-3 mr-3 mt-3">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-5">
                                    <label className="mr-3">Cliente</label>
                                    <input name="nome" value={cliente.nome} onChange={handleClienteChange} id="nome-cliente" type="text" className="form-control rounded w-50" placeholder="Insira o nome do cliente..."/>
                                </div>
                                <div className="col-md-5">
                                    <label className="mr-3">Fantasia</label>
                                    <input name="fantasia" value={cliente.fantasia} onChange={handleClienteChange} id="nome-cliente" type="text" className="form-control rounded w-50" placeholder="Insira o nome fantasia..."/>
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-md-5">
                                    <label className="mr-3">Endereço</label>
                                    <input name="endereco" value={cliente.endereco} onChange={handleClienteChange} id="nome-cliente" type="text" className="form-control rounded w-50" placeholder="Insira o endereço..."/>
                                </div>
                                <div className="col-md-5">
                                    <label className="mr-3">RG</label>
                                    <input name="rg" value={cliente.rg} onChange={handleClienteChange} id="nome-cliente" type="text" className="form-control rounded w-50" placeholder="Insira o RG..."/>
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-md-5">
                                    <label className="mr-3">CPF/CNPJ</label>
                                    <input name="cpf_cnpj" value={cliente.cpf_cnpj} onChange={handleClienteChange} id="nome-cliente" type="text" className="form-control rounded w-50" placeholder="Insira o CPF/CNPJ..."/>
                                </div>
                                <div className="col-md-5">
                                    <label className="mr-3">Cidade</label>
                                    <input name="cidade" value={cliente.cidade} onChange={handleClienteChange} id="nome-cliente" type="text" className="form-control rounded w-50" placeholder="Insira a cidade..."/>
                                </div>
                                <div className="col-md-2">
                                    <label className="mr-3">UF</label>
                                    <input name="uf" value={cliente.uf} onChange={handleClienteChange} id="nome-cliente" type="text" className="form-control rounded w-50" placeholder="UF"/>
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-md-5">
                                    <label className="mr-3">Bairro</label>
                                    <input name="bairro" value={cliente.bairro} onChange={handleClienteChange} id="nome-cliente" type="text" className="form-control rounded w-50" placeholder="Insira o bairro..."/>
                                </div>
                                <div className="col-md-5">
                                    <label className="mr-3">Complemento</label>
                                    <input name="complemento" value={cliente.complemento} onChange={handleClienteChange} id="nome-cliente" type="text" className="form-control rounded w-50" placeholder="Insira o complemento..."/>
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-md-5">
                                    <label className="mr-3">CEP</label>
                                    <input name="cep" value={cliente.cep} onChange={handleClienteChange} id="nome-cliente" type="text" className="form-control rounded w-50" placeholder="Insira o cep..."/>
                                </div>
                                <div className="col-md-5">
                                    <label className="mr-3">Telefone</label>
                                    <input name="telefone" value={cliente.telefone} onChange={handleClienteChange} id="nome-cliente" type="text" className="form-control rounded w-50" placeholder="Insira o telefone..."/>
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-md-5">
                                    <label className="mr-3">Celular</label>
                                    <input name="celular" value={cliente.celular} onChange={handleClienteChange} id="nome-cliente" type="text" className="form-control rounded w-50" placeholder="Insira o celular..."/>
                                </div>
                                <div className="col-md-5">
                                    <label className="mr-3">Vendedor</label>
                                    <input name="vendedor" value={cliente.vendedor} onChange={handleClienteChange} id="nome-cliente" type="text" className="form-control rounded w-50" placeholder="Insira o vendedor..."/>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                    <div className="card ml-3 mr-3">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-5">
                                    <label>Fabricante</label>
                                    <input value={fabricante} onChange={(e) => setFabricante(e.target.value)} id="nome-fabricante" type="text" className="form-control rounded w-50" placeholder="Insira o nome do fabricante..." />
                                </div>
                                <div className="col-md-5">
                                    <label>CNPJ</label>
                                    <input value={cnpj} onChange={(e) => setCnpj(e.target.value)} id="cnpj-fabricante" type="text" className="form-control rounded w-50" placeholder="Insira o cnpj do fabricante..." />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card ml-3 mr-3">
                        <div className="card-header">
                            <h3 className="card-title">Dados do Produto</h3>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-4">
                                    <label>Nome do produto</label>
                                    <input name="nome" value={produto.nome} onChange={handleProdutoChange} id="nome-produto" type="text" className="form-control rounded" placeholder="Insira o nome do produto..." disabled={isGridLocked && editingIndex === null} />
                                </div>
                                <div className="col-md-3">
                                    <label>Valor</label>
                                    <input name="valor_unitario" value={produto.valor_unitario} onChange={handleProdutoChange} id="valor-produto" type="number" className="form-control rounded" placeholder="Insira o valor..." disabled={isGridLocked && editingIndex === null} />
                                </div>
                                <div className="col-md-3">
                                    <label>Quantidade</label>
                                    <input name="quantidade" value={produto.quantidade} onChange={handleProdutoChange} id="nome-produto" type="text" className="form-control rounded" placeholder="Insira a quantidade..." disabled={isGridLocked && editingIndex === null} />
                                </div>
                            </div>
                            <div className="row mt-3">
                                
                                <div className="col-md-5">
                                    <label>Desconto</label>
                                    <input name="desconto" value={produto.desconto} onChange={handleProdutoChange} id="valor-produto" type="number" className="form-control rounded" placeholder="Insira o desconto..." disabled={isGridLocked && editingIndex === null} />
                                </div>
                                <div className="col-md-5">
                                    <label>Acréscimo</label>
                                    <input name="acrescimo" value={produto.acrescimo} onChange={handleProdutoChange} id="nome-produto" type="text" className="form-control rounded" placeholder="Insira o acréscimo..." disabled={isGridLocked && editingIndex === null} />
                                </div>
                                
                                <div className="col-md-2 d-flex align-items-end ml-auto">
                                    {editingIndex !== null ? (
                                        <>
                                            <button type="button" className="btn btn-success w-100 mr-2" onClick={() => handleAddButtonClick()}>Alterar</button>
                                            <button type="button" className="btn btn-secondary w-100" onClick={resetEditing}>Cancelar</button>
                                        </>
                                    ) :
                                    (
                                        <button type="button" className="btn btn-primary w-100" onClick={() => handleAddButtonClick()}>Adicionar</button>
                                    )}
                                </div>  
                            </div>

                        </div>
                    </div>
                </div>
                {renderProductGrid()}
            </>
        );
    };

    const renderProductGrid = () => {
        return (
            <div className="card mt-4" style={{ height: '300px' }}>
                <div className="card-header">
                    <h3 className="card-title">Produtos</h3>
                </div>
                <div className="card-body" style={{ overflowY: 'auto' }}>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Produto</th>
                                <th>Quantidade</th>
                                <th>Valor</th>
                                <th>Desconto</th>
                                <th>Acréscimo</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product, index) => (
                                <tr key={index}>
                                    <td>{product.nome}</td>
                                    <td>{product.quantidade}</td>
                                    <td>{product.valor_unitario}</td>
                                    <td>{product.desconto}</td>
                                    <td>{product.acrescimo}</td>
                                    <td>
                                        <button className="btn btn-sm mr-2" onClick={() => handleEditProduct(index)} disabled={isGridLocked}> <i className="fas fa-pencil-alt"></i> </button>
                                        <button className="btn btn-sm" onClick={() => handleDeleteProduct(index)} disabled={isGridLocked}> <i className="fas fa-trash"></i> </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    };

    return (
        <div id="include-routine">
            <div className="content">
                <div className="container-fluid">
                    {renderIncludeRoutine()}
                </div>
            </div>
            <div className="bg-light p-3 d-flex justify-content-end">
    <button className="btn btn-primary mr-2" onClick={handleConfirm}>Confirmar</button>
    <button className="btn btn-secondary" onClick={handleCancel}>Cancelar</button>
</div>
        </div>
    );
}