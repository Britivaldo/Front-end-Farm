import { useState } from 'react';
import { useForm } from "react-hook-form";
import api from '../../services/api';

export default function Report (){

    const { register, handleSubmit } = useForm();

    const [ sales, setSales] = useState([]);

    async function onSubmit ({dateInitial, dateLast, id_produto}) {

        await api.post('/vendas/dateProd', {dateInitial, dateLast, id_produto}).then( response => {
            setSales(response.data)
            console.log(response.data)
        }
           
        )

    };

    return(
        <section>
            <header>
                <h2>Relatório</h2>
                <div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <label>Data inicio</label>
                        <input type="date" {...register("dateInitial")} />
                        <label>Data fim</label>
                        <input type="date" {...register("dateLast")} />
                        <label>Produto</label>
                        <input type="text" {...register("id_produto")} />

                        <input type="submit" value="Filtrar"/>
                    </form>
                </div>
            </header>
            <main>

            <table>
                <tbody>
                <tr>
                    <th>Codigo do produto</th>
                    <th>Quantidade</th>
                    <th>Data</th>
                    <th>Preço</th>
                </tr>
                {sales.map(sale => (
                    <tr key={sale.id}>
                        <td>{sale.id_produto}</td>
                        <td>{sale.quantidade}</td>
                        <td>{sale.data}</td>
                        <td>{sale.quantidade*sale.preco}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            </main>

        </section>
    )
}