import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

interface ImportCSVModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onImport: (file: File) => Promise<void>;
    isLoading?: boolean;
}

export function ImportCSVModal({ open, onOpenChange, onImport, isLoading }: ImportCSVModalProps) {
    const [file, setFile] = useState<File | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (file) {
            await onImport(file);
            onOpenChange(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Importer des véhicules (CSV)</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid gap-2">
                        <Label htmlFor="file">Fichier CSV</Label>
                        <Input
                            id="file"
                            type="file"
                            accept=".csv"
                            onChange={handleFileChange}
                            required
                        />
                    </div>
                    <div className="text-sm text-gray-500">
                        <p>Le fichier doit contenir les colonnes suivantes :</p>
                        <ul className="list-disc list-inside mt-1">
                            <li>Immatriculation</li>
                            <li>Marque</li>
                            <li>Modèle</li>
                            <li>Type</li>
                        </ul>
                    </div>
                    <div className="flex justify-end gap-2">
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Annuler</Button>
                        <Button type="submit" disabled={!file || isLoading}>
                            {isLoading ? "Importation..." : "Importer"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
