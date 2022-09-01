import React from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import Translate from "../translate/Translate";
import {ROUTES} from "../shared/constants/routes-enums";
import History from "../history/History";

const Router = () => {
    return (
        <Routes>
            <Route path={ROUTES.TRANSLATE} element={<Translate/>}/>
            <Route path={ROUTES.HISTORY} element={<History/>}/>
            <Route path={ROUTES.ANY} element={<Navigate to="/translate"/>}/>
        </Routes>
    );
};

export default Router;
