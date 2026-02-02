import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { RequestFormData } from "@/types/espacePro";

interface RequestModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSubmit: (data: RequestFormData) => Promise<void>;
    isLoading?: boolean;
}

export function RequestModal({ open, onOpenChange, onSubmit, isLoading }: RequestModalProps) {
    const { register, handleSubmit } = useForm<RequestFormData>();

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Nouvelle demande</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid gap-2">
                        <Label htmlFor="type">Type de demande</Label>
                        <Select onValueChange={(value) => { }}>
                            <SelectTrigger>
                                <SelectValue placeholder="Sélectionner un type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="transfert-plaque">Transfert de plaque</SelectItem>
                                <SelectItem value="civio">CIVIO</SelectItem>
                                <SelectItem value="ivn">IVN</SelectItem>
                                <SelectItem value="autre">Autre</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea id="description" {...register("description", { required: true })} />
                    </div>
                    <div className="flex justify-end gap-2">
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Annuler</Button>
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? "Envoi..." : "Envoyer"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
