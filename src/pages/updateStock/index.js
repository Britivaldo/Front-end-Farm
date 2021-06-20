import { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';

import api from '../../services/api';

export default function UpdateStock (){

    const [ codigo, setCodigo ] = useState(0);
    const [ nome, setNome ] = useState('');
    const [ quantidade, setQuantidade ] = useState(0);
    const [ preco, setPreco ] = useState(0);
    const [ descricao, setDescricao ] = useState('');
    
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(()=> {
        console.log('test');
        const fetchProductId = async () => {
            await api.get(`/estoque/${id}`).then( response => {
                console.log(response.data[0])
                const { codigo, nome, preco, quantidade, descricao } = response.data[0];
                setCodigo(codigo);
                setNome(nome);
                setPreco(preco);
                setDescricao(descricao);
                setQuantidade(quantidade);
            });

        }

        fetchProductId();
    },[id]);

    async function onSubmit(ev) {
        ev.preventDefault();
        
        await api.put(`/produtos/${codigo}`,{ nome, descricao, preco }).then( async response => 

            await api.put(`/estoque/${id}`, { id_produto:codigo, quantidade}).then( response =>  alert('sucesso!'))
        );

        navigate('/');
    };

    return (
        <section>
            <header>
                <h2>Atualizar produto</h2>
            </header>
        <div>
            <form onSubmit={onSubmit}>
                <label>
                    Código:
                    <input 
                        name='codigo' 
                        type="number" 
                        value={codigo} 
                        disabled 
                        required
                    />
                </label>
                <label>
                    Nome:
                    <input 
                        name='nome' 
                        type="text" 
                        value={nome}
                        onChange={ e => setNome( e.target.value )} 
                        required
                    />
                </label>
                <label>
                    Descricao:
                    <input 
                        name='descricao' 
                        type="text"
                        value={descricao} 
                        onChange={ e => setDescricao(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Quantidade:
                    <input 
                        name='quantidade' 
                        type="text" 
                        value={quantidade} 
                        onChange={ e => setQuantidade(e.target.value)}
                        min="1" 
                        required
                    />
                </label>
                <label>
                    Preço por unidade
                    <input 
                        name='preco' 
                        type="number" 
                        value={preco} 
                        onChange={ e => setPreco(e.target.value)}
                        step="any" 
                        min="1" 
                        required
                    />
                </label>
                <input type="submit" value="ATUALIZAR"/>
            </form>
        </div>
        </section>
    )
}