import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useForm } from "react-hook-form";
import { AlertSettingsFormData } from "@/types/espacePro";

interface AlertSettingsModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSubmit: (data: AlertSettingsFormData) => Promise<void>;
    initialData?: AlertSettingsFormData;
    isLoading?: boolean;
}

export function AlertSettingsModal({ open, onOpenChange, onSubmit, initialData, isLoading }: AlertSettingsModalProps) {
    const { register, handleSubmit, watch, setValue } = useForm<AlertSettingsFormData>({
        defaultValues: initialData
    });

    const emailActif = watch("emailActif");
    const smsActif = watch("smsActif");

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Paramètres des alertes</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="emailActif">Alertes par Email</Label>
                            <Switch
                                id="emailActif"
                                checked={emailActif}
                                onCheckedChange={(checked) => setValue("emailActif", checked)}
                            />
                        </div>

                        <div className="flex items-center justify-between">
                            <Label htmlFor="smsActif">Alertes par SMS</Label>
                            <Switch
                                id="smsActif"
                                checked={smsActif}
                                onCheckedChange={(checked) => setValue("smsActif", checked)}
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="seuilJours">Alerter avant (jours)</Label>
                            <Input
                                id="seuilJours"
                                type="number"
                                {...register("seuilJours", { valueAsNumber: true })}
                            />
                        </div>
                    </div>

                    <div className="flex justify-end gap-2">
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Annuler</Button>
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? "Enregistrement..." : "Enregistrer"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
