import { Handle, Position } from "@xyflow/react";
import { BaseNode } from "@/components/base-node";

export function CustomChildNode({ data, selected }: any) {
    const { label } = data;
    return (
        <BaseNode selected={selected}>
            {label && (
                <div>
                    <span className="text-xs font-medium">{label}</span>
                </div>
            )}
            <Handle type="target" position={Position.Left} />
            <Handle type="source" position={Position.Right} />
        </BaseNode>
    );
}

CustomChildNode.displayName = "CustomChildNode";
