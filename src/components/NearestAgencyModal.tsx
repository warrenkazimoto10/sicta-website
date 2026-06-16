import { useState, useCallback } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Navigation, Calendar, Loader2, AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { fetchNearestStations, type ApiStation } from "@/services/stationService";

interface NearestAgencyModalProps {
  open: boolean;
  onClose: () => void;
}

type ModalState =
  | { step: "idle" }
  | { step: "loading" }
  | { step: "results"; stations: ApiStation[] }
  | { step: "denied" }
  | { step: "error"; message: string };

const NearestAgencyModal = ({ open, onClose }: NearestAgencyModalProps) => {
  const navigate = useNavigate();
  const [state, setState]     = useState<ModalState>({ step: "idle" });
  const [cityInput, setCityInput] = useState("");

  const locate = useCallback(async () => {
    if (!navigator.geolocation) {
      setState({ step: "denied" });
      return;
    }
    setState({ step: "loading" });

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const stations = await fetchNearestStations(pos.coords.latitude, pos.coords.longitude, 3);
          setState({ step: "results", stations });
        } catch {
          setState({ step: "error", message: "Impossible de charger les agences proches." });
        }
      },
      () => setState({ step: "denied" }),
      { timeout: 8000 }
    );
  }, []);

  const handleClose = () => {
    setState({ step: "idle" });
    setCityInput("");
    onClose();
  };

  const openMaps = (station: ApiStation) => {
    if (station.maps_url) {
      window.open(station.maps_url, "_blank", "noopener");
    } else if (station.latitude && station.longitude) {
      window.open(
        `https://www.google.com/maps/dir/?api=1&destination=${station.latitude},${station.longitude}`,
        "_blank",
        "noopener"
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            Agences proches de vous
          </DialogTitle>
        </DialogHeader>

        <div className="mt-2 space-y-4">

          {/* État initial */}
          {state.step === "idle" && (
            <div className="text-center py-4">
              <div className="h-16 w-16 rounded-full bg-orange-50 flex items-center justify-center mx-auto mb-4">
                <Navigation className="h-8 w-8 text-primary" />
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Localisez-vous pour trouver les 3 agences SICTA les plus proches.
              </p>
              <Button onClick={locate} className="w-full bg-primary hover:bg-primary/90 text-white">
                <Navigation className="h-4 w-4 mr-2" />
                Me localiser
              </Button>
            </div>
          )}

          {/* Chargement */}
          {state.step === "loading" && (
            <div className="text-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-3" />
              <p className="text-sm text-gray-500">Recherche des agences proches…</p>
            </div>
          )}

          {/* Résultats */}
          {state.step === "results" && (
            <div className="space-y-3">
              {state.stations.length === 0 ? (
                <p className="text-center text-gray-400 py-4 text-sm">Aucune agence trouvée.</p>
              ) : (
                state.stations.map((station) => (
                  <div
                    key={station.id}
                    className="flex items-start gap-3 p-3 rounded-lg border border-gray-100 hover:border-orange-200 hover:bg-orange-50/50 transition-colors"
                  >
                    <div className="h-9 w-9 rounded-full bg-orange-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <MapPin className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-800 truncate">{station.nom}</p>
                      <p className="text-xs text-gray-400">{station.ville}</p>
                      {station.distance_km !== undefined && (
                        <p className="text-xs font-medium text-primary mt-0.5">
                          {station.distance_km < 1
                            ? `${Math.round(station.distance_km * 1000)} m`
                            : `${station.distance_km} km`}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col gap-1.5 flex-shrink-0">
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-xs h-7 px-2"
                        onClick={() => openMaps(station)}
                      >
                        <Navigation className="h-3 w-3 mr-1" />
                        Itinéraire
                      </Button>
                      <Button
                        size="sm"
                        className="text-xs h-7 px-2 bg-primary hover:bg-primary/90 text-white"
                        onClick={() => {
                          handleClose();
                          navigate(`/reservation?agence=${station.id}`);
                        }}
                      >
                        <Calendar className="h-3 w-3 mr-1" />
                        RDV
                      </Button>
                    </div>
                  </div>
                ))
              )}
              <Button variant="ghost" size="sm" className="w-full text-xs text-gray-400" onClick={locate}>
                Relancer la localisation
              </Button>
            </div>
          )}

          {/* Géolocalisation refusée */}
          {state.step === "denied" && (
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-3 rounded-lg bg-orange-50 border border-orange-100">
                <AlertTriangle className="h-4 w-4 text-orange-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-orange-700">
                  Géolocalisation refusée ou non disponible. Saisissez votre ville pour trouver une agence.
                </p>
              </div>
              <div className="flex gap-2">
                <Input
                  placeholder="Ex: Bouaké, Daloa, Korhogo…"
                  value={cityInput}
                  onChange={(e) => setCityInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleClose();
                      navigate(`/reseau?search=${encodeURIComponent(cityInput)}`);
                    }
                  }}
                />
                <Button
                  onClick={() => {
                    handleClose();
                    navigate(`/reseau?search=${encodeURIComponent(cityInput)}`);
                  }}
                  disabled={!cityInput.trim()}
                  className="bg-primary hover:bg-primary/90 text-white"
                >
                  Chercher
                </Button>
              </div>
            </div>
          )}

          {/* Erreur */}
          {state.step === "error" && (
            <div className="text-center py-4">
              <AlertTriangle className="h-8 w-8 text-orange-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600">{state.message}</p>
              <Button variant="outline" size="sm" className="mt-3" onClick={locate}>
                Réessayer
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NearestAgencyModal;
