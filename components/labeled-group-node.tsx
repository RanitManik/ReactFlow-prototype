import { Handle, NodeResizer, Position } from "@xyflow/react";
import { BaseNode } from "@/components/base-node";

export function LabeledGroupNode({ id, data, selected }: any) {
    const { label } = data;

    return (
        <BaseNode
            selected={selected}
            className="h-full overflow-hidden rounded-sm p-0"
            style={{
                width: 600,
                height: 300,
            }}
        >
            <NodeResizer minWidth={400} minHeight={250} isVisible={selected} />
            {label && (
                <div className="absolute -top-7 flex w-full items-end justify-between">
                    <span className="text-sm font-bold text-primary">
                        {label}
                    </span>
                    {/*<AddProcessModal
                        parentId={id}
                        label={label}
                        setNodes={setNodes}
                    />*/}
                </div>
            )}
            <Handle type="target" position={Position.Left} />
            <Handle type="source" position={Position.Right} />
        </BaseNode>
    );
}

LabeledGroupNode.displayName = "LabeledGroupNode";
