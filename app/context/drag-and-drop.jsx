import { createContext, useContext, useState } from "react";
import { ReactFlowProvider } from "@xyflow/react";

const DnDContext = createContext([null, (_) => {}]);

export const DnDProvider = ({ children }) => {
    const [type, setType] = useState(null);

    return (
        <ReactFlowProvider>
            <DnDContext.Provider value={[type, setType]}>
                {children}
            </DnDContext.Provider>
        </ReactFlowProvider>
    );
};

export default DnDContext;

export const useDnD = () => {
    return useContext(DnDContext);
};
