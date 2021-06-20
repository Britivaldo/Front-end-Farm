import { Routes, Route} from 'react-router-dom';

import Stock from '../pages/stock/index';
import Product from '../pages/product/index';
import UpdateStock from '../pages/updateStock';
import Sale from '../pages/sale/index';
import Report from '../pages/report/index';


export default function MainRoutes(){

   return ( 
        <Routes>
                <Route path="/" element={ <Stock/> }/>
                <Route path="/product" element={<Product/>} />
                <Route path="/updateStock/:id" element={<UpdateStock/>} />
                <Route path="/sale" element={<Sale/>} />
                <Route path="/report" element={<Report/>} />
        </Routes>
   )
}