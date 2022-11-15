import { useContext } from "react"
import { PageLayoutContext } from "../contexts/PageLayoutProvider"

export const usePageLayout = () => {
    const context = useContext(PageLayoutContext);
    const {layout, setLayoutType: setLayout } = context;
    const fixedNaming = {
        layout,
        setLayout,
    }
    return fixedNaming;
}