import { createContext, useState } from "react";
import { IPageLayoutContext, Layout } from "./types";

interface IPageLayoutProvider {
    children: JSX.Element | JSX.Element[];
}

export const PageLayoutContext = createContext({} as IPageLayoutContext);

export const PageLayoutProvider = ({children}: IPageLayoutProvider) => {
    const [layout, setLayout] = useState<Layout>('wholePageLayout')

    const setLayoutType = (layout: Layout): void => {
        setLayout(layout);
    }

    return (
        <PageLayoutContext.Provider value={{ layout, setLayoutType }}>
            {children}
        </PageLayoutContext.Provider>
    )
}