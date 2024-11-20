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
                        paddingInline: 6,
                        paddingBlock: 3,
                        borderRadius: 2,
                        fontSize: 9,
                    }}
                    className="nodrag nopan flex items-center gap-1 border border-yellow-700 bg-[#ffcc00] font-semibold text-black"
                >
                    <SquarePlus size={9} />
                    {data.label}
                </div>
            </EdgeLabelRenderer>
        </>
    );
};

export default CustomEdge;
