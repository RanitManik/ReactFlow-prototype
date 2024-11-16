import { memo } from "react";
import { Handle, NodeResizer, Position } from "@xyflow/react";

const ResizableNodeSelected = ({ data, selected }) => {
    return (
        <>
            <NodeResizer
                color="#ff0071"
                isVisible={selected}
                minWidth={100}
                minHeight={30}
            />
            <Handle type="target" position={Position.Left} />
            <div className="absolute -top-5 left-0 text-xs">{data.label}</div>
            <Handle type="source" position={Position.Right} />
        </>
    );
};

export default memo(ResizableNodeSelected);
