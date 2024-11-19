import { BaseEdge, EdgeLabelRenderer, getBezierPath } from "@xyflow/react";
import { SquarePlus } from "lucide-react";

const CustomEdge = ({
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    data,
    ...props
}) => {
    const [edgePath, labelX, labelY] = getBezierPath({
        sourceX,
        sourceY,
        sourcePosition,
        targetX,
        targetY,
        targetPosition,
    });

    return (
        <>
            <BaseEdge
                id={id}
                path={edgePath}
                {...props}
                interactionWidth={20}
            />
            <EdgeLabelRenderer>
                <div
                    style={{
                        position: "absolute",
                        transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
                        background: "#ffcc00",
                        paddingInline: 8,
                        paddingBlock: 4,
                        borderRadius: 2,
                        fontWeight: 700,
                        fontSize: 10,
                    }}
                    className="nodrag nopan flex items-center gap-1 border border-yellow-700 text-yellow-900"
                >
                    <SquarePlus size={10} />
                    {data.label}
                </div>
            </EdgeLabelRenderer>
        </>
    );
};

export default CustomEdge;
