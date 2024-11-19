"use client";

import React, { useCallback, useRef } from "react";
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
    useEdgesState,
    useNodesState,
    useReactFlow,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { v4 as uuidv4 } from "uuid";

import CustomEdge from "./_components/custom-edge";
import { LabeledGroupNode } from "../components/labeled-group-node";
import { CustomChildNode } from "../components/custom-child-node";
import { toast, Toaster } from "sonner";
import "./index.css";
import { useDnD } from "./context/drag-and-drop";
import { Sidebar } from "./_components/sidebar";

const nodeTypes = {
    LabeledGroupNode,
    CustomChildNode,
};
const edgeTypes = {
    CustomEdge,
};

export default function Page() {
    const reactFlowWrapper = useRef(null);

    const [nodes, setNodes] = useNodesState([]);
    const [edges, setEdges] = useEdgesState([]);

    console.log(edges);
    console.log(nodes);

    // drag and drop providers setup
    const { screenToFlowPosition } = useReactFlow();
    const [type] = useDnD();

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

    // const panOnDrag = [1, 2];

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

    // drag and drop functions

    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = "move";
    }, []);

    const onDrop = useCallback(
        (event) => {
            event.preventDefault();

            // check if the dropped element is valid
            if (!type) {
                return;
            }

            const position = screenToFlowPosition({
                x: event.clientX,
                y: event.clientY,
            });
            const newNode = {
                id: uuidv4(),
                type,
                position,
                data: { label: `${type} node` },
            };

            setNodes((nds) => nds.concat(newNode));
        },
        [screenToFlowPosition, type],
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
        <div className="dndflow">
            <main className="reactflow-wrapper" ref={reactFlowWrapper}>
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
                    onDrop={onDrop}
                    onDragOver={onDragOver}
                    // fitView
                    // fitViewOptions={{ padding: 2 }}
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
            <Sidebar />
            <Toaster richColors />
        </div>
    );
}
