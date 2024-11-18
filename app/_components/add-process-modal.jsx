import React, { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../../components/ui/dialog";
import { Button } from "../../components/ui/button";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";

function AddProcessModal({ parentId, label, setNodes }) {
    const [open, setOpen] = useState(false);

    const handleAddProcess = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const name = formData.get("processName");

        if (!name) {
            alert("Process name is required!");
            return;
        }

        setNodes((prevNodes) => {
            const existingChildNodes = prevNodes.filter(
                (node) => node.parentId === parentId
            );

            const newChildNode = {
                id: `process-${Date.now()}`,
                type: "CustomChildNode", // Define this node type for custom rendering
                data: { label: name },
                position: {
                    x: 50 + existingChildNodes.length * 200,
                    y: 50,
                },
                parentId,
                extent: "parent",
                expandParent: true,
            };

            return [...prevNodes, newChildNode];
        });

        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <button className="bg-primary px-2 py-1 text-white rounded">
                    Add Process
                </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <form className="space-y-4" onSubmit={handleAddProcess}>
                    <DialogHeader>
                        <DialogTitle>Add New Process</DialogTitle>
                        <DialogDescription>
                            Add a process to the stage <strong>{label}</strong>.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-6">
                        <div className="grid items-center gap-1">
                            <Label htmlFor="processName">Process Name</Label>
                            <Input
                                id="processName"
                                name="processName"
                                className="w-full"
                                placeholder="Enter process name"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit">Add Process</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}

export default AddProcessModal;
