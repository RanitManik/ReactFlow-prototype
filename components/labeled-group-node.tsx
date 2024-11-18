import { Handle, NodeResizer, Position } from "@xyflow/react";
import { BaseNode } from "@/components/base-node";
import AddProcessModal from "@/app/_components/add-process-modal";

export function LabeledGroupNode({ id, data, selected }: any) {
    const { label, setNodes } = data;

    return (
        <BaseNode
            selected={selected}
            className="h-full overflow-hidden rounded-sm bg-white bg-opacity-50 p-0"
        >
            <Handle type="target" position={Position.Top} />
            <NodeResizer minWidth={300} minHeight={250} />
            {label && (
                <div className="absolute -top-10 flex w-full items-end justify-between text-card-foreground">
                    <span className="text-sm font-bold">{label}</span>
                    <AddProcessModal
                        parentId={id}
                        label={label}
                        setNodes={setNodes}
                    />
                </div>
            )}
            <Handle type="source" position={Position.Bottom} />
        </BaseNode>
    );
}

LabeledGroupNode.displayName = "LabeledGroupNode";
