import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import api from '../../services/api';

export default function Stock (){

    const [ stock, setStock ] = useState([]);

    const navigate = useNavigate();

    useEffect(() =>{
        const fetchStock = async () => {
            const result = await api.get('/estoque');
            setStock(result.data);
        }
        fetchStock();
    }, []);

    return(
        <section>
            <header>
                <h2>Estoque</h2>

                <div className="btn">
                    <button type="button" onClick={() => navigate('/product')}>
                        Adicionar produto
                    </button>
                    <button type="button" onClick={() => navigate('/sale')}>
                        Adicionar Venda
                    </button>
                    <button type="button" onClick={() => navigate('/report')}>
                        Relatório
                    </button>
                </div>
            </header>
            <main>
            <table>
                <tbody>
                <tr>
                    <th>Nome</th>
                    <th>codigo</th>
                    <th>Quantidade</th>
                    <th>Preço</th>
                </tr>

                {stock.map(product => (
                    <tr key={product.id}>
                        <td>{product.nome}</td>
                        <td>{product.codigo}</td>
                        <td>{product.quantidade}</td>
                        <td>{product.preco}</td>
                        <td>
                        <button className="editar" type="button" onClick={() => navigate(`/updateStock/${product.id}`)}>
                            Editar
                        </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            </main>

        </section>
    )
}