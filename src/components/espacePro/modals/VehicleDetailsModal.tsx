import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { FleetVehicle } from "@/types/espacePro";
import { Button } from "@/components/ui/button";

interface VehicleDetailsModalProps {
    vehicle: FleetVehicle | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onEdit: (vehicle: FleetVehicle) => void;
    onDelete: (vehicle: FleetVehicle) => void;
}

export function VehicleDetailsModal({ vehicle, open, onOpenChange, onEdit, onDelete }: VehicleDetailsModalProps) {
    if (!vehicle) return null;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>Détails du véhicule</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <h4 className="font-semibold text-sm text-gray-500">Immatriculation</h4>
                            <p>{vehicle.immatriculation}</p>
                        </div>
                        <div>
                            <h4 className="font-semibold text-sm text-gray-500">Marque / Modèle</h4>
                            <p>{vehicle.marque} {vehicle.modele}</p>
                        </div>
                        <div>
                            <h4 className="font-semibold text-sm text-gray-500">Type</h4>
                            <p>{vehicle.type}</p>
                        </div>
                        <div>
                            <h4 className="font-semibold text-sm text-gray-500">Station</h4>
                            <p>{vehicle.agence}</p>
                        </div>
                        <div>
                            <h4 className="font-semibold text-sm text-gray-500">Dernier contrôle</h4>
                            <p>{new Date(vehicle.dernierControle).toLocaleDateString()}</p>
                        </div>
                        <div>
                            <h4 className="font-semibold text-sm text-gray-500">Prochain contrôle</h4>
                            <p>{new Date(vehicle.prochainControle).toLocaleDateString()}</p>
                        </div>
                        <div>
                            <h4 className="font-semibold text-sm text-gray-500">Statut</h4>
                            <p>{vehicle.statut}</p>
                        </div>
                    </div>
                    <div className="flex justify-end gap-2 mt-4">
                        <Button variant="destructive" onClick={() => onDelete(vehicle)}>Supprimer</Button>
                        <Button onClick={() => onEdit(vehicle)}>Modifier</Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
