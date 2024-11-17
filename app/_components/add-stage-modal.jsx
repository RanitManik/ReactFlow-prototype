import { Button } from "../../components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../../components/ui/dialog";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Plus } from "lucide-react";
import { useState } from "react";

export function AddStageModal({ setNodes }) {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button size="sm">
                    <Plus />
                    Add New Stage
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <form
                    className="space-y-4"
                    onSubmit={(e) => {
                        e.preventDefault();

                        const formData = new FormData(e.target);
                        const name = formData.get("name");

                        if (!name) {
                            alert("Name is required!");
                            return;
                        }

                        const newNode = {
                            id: `node-${Date.now()}`,
                            type: "LabeledGroupNode",
                            style: {
                                width: 400,
                                height: 250,
                                backgroundColor: "rgba(240,240,240,0.25)",
                            },
                            position: { x: 100, y: 100 },
                            data: { label: name, setNodes }, // Pass setNodes through the data property
                        };

                        setNodes((prevNodes) => [...prevNodes, newNode]);
                        setOpen(false);
                    }}
                >
                    <DialogHeader>
                        <DialogTitle>Add new Stage</DialogTitle>
                        <DialogDescription>
                            A stage is basically a compilation of processes.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-6">
                        <div className="grid items-center gap-1">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                name="name"
                                className="w-full"
                                placeholder="Enter name of the stage"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit">Create Stage</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
