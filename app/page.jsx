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

            if (!type) {
                return;
            }

            const position = screenToFlowPosition({
                x: event.clientX,
                y: event.clientY,
            });

            // Create the new node
            const newNode = {
                id: uuidv4(),
                type,
                position,
                data: { label: `${type} node` },
                measured: { width: 160, height: 20 }, // Default size for new node
            };

            if (type === "LabeledGroupNode") {
                setNodes((nds) => nds.concat(newNode));
                return;
            }

            // Calculate bounding box of the new node
            const newNodeBoundingBox = {
                x: position.x,
                y: position.y,
                width: newNode.measured.width,
                height: newNode.measured.height,
            };

            // Find intersecting parents and calculate intersection area
            const intersectingParents = nodes
                .filter((node) => node.type === "LabeledGroupNode") // Filter potential parents
                .map((parentNode) => {
                    // Calculate bounding box for the parent node
                    const parentBoundingBox = {
                        x: parentNode.position.x,
                        y: parentNode.position.y,
                        width: parentNode.measured.width,
                        height: parentNode.measured.height,
                    };

                    // Calculate intersection dimensions
                    const intersectionWidth = Math.max(
                        0,
                        Math.min(
                            newNodeBoundingBox.x + newNodeBoundingBox.width,
                            parentBoundingBox.x + parentBoundingBox.width,
                        ) - Math.max(newNodeBoundingBox.x, parentBoundingBox.x),
                    );

                    const intersectionHeight = Math.max(
                        0,
                        Math.min(
                            newNodeBoundingBox.y + newNodeBoundingBox.height,
                            parentBoundingBox.y + parentBoundingBox.height,
                        ) - Math.max(newNodeBoundingBox.y, parentBoundingBox.y),
                    );

                    const intersectionArea =
                        intersectionWidth * intersectionHeight;

                    return {
                        parentNode,
                        intersectionArea,
                    };
                })
                .filter(({ intersectionArea }) => intersectionArea > 0); // Only keep parents with intersections

            // Determine the parent with the largest intersection
            if (intersectingParents.length > 0) {
                const bestParent = intersectingParents.reduce((max, current) =>
                    current.intersectionArea > max.intersectionArea
                        ? current
                        : max,
                );

                // Update the new node with parent relationship
                newNode.parentId = bestParent.parentNode.id;
                newNode.extent = "parent"; // Restrict movement within parent
                newNode.expandParent = true; // Optional for expanding parent
            }

            // Add the new node to the state
            setNodes((nds) => nds.concat(newNode));
        },
        [screenToFlowPosition, type, nodes, setNodes],
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
                    onDrop={onDrop}
                    onDragOver={onDragOver}
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
