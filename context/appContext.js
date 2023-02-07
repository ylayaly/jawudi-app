import { createContext, useContext, useState } from "react";

export const AppContext = createContext();

export const useAppContext = () => {
    return useContext(AppContext);
}

export const ContextProvider = ({children}) => {
    const [countries, setCountries] = useState([]);
    const [detailFund, setDetailFund] = useState(null);
    const [goals, setGoals] = useState([]);
    const [showCallQR, setShowCallQR ] = useState(false);
    const [inputFocus, setInputFocus ] = useState(false);
    const [legaPages, setLegaPages ] = useState(null);
    const [openLegal, setOpenLegal ] = useState(null);

    const addCountries = d => {
        const data = d && d.data && d.data.country ? d.data.country : [];
        data.map(c => {
            return { name : c.name, code: c.currencyCode, show : true, symbol: c.currencySymbol }
        })
        setCountries(data)
    }

    const changeDetailFund = current => {
        setDetailFund(current)
    }

    const addGoals = all => {
        setGoals(all)
    }

    const changeCallQR = show => {
        setShowCallQR(show)
    }

    const focused = f => {
        setInputFocus(f)
    }

    const openedLegal = l => {
        setOpenLegal(l)
    }

    const addLegalPages = pages => {
        setLegaPages(pages)
    }


    const store = {
        countries, 
        addCountries, 
        detailFund, 
        changeDetailFund,
        goals,
        addGoals,
        showCallQR,
        changeCallQR,
        inputFocus,
        focused,
        openLegal,
        openedLegal,
        legaPages,
        addLegalPages
    }

    return <AppContext.Provider value={store}>
        {children}
    </AppContext.Provider>
}