import { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";

import api from '../../services/api';

export default function Sale (){

    const [ produtos, setProdutos] = useState([]);

    const { register, handleSubmit } = useForm();

    useEffect(() =>{

        const fetchProducts = async () => {
            const arrayProducts = await api.get('/estoque');
            setProdutos(arrayProducts.data);
        }

        fetchProducts();

    }, []);

    async function onSubmit(data){
        
        function filterProduto(produto){
            if( produto.codigo === parseInt( data.id_produto)){
                return produto;
            }
        }

        const prodSale = produtos.filter(produto => filterProduto(produto));
        console.log(prodSale[0]);

        let {codigo, quantidade, id, preco} = prodSale[0];
        
        quantidade = quantidade - data.quantidade;

        if( parseInt(data.quantidade)  <= prodSale[0].quantidade ){
            
            await api.post('/vendas', {...data, preco}).then( response =>  
                    api.put(`/estoque/${id}`, { id_produto: codigo, quantidade}).then( response => alert('venda realizada!'))
                );
        }else{
            alert('Essa quantidade não tem no estoque!');
        }
        
    }

    return(
        <section>
            <header>
                <h2>Venda</h2>
            </header>
            <main>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <label>
                    Escolha o produto:
                    <select {...register("id_produto")} required>
                        <option value=""> Selecione um produto</option>
                        { produtos.map( produto => (
                            <option key={produto.codigo} value={produto.codigo}> {produto.nome}</option>
                        ))
                        }

                    </select>
                    </label>
                    <label>
                        data:
                        <input type="date" {...register("data")} required/>
                    </label>
                    <label>
                        Quantidade:
                        <input min="1" type="number" {...register("quantidade")} required/>
                    </label>
                    <input type="submit" value="Finalizar"/>
                </form>
            </main>

        </section>
    )
}