import { Handle, NodeToolbar, Position } from "@xyflow/react";
import { BaseNode } from "@/components/base-node";

export function CustomChildNode({ data, selected }: any) {
    const { label } = data;
    return (
        <BaseNode
            selected={selected}
            className="h-full overflow-hidden rounded-sm bg-white bg-opacity-50"
        >
            {/*<NodeToolbar isVisible={data.toolbarVisible} position={data.toolbarPosition}>
                <button>delete</button>
                <button>copy</button>
                <button>expand</button>
            </NodeToolbar>*/}
            {/*<NodeResizer minWidth={300} minHeight={250} />*/}
            {label && (
                <div className="flex h-full w-full items-end justify-between text-card-foreground">
                    <span className="text-xs">{label}</span>
                </div>
            )}
            <Handle type="target" position={Position.Left} />
            <Handle type="source" position={Position.Right} />
        </BaseNode>
    );
}

CustomChildNode.displayName = "CustomChildNode";
