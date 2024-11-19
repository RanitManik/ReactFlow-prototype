import React from "react";
import { useDnD } from "../context/drag-and-drop";

export const Sidebar = () => {
    const [_, setType] = useDnD();

    const onDragStart = (event, nodeType) => {
        setType(nodeType);
        event.dataTransfer.effectAllowed = "move";
    };

    return (
        <aside>
            <div className="description">
                You can drag these nodes to the pane on the right.
            </div>
            <div
                className="dndnode stage"
                onDragStart={(event) => onDragStart(event, "LabeledGroupNode")}
                draggable
            >
                Stage Node
            </div>
            <div
                className="dndnode process"
                onDragStart={(event) => onDragStart(event, "CustomChildNode")}
                draggable
            >
                Process Node
            </div>
        </aside>
    );
};
