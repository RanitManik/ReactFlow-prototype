import { Handle, Position, useReactFlow } from "@xyflow/react";
import { BaseNode } from "@/components/base-node";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export function CustomChildNode({ id, data, selected }: any) {
    const { label } = data;
    const [isModalOpen, setIsModalOpen] = useState(true);
    const [childName, setChildName] = useState(label || "");
    const { updateNodeData } = useReactFlow();

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const saveDetails = () => {
        // Update the node label
        if (childName.trim() !== "") {
            updateNodeData(id, { label: childName.trim() }); // Update node data
        }
        closeModal();
    };

    return (
        <>
            <BaseNode
                selected={selected}
                onDoubleClick={openModal} // Open modal on double-click
            >
                {label && (
                    <div
                        style={{
                            paddingInline: 20,
                            paddingBlock: 15,
                        }}
                    >
                        <span
                            title={label}
                            className="block max-w-44 truncate text-xs font-medium"
                        >
                            {label}
                        </span>
                    </div>
                )}
                <Handle type="target" position={Position.Left} />
                <Handle type="source" position={Position.Right} />
            </BaseNode>

            {/* Modal for editing node details */}
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Enter Process Details</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                        <div className="flex flex-col gap-1">
                            <Label
                                htmlFor="childName"
                                className="text-sm font-medium"
                            >
                                Process Name
                                <span className="ms-0.5 text-destructive">
                                    *
                                </span>
                            </Label>
                            <Input
                                id="childName"
                                value={childName}
                                onChange={(e) => setChildName(e.target.value)}
                                placeholder="Enter child name"
                                required={true}
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <Label
                                htmlFor="child-details-2"
                                className="text-sm font-medium"
                            >
                                Process Admins
                                <span className="ms-0.5 text-destructive">
                                    *
                                </span>
                            </Label>
                            <Select>
                                <SelectTrigger id="child-details-2">
                                    <SelectValue placeholder="Select Process admins" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="admin1">
                                        Admin 1
                                    </SelectItem>
                                    <SelectItem value="admin2">
                                        Admin 2
                                    </SelectItem>
                                    <SelectItem value="admin3">
                                        Admin 3
                                    </SelectItem>
                                </SelectContent>
                            </Select>
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
        </>
    );
}

CustomChildNode.displayName = "CustomChildNode";
