import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { VehicleFormData } from "@/types/espacePro";

interface VehicleModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSubmit: (data: VehicleFormData) => Promise<void>;
    initialData?: VehicleFormData;
    isLoading?: boolean;
}

export function VehicleModal({ open, onOpenChange, onSubmit, initialData, isLoading }: VehicleModalProps) {
    const { register, handleSubmit, formState: { errors } } = useForm<VehicleFormData>({
        defaultValues: initialData
    });

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{initialData ? "Modifier le véhicule" : "Ajouter un véhicule"}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid gap-2">
                        <Label htmlFor="immatriculation">Immatriculation</Label>
                        <Input id="immatriculation" {...register("immatriculation", { required: true })} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="marque">Marque</Label>
                        <Input id="marque" {...register("marque", { required: true })} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="modele">Modèle</Label>
                        <Input id="modele" {...register("modele", { required: true })} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="type">Type</Label>
                        <Select onValueChange={(value) => { }}>
                            <SelectTrigger>
                                <SelectValue placeholder="Sélectionner un type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="particulier">Particulier</SelectItem>
                                <SelectItem value="utilitaire">Utilitaire</SelectItem>
                                <SelectItem value="transport">Transport</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex justify-end gap-2">
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Annuler</Button>
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? "Chargement..." : (initialData ? "Modifier" : "Ajouter")}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
