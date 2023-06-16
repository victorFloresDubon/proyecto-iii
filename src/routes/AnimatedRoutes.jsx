import {useLocation} from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Route, Routes } from "react-router-dom";
import Inicio from '../components/Inicio';
import ListadoPueblos from '../components/pueblo/ListadoPueblos';

const AnimatedRoutes = () =>{
    const location = useLocation();

    return(
        <>
            <AnimatePresence>
                <Routes location={location} key={location.key}>
                    <Route path='/' element={<Inicio />} />
                    <Route path='/pueblos' element={<ListadoPueblos />} />
                </Routes>
            </AnimatePresence>
        </>
    )
}

export default AnimatedRoutes;