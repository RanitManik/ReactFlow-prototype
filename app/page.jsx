"use client";

import React, { useCallback } from "react";
import {
    addEdge,
    applyEdgeChanges,
    applyNodeChanges,
    Background,
    BackgroundVariant,
    Controls,
    MarkerType,
    MiniMap,
    ReactFlow,
    SelectionMode,
    useEdgesState,
    useNodesState,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import { AddStageModal } from "./_components/add-stage-modal";
import { initialNodes } from "./_components/initial-nodes";
import { initialEdges } from "./_components/initial-edges";
import CustomEdge from "./_components/custom-edge";
import ResizableNodeSelected from "./_components/resizable-node-selected";
import ResizableNode from "./_components/resizable-node";
import { LabeledGroupNode } from "../components/labeled-group-node";

// Additional Styling
/*
const nodeTypeStyles = {
    group: { backgroundColor: "#3e98ff", color: "white" },
    input: { backgroundColor: "#59b36d", color: "white" },
    output: { backgroundColor: "#6865A5", color: "white" },
    default: { backgroundColor: "#ff0072", color: "white" },
    labeledGroupNode: { backgroundColor: "#7aace9", color: "white" }
};

const applyNodeStyles = (node) => ({
    ...node,
    style: nodeTypeStyles[node.type] || nodeTypeStyles.default,
});
*/

const nodeTypes = {
    ResizableNode,
    ResizableNodeSelected,
    LabeledGroupNode,
};
const edgeTypes = {
    CustomEdge,
};

export default function Page() {
    const [nodes, setNodes] = useNodesState(initialNodes);
    const [edges, setEdges] = useEdgesState(initialEdges);
    console.log(edges);
    console.log(edges);

    const defaultEdgeOptions = {
        animated: true,
        markerEnd: {
            type: MarkerType.ArrowClosed,
            width: 20,
            height: 20,
        },
        type: "CustomEdge",
        data: { label: "Dependent" },
    };
    const panOnDrag = [1, 2];

    const onConnect = useCallback(
        (params) => setEdges((eds) => addEdge(params, eds)),
        [setEdges],
    );
    const onNodesChange = useCallback(
        (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
        [setNodes],
    );
    const onEdgesChange = useCallback(
        (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
        [setEdges],
    );

    return (
        <div className="h-screen w-screen">
            <nav className="flex h-[60px] items-center border bg-background px-4 shadow">
                <AddStageModal setNodes={setNodes} />
            </nav>
            <main className="h-[calc(100vh-60px)]">
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    defaultEdgeOptions={defaultEdgeOptions}
                    panOnScroll
                    panOnDrag={panOnDrag}
                    selectionOnDrag
                    selectionMode={SelectionMode.Partial}
                    // fitView
                    edgeTypes={edgeTypes}
                    nodeTypes={nodeTypes}
                >
                    <Controls />
                    <MiniMap />
                    <Background
                        variant={BackgroundVariant.Lines}
                        gap={12}
                        size={1}
                    />
                </ReactFlow>
            </main>
        </div>
    );
}
