import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Droplets, Container } from "lucide-react";
import {
  type ModeTableJaugeage,
  type LigneTableJaugeage,
  exempleTableJaugeageProduit,
  exempleTableJaugeageCreux,
} from "@/data/services/jaugeageBaremage";
import { cn } from "@/lib/utils";

export interface TableJaugeageProps {
  /** Type de table : hauteur produit (depuis le fond) ou hauteur du creux (depuis le sommet) */
  mode?: ModeTableJaugeage;
  /** Lignes pour volume = f(hauteur produit). Par défaut : données d'exemple. */
  entriesProduit?: LigneTableJaugeage[];
  /** Lignes pour volume = f(hauteur du creux). Par défaut : données d'exemple. */
  entriesCreux?: LigneTableJaugeage[];
  /** Afficher la colonne « Niveau matérialisé » */
  showNiveauMaterialise?: boolean;
  /** Identifiant ou désignation du contenant (ex. « Citerne XY – Certificat n°… ») */
  titreContenant?: string;
  /** Unité d'affichage pour la hauteur (défaut: "mm") */
  uniteHauteur?: "mm" | "cm";
  /** Unité d'affichage pour le volume (défaut: "L") */
  uniteVolume?: "L" | "m³";
  className?: string;
}

function formatVolume(value: number, unite: "L" | "m³"): string {
  if (unite === "m³") return (value / 1000).toFixed(3);
  return value.toLocaleString("fr-FR");
}

function TableJaugeageContent({
  entries,
  mode,
  showNiveauMaterialise,
  uniteHauteur,
  uniteVolume,
}: {
  entries: LigneTableJaugeage[];
  mode: ModeTableJaugeage;
  showNiveauMaterialise: boolean;
  uniteHauteur: "mm" | "cm";
  uniteVolume: "L" | "m³";
}) {
  const labelHauteur =
    mode === "produit"
      ? `Hauteur produit (${uniteHauteur})`
      : `Hauteur du creux (${uniteHauteur})`;
  const facteurHauteur = uniteHauteur === "cm" ? 0.1 : 1;

  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-sicta-grey/5 hover:bg-sicta-grey/10">
          <TableHead className="font-semibold text-sicta-grey-dark">
            {labelHauteur}
          </TableHead>
          <TableHead className="font-semibold text-sicta-grey-dark">
            Volume ({uniteVolume})
          </TableHead>
          {showNiveauMaterialise && (
            <TableHead className="font-semibold text-sicta-grey-dark">
              Niveau matérialisé
            </TableHead>
          )}
        </TableRow>
      </TableHeader>
      <TableBody>
        {entries.map((line, index) => (
          <TableRow
            key={index}
            className={cn(
              "transition-colors",
              line.niveauMaterialise && "bg-primary/5"
            )}
          >
            <TableCell className="font-mono tabular-nums">
              {(line.hauteurMm * facteurHauteur).toLocaleString("fr-FR")}
            </TableCell>
            <TableCell className="font-mono tabular-nums">
              {formatVolume(line.volumeL, uniteVolume)}
            </TableCell>
            {showNiveauMaterialise && (
              <TableCell>
                {line.niveauMaterialise ? (
                  <Badge variant="secondary" className="bg-primary/10 text-primary">
                    Oui
                  </Badge>
                ) : (
                  <span className="text-muted-foreground text-sm">—</span>
                )}
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

const TableJaugeage = ({
  mode = "produit",
  entriesProduit,
  entriesCreux,
  showNiveauMaterialise = true,
  titreContenant,
  uniteHauteur = "mm",
  uniteVolume = "L",
  className,
}: TableJaugeageProps) => {
  const [activeMode, setActiveMode] = useState<ModeTableJaugeage>(mode);
  const lignesProduit = entriesProduit ?? exempleTableJaugeageProduit;
  const lignesCreux = entriesCreux ?? exempleTableJaugeageCreux;
  const hasBoth =
    (entriesProduit != null && entriesCreux != null) ||
    (entriesProduit == null && entriesCreux == null);
  const modeUnique =
    entriesProduit != null ? "produit" : entriesCreux != null ? "creux" : mode;

  return (
    <Card
      className={cn(
        "overflow-hidden border-2 border-primary/10 bg-white shadow-lg",
        className
      )}
    >
      {titreContenant && (
        <div className="border-b border-primary/10 bg-sicta-grey/5 px-4 py-3">
          <p className="text-sm font-medium text-sicta-grey-dark">
            {titreContenant}
          </p>
        </div>
      )}
      <div className="p-4">
        {hasBoth ? (
          <Tabs
            value={activeMode}
            onValueChange={(v) => setActiveMode(v as ModeTableJaugeage)}
          >
            <TabsList className="mb-4 grid w-full grid-cols-2 max-w-md">
              <TabsTrigger value="produit" className="flex items-center gap-2">
                <Droplets className="h-4 w-4" />
                Volume = f(hauteur produit)
              </TabsTrigger>
              <TabsTrigger value="creux" className="flex items-center gap-2">
                <Container className="h-4 w-4" />
                Volume = f(hauteur du creux)
              </TabsTrigger>
            </TabsList>
            <TabsContent value="produit">
              <div className="rounded-md border overflow-auto max-h-[400px]">
                <TableJaugeageContent
                  entries={lignesProduit}
                  mode="produit"
                  showNiveauMaterialise={showNiveauMaterialise}
                  uniteHauteur={uniteHauteur}
                  uniteVolume={uniteVolume}
                />
              </div>
            </TabsContent>
            <TabsContent value="creux">
              <div className="rounded-md border overflow-auto max-h-[400px]">
                <TableJaugeageContent
                  entries={lignesCreux}
                  mode="creux"
                  showNiveauMaterialise={showNiveauMaterialise}
                  uniteHauteur={uniteHauteur}
                  uniteVolume={uniteVolume}
                />
              </div>
            </TabsContent>
          </Tabs>
        ) : (
          <div className="rounded-md border overflow-auto max-h-[400px]">
            <TableJaugeageContent
              entries={
                modeUnique === "produit" ? lignesProduit : lignesCreux
              }
              mode={modeUnique}
              showNiveauMaterialise={showNiveauMaterialise}
              uniteHauteur={uniteHauteur}
              uniteVolume={uniteVolume}
            />
          </div>
        )}
      </div>
    </Card>
  );
};

export default TableJaugeage;
