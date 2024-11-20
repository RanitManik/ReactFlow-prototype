import {
    Handle,
    NodeResizeControl,
    Position,
    useReactFlow,
} from "@xyflow/react";
import { BaseNode } from "@/components/base-node";
import { useEffect, useRef, useState } from "react";

export function LabeledGroupNode({ id, data, selected }: any) {
    const { label } = data;
    const [isEditing, setIsEditing] = useState(true); // Initially true for newly created nodes
    const inputRef = useRef<HTMLInputElement>(null); // Ref for the input element
    const { updateNodeData } = useReactFlow();

    useEffect(() => {
        if (isEditing && inputRef.current) {
            // Add a small delay to ensure DOM readiness
            setTimeout(() => {
                inputRef.current?.focus(); // Focus input when editing starts
            }, 0);
        }
    }, [isEditing]);

    return (
        <BaseNode
            selected={selected}
            style={{
                width: 600,
                height: 300,
            }}
            onDoubleClick={() => {
                if (!isEditing) {
                    setIsEditing(true); // Enable editing on click
                }
            }}
        >
            <NodeResizeControl minWidth={400} minHeight={250}>
                <ResizeIcon />
            </NodeResizeControl>
            {label && (
                <div className="absolute -top-8 flex w-full items-end justify-between">
                    {isEditing ? (
                        <input
                            ref={inputRef}
                            defaultValue={label}
                            placeholder="Enter Stage Name"
                            className="w-full max-w-64 px-2 py-1 text-sm font-bold focus-visible:rounded-md focus-visible:outline-1 focus-visible:outline-primary/50"
                            onBlur={(evt) => {
                                const updatedText =
                                    evt.target.value === ""
                                        ? "Stage"
                                        : evt.target.value;
                                updateNodeData(id, { label: updatedText }); // Update node data
                                setIsEditing(false); // Exit editing mode on blur
                            }}
                            onKeyDown={(evt) => {
                                if (evt.key === "Enter") {
                                    const updatedText =
                                        evt.currentTarget.value === ""
                                            ? "Stage"
                                            : evt.currentTarget.value;
                                    updateNodeData(id, { label: updatedText }); // Update node data on Enter
                                    setIsEditing(false); // Exit editing mode
                                }
                            }}
                        />
                    ) : (
                        <span
                            onClick={() => {
                                if (!isEditing) {
                                    setIsEditing(true); // Enable editing on click
                                }
                            }}
                            className="max-w-60 cursor-pointer truncate px-2 py-1 text-sm font-bold transition hover:text-primary"
                        >
                            {label}
                        </span>
                    )}
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
