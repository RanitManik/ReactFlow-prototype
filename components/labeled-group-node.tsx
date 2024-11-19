import { Handle, NodeResizeControl, Position } from "@xyflow/react";
import { BaseNode } from "@/components/base-node";

export function LabeledGroupNode({ id, data, selected }: any) {
    const { label } = data;

    const controlStyle = {
        background: "transparent",
        border: "none",
    };

    return (
        <BaseNode
            selected={selected}
            className="h-full overflow-hidden rounded-sm p-0"
            style={{
                width: 600,
                height: 300,
            }}
        >
            <NodeResizeControl
                style={controlStyle}
                minWidth={400}
                minHeight={250}
            >
                <ResizeIcon />
            </NodeResizeControl>
            {label && (
                <div className="absolute -top-7 flex w-full items-end justify-between">
                    <span className="text-sm font-bold text-primary">
                        {label}
                    </span>
                </div>
            )}
            <Handle type="target" position={Position.Left} />
            <Handle type="source" position={Position.Right} />
        </BaseNode>
    );
}

function ResizeIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="#704af2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ position: "absolute", right: 5, bottom: 5 }}
        >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <polyline points="16 20 20 20 20 16" />
            <line x1="14" y1="14" x2="20" y2="20" />
            <polyline points="8 4 4 4 4 8" />
            <line x1="4" y1="4" x2="10" y2="10" />
        </svg>
    );
}

LabeledGroupNode.displayName = "LabeledGroupNode";
