import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Request } from "@/types/espacePro";

interface RequestDetailsModalProps {
    request: Request | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function RequestDetailsModal({ request, open, onOpenChange }: RequestDetailsModalProps) {
    if (!request) return null;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>Détails de la demande</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <h4 className="font-semibold text-sm text-gray-500">Type</h4>
                            <p>{request.type}</p>
                        </div>
                        <div>
                            <h4 className="font-semibold text-sm text-gray-500">Statut</h4>
                            <p>{request.statut}</p>
                        </div>
                        <div className="col-span-2">
                            <h4 className="font-semibold text-sm text-gray-500">Description</h4>
                            <p>{request.description}</p>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
