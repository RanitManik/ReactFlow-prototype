import {
    BaseEdge,
    EdgeLabelRenderer,
    getBezierPath,
    useReactFlow,
} from "@xyflow/react";
import { Flag, SquarePlus } from "lucide-react";
import { useEffect, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "/components/ui/dialog";
import { Label } from "/components/ui/label";
import { Input } from "/components/ui/input";
import { Button } from "/components/ui/button";

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
    const { label } = data;

    const isResultPresent = data.result !== undefined;

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [resultName, setResultName] = useState("");
    const { updateEdgeData } = useReactFlow();

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    useEffect(() => {
        isResultPresent && openModal();
    }, [isResultPresent]);

    const saveDetails = () => {
        // Update the edge result name
        if (resultName.trim() !== "") {
            updateEdgeData(id, { result: resultName.trim() });
        }
        closeModal();
    };

    return (
        <g onDoubleClick={openModal}>
            <BaseEdge
                id={id}
                path={edgePath}
                {...props}
                interactionWidth={20}
            />
            <EdgeLabelRenderer onDoubleClick={openModal}>
                <div
                    style={{
                        position: "absolute",
                        transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
                        paddingInline: 8,
                        paddingBlock: 4,
                        borderRadius: 2,
                        fontSize: 10,
                        pointerEvents: "all",
                    }}
                    className="nodrag nopan items-left flex cursor-pointer flex-col gap-1 border border-yellow-700 bg-[#ffcc00] font-semibold text-black"
                >
                    <div className="flex items-center gap-1">
                        <SquarePlus size={10} />
                        {label}
                    </div>
                    {data.result && ( // Only show result if it's not empty
                        <div className="flex items-center gap-1">
                            <Flag size={10} />
                            Result:{" "}
                            <span className="max-w-44 truncate text-yellow-900">
                                {data.result}
                            </span>
                        </div>
                    )}
                </div>
            </EdgeLabelRenderer>
            {/* Modal for editing node details */}
            {isResultPresent && (
                <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Enter Edge Details</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                            <div className="flex flex-col gap-1">
                                <Label
                                    htmlFor="resultName"
                                    className="text-sm font-medium"
                                >
                                    Result / Results
                                </Label>
                                <Input
                                    id="resultName"
                                    value={resultName}
                                    onChange={(e) =>
                                        setResultName(e.target.value)
                                    }
                                    placeholder="Enter Results if any"
                                    required={true}
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button variant="secondary" onClick={closeModal}>
                                Cancel
                            </Button>
                            <Button onClick={saveDetails}>Save</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            )}
        </g>
    );
};

export default CustomEdge;
