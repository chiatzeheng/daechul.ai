"use client"
import React, { useState, useCallback } from 'react';
import ReactFlow, {
    addEdge,
    Controls,
    Background,
    useNodesState,
    useEdgesState,

} from 'reactflow';
import 'reactflow/dist/style.css';
import FlowDialog from './FlowDialog';
import CustomNode from './CustomNode';
import { initialEdges, initialNodes } from '@/lib/flow';

const nodeTypes = {
    custom: CustomNode,
};


const LoanEvaluationFlow = () => {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const [selectedNode, setSelectedNode] = useState(null);

    const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

    const onNodeClick = useCallback((event, node) => {
        setSelectedNode(node);
    }, []);

    const closeDialog = () => {
        setSelectedNode(null);
    };

    return (
        <div style={{ width: '100%', height: '800px' }}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onNodeClick={onNodeClick}
                nodeTypes={nodeTypes}
                fitView
                minZoom={0.1}
                maxZoom={1.5}
                defaultZoom={0.4}
            >
                <Controls />
                <Background variant="dots" gap={12} size={1} />
            </ReactFlow>
            <FlowDialog selectedNode={selectedNode} closeDialog={closeDialog} />

        </div>
    );
};

export default LoanEvaluationFlow;