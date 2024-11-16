import { BaseEdge, getStraightPath } from "@xyflow/react";

export function CustomEdge({ sourceX, sourceY, targetX, targetY, ...props }) {
    const [edgePath] = getStraightPath({
        sourceX,
        sourceY,
        targetX,
        targetY,
    });

    return <BaseEdge path={edgePath} {...props} />;
}
