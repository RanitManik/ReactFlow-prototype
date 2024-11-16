import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";

export function AddStageModal() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button size="sm">
                    <Plus />
                    Add New Stage
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add new Stage</DialogTitle>
                    <DialogDescription>
                        A stage is basically compilation of admins
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-6">
                    <div className="grid items-center gap-1">
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            className="w-full"
                            placeholder="Enter name of the stage"
                        />
                    </div>
                    <div className="grid items-center gap-1">
                        <Label htmlFor="username">Username</Label>
                        <Input
                            id="username"
                            className="w-full"
                            placeholder="Enter admins for the stage"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit">Create Stage</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
