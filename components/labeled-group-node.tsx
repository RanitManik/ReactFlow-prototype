import { Handle, NodeResizer, Position } from "@xyflow/react";
import { BaseNode } from "@/components/base-node";

export function LabeledGroupNode({ id, data, selected }: any) {
    const { label, setNodes } = data;

    const handleAddProcess = () => {
        const newChildNode = {
            id: `child-${Date.now()}`,
            type: "default",
            data: { label: `Process of ${label}` },
            position: { x: 50, y: 50 },
            parentId: id,
            extent: "parent",
        };

        setNodes((prevNodes: any) => [...prevNodes, newChildNode]);
    };

    return (
        <BaseNode
            selected={selected}
            className="h-full overflow-hidden rounded-sm bg-white bg-opacity-50 p-0"
        >
            <Handle type="target" position={Position.Left} />
            <NodeResizer minWidth={300} minHeight={250} />
            {label && (
                <div className="absolute -top-8 flex w-full items-end justify-between text-card-foreground">
                    <span className="text-sm font-bold">{label}</span>
                    <button
                        onClick={handleAddProcess}
                        className="rounded bg-primary px-2 py-1 text-xs text-white"
                    >
                        Add process
                    </button>
                </div>
            )}
            <Handle type="source" position={Position.Right} />
        </BaseNode>
    );
}

LabeledGroupNode.displayName = "LabeledGroupNode";
