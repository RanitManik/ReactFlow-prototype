"use client";

import React, { useCallback } from "react";
import {
    addEdge,
    applyEdgeChanges,
    applyNodeChanges,
    Background,
    BackgroundVariant,
    Controls,
    getConnectedEdges,
    getIncomers,
    getOutgoers,
    MarkerType,
    MiniMap,
    ReactFlow,
    SelectionMode,
    useEdgesState,
    useNodesState,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import { AddStageModal } from "./_components/add-stage-modal";
import CustomEdge from "./_components/custom-edge";
import { LabeledGroupNode } from "../components/labeled-group-node";
import { CustomChildNode } from "../components/custom-child-node";
import { toast, Toaster } from "sonner";
import "./index.css";

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
    LabeledGroupNode,
    CustomChildNode,
};
const edgeTypes = {
    CustomEdge,
};

export default function Page() {
    const [nodes, setNodes] = useNodesState([]);
    const [edges, setEdges] = useEdgesState([]);
    // console.log(edges);
    // console.log(edges);

    const proOptions = { hideAttribution: true };

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
        (params) => {
            // Prevent self-connections
            if (params.source === params.target) {
                toast.error("Self-connections are not allowed!");
                return;
            }

            // Add the edge if valid
            setEdges((eds) => addEdge(params, eds));
        },
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

    const onNodesDelete = useCallback(
        (deleted) => {
            setEdges(
                deleted.reduce((acc, node) => {
                    const incomers = getIncomers(node, nodes, edges);
                    const outgoers = getOutgoers(node, nodes, edges);
                    const connectedEdges = getConnectedEdges([node], edges);

                    const remainingEdges = acc.filter(
                        (edge) => !connectedEdges.includes(edge),
                    );

                    const createdEdges = incomers.flatMap(({ id: source }) =>
                        outgoers.map(({ id: target }) => ({
                            id: `${source}->${target}`,
                            source,
                            target,
                        })),
                    );

                    return [...remainingEdges, ...createdEdges];
                }, edges),
            );
        },
        [nodes, edges],
    );

    return (
        <div>
            <nav className="absolute z-10 left-4 top-4">
                <AddStageModal setNodes={setNodes} />
            </nav>
            <main className="h-svh">
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    onNodesDelete={onNodesDelete}
                    defaultEdgeOptions={defaultEdgeOptions}
                    // panOnScroll
                    // panOnDrag={panOnDrag}
                    // selectionOnDrag
                    // selectionMode={SelectionMode.Partial}
                    fitView
                    fitViewOptions={{ padding: 2 }}
                    edgeTypes={edgeTypes}
                    nodeTypes={nodeTypes}
                    proOptions={proOptions}
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
            <Toaster richColors />
        </div>
    );
}
