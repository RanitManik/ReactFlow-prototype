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
import { CustomEdge } from "./_components/custom-edge";

const nodeTypeStyles = {
    group: { backgroundColor: "#3e98ff", color: "white" },
    input: { backgroundColor: "#59b36d", color: "white" },
    output: { backgroundColor: "#6865A5", color: "white" },
    default: { backgroundColor: "#ff0072", color: "white" },
};

const applyNodeStyles = (node) => ({
    ...node,
    style: nodeTypeStyles[node.type] || nodeTypeStyles.default,
});

export default function Page() {
    const [nodes, setNodes] = useNodesState(initialNodes.map(applyNodeStyles));
    const [edges, setEdges] = useEdgesState(initialEdges.map(applyNodeStyles));

    const defaultEdgeOptions = {
        animated: true,
        markerEnd: {
            type: MarkerType.ArrowClosed,
            width: 20,
            height: 20,
        },
    };
    const panOnDrag = [1, 2];
    const edgeTypes = {
        "custom-edge": CustomEdge,
    };

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
                <AddStageModal />
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
                    fitView
                    edgeTypes={edgeTypes}
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
