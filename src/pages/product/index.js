import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';

import api from '../../services/api';

export default function Product (){

    const { register, handleSubmit } = useForm();

    const navigate = useNavigate();

    async function onSubmit ( { nome, descricao, codigo, preco, quantidade }) {
        
        await api.post('/produtos',{nome, descricao, codigo, preco }).then( async response => 
            await api.post('/estoque', {id_produto:codigo, quantidade}).then( response =>  alert('sucesso!'))
        );
        
        navigate('/');
    };

    return (
        <section>
            <header>
                <h2>Produto</h2>
            </header>
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label>
                    Código:
                    <input type="number" {...register("codigo")} required/>
                </label>
                <label>
                    Nome:
                    <input type="text" {...register("nome")} required/>
                </label>
                <label>
                    Descricao:
                    <input type="text" {...register("descricao")} required/>
                </label>
                <label>
                    Quantidade:
                    <input type="text" min="1" {...register("quantidade")} required/>
                </label>
                <label>
                    Preço por unidade
                    <input type="number" step="any" min="1" {...register("preco")} required/>
                </label>
                <input type="submit" value="Adicionar"/>
            </form>
        </div>
        </section>
    )
}