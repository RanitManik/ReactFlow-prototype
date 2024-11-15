"use client";

import React, {useCallback, useState} from "react";
import {
  addEdge,
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
  ReactFlow,
  useEdgesState,
  useNodesState,
} from "reactflow";

import "reactflow/dist/style.css";
import {v4 as uuidv4} from "uuid";
import {Button} from "@/components/ui/button";

const initialNodes = [
  {id: "1", position: {x: 50, y: 50}, data: {label: "Node 1"}},
  {id: "2", position: {x: 50, y: 200}, data: {label: "Node 2"}},
];
const initialEdges = [{id: "e1-2", source: "1", target: "2", animated: true}];

export default function Page() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState(null);

  const onConnect = useCallback(
    (params: any) =>
      setEdges((eds) => addEdge({...params, animated: true}, eds)),
    [setEdges],
  );

  const onNodeSelect = useCallback((event: any, node: any) => {
    setSelectedNode(node);
  }, []);

  const addNode = useCallback(() => {
    const newNodeId = uuidv4();
    const newNode = {
      id: newNodeId,
      data: {label: `Node ${nodes.length + 1}`},
      position: {
        x: Math.random() * 400,
        y: Math.random() * 400,
      },
    };
    setNodes((prevNodes) => [...prevNodes, newNode]);

    if (nodes.length > 0) {
      const newEdge = {
        id: `e${nodes[nodes.length - 1].id}-${newNodeId}`,
        source: nodes[nodes.length - 1].id,
        target: newNodeId,
      };
      setEdges((prevEdges) =>
        addEdge({...newEdge, animated: true}, prevEdges),
      );
    }
  }, [nodes, setNodes, setEdges]);

  const clearAll = () => {
    setNodes([]);
    setEdges([]);
    setSelectedNode(null);
  };

  const deleteSelectedNode = useCallback(() => {
    if (selectedNode) {
      setNodes((nds) =>
        nds.filter(
          (node) => (node as any).id !== (selectedNode as any).id,
        ),
      );
      setEdges((eds) =>
        eds.filter(
          (edge) =>
            edge.source !== (selectedNode as any).id &&
            edge.target !== (selectedNode as any).id,
        ),
      );
      setSelectedNode(null);
    }
  }, [selectedNode, setNodes, setEdges]);

  return (
    <div className="h-screen w-screen">
      <div className="absolute left-0 top-0 z-10 space-x-2 p-2">
        <Button onClick={addNode}>Add Node</Button>
        <Button onClick={clearAll}>Clear All</Button>
        {selectedNode && (
          <Button
            onClick={deleteSelectedNode}
            variant="destructive"
            className="ml-2"
          >
            Delete Node
          </Button>
        )}
      </div>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeSelect}
      >
        <Controls/>
        <MiniMap/>
        <Background
          variant={BackgroundVariant.Dots}
          gap={12}
          size={1}
        />
      </ReactFlow>
    </div>
  );
}
