import { useState } from "react";
import { Calendar, MapPin, Clock, Car, CreditCard, Smartphone, CheckCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const agencies = [
  { id: "abidjan-centre", name: "SICTA Abidjan Centre", address: "Boulevard Lagunaire, Plateau" },
  { id: "yopougon", name: "SICTA Yopougon", address: "Rue principale Yopougon" },
  { id: "bouake", name: "SICTA Bouaké", address: "Zone industrielle Bouaké" },
  { id: "san-pedro", name: "SICTA San Pedro", address: "Zone portuaire San Pedro" }
];

const timeSlots = [
  "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "14:00", "14:30", "15:00", "15:30", "16:00", "16:30"
];

const vehicleTypes = [
  { id: "light", name: "Véhicule léger (< 3,5T)", price: "15,000 FCFA" },
  { id: "heavy", name: "Poids lourd (> 3,5T)", price: "25,000 FCFA" },
  { id: "motorcycle", name: "Motocyclette", price: "10,000 FCFA" },
  { id: "bus", name: "Transport en commun", price: "30,000 FCFA" }
];

const Booking = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedAgency, setSelectedAgency] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");

  const nextStep = () => setCurrentStep(prev => prev + 1);
  const prevStep = () => setCurrentStep(prev => prev - 1);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-secondary/20 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Calendar className="h-4 w-4" />
              <span>Réservation en ligne</span>
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">
              <span className="text-sicta-grey-dark">Réservez votre</span>{" "}
              <span className="text-gradient">contrôle technique</span>
            </h1>
            <p className="text-xl text-sicta-grey-light leading-relaxed">
              Processus simple en 3 étapes : choisissez votre agence, 
              sélectionnez votre créneau et confirmez votre paiement.
            </p>
          </div>
        </div>
      </section>

      {/* Progress Steps */}
      <section className="py-12 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center space-x-8 max-w-2xl mx-auto">
            <div className={`flex items-center space-x-3 ${currentStep >= 1 ? 'text-primary' : 'text-sicta-grey-light'}`}>
              <div className={`h-10 w-10 rounded-full flex items-center justify-center font-semibold ${
                currentStep >= 1 ? 'bg-primary text-white' : 'bg-sicta-grey-light/20'
              }`}>
                1
              </div>
              <span className="font-medium">Agence & Date</span>
            </div>
            
            <div className={`flex-1 h-0.5 ${currentStep >= 2 ? 'bg-primary' : 'bg-sicta-grey-light/30'}`}></div>
            
            <div className={`flex items-center space-x-3 ${currentStep >= 2 ? 'text-primary' : 'text-sicta-grey-light'}`}>
              <div className={`h-10 w-10 rounded-full flex items-center justify-center font-semibold ${
                currentStep >= 2 ? 'bg-primary text-white' : 'bg-sicta-grey-light/20'
              }`}>
                2
              </div>
              <span className="font-medium">Véhicule</span>
            </div>
            
            <div className={`flex-1 h-0.5 ${currentStep >= 3 ? 'bg-primary' : 'bg-sicta-grey-light/30'}`}></div>
            
            <div className={`flex items-center space-x-3 ${currentStep >= 3 ? 'text-primary' : 'text-sicta-grey-light'}`}>
              <div className={`h-10 w-10 rounded-full flex items-center justify-center font-semibold ${
                currentStep >= 3 ? 'bg-primary text-white' : 'bg-sicta-grey-light/20'
              }`}>
                3
              </div>
              <span className="font-medium">Confirmation</span>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            
            {/* Step 1: Agency & Date */}
            {currentStep === 1 && (
              <Card className="card-elevated">
                <div className="p-8">
                  <h2 className="text-3xl font-bold text-sicta-grey-dark mb-8 text-center">
                    Choisissez votre agence et créneau
                  </h2>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium mb-3">Agence SICTA</label>
                        <Select value={selectedAgency} onValueChange={setSelectedAgency}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Sélectionnez une agence" />
                          </SelectTrigger>
                          <SelectContent>
                            {agencies.map(agency => (
                              <SelectItem key={agency.id} value={agency.id}>
                                <div>
                                  <div className="font-medium">{agency.name}</div>
                                  <div className="text-xs text-sicta-grey-light">{agency.address}</div>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-3">Date souhaitée</label>
                        <Input
                          type="date"
                          value={selectedDate}
                          onChange={(e) => setSelectedDate(e.target.value)}
                          min={new Date().toISOString().split('T')[0]}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-3">Créneau horaire</label>
                      <div className="grid grid-cols-3 gap-2">
                        {timeSlots.map(time => (
                          <button
                            key={time}
                            onClick={() => setSelectedTime(time)}
                            className={`p-3 text-sm rounded-lg border transition-all ${
                              selectedTime === time 
                                ? 'bg-primary text-white border-primary' 
                                : 'bg-background border-border hover:border-primary'
                            }`}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end mt-8">
                    <Button 
                      onClick={nextStep}
                      disabled={!selectedAgency || !selectedDate || !selectedTime}
                      className="btn-hero px-8 py-3"
                    >
                      Suivant
                      <Clock className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </Card>
            )}

            {/* Step 2: Vehicle Information */}
            {currentStep === 2 && (
              <Card className="card-elevated">
                <div className="p-8">
                  <h2 className="text-3xl font-bold text-sicta-grey-dark mb-8 text-center">
                    Informations du véhicule
                  </h2>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium mb-3">Type de véhicule</label>
                        <div className="space-y-3">
                          {vehicleTypes.map(type => (
                            <div
                              key={type.id}
                              onClick={() => setVehicleType(type.id)}
                              className={`p-4 border rounded-lg cursor-pointer transition-all ${
                                vehicleType === type.id 
                                  ? 'border-primary bg-primary/5' 
                                  : 'border-border hover:border-primary/50'
                              }`}
                            >
                              <div className="flex justify-between items-center">
                                <span className="font-medium">{type.name}</span>
                                <span className="text-primary font-semibold">{type.price}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium mb-3">Numéro d'immatriculation</label>
                        <Input placeholder="Ex: AB 1234 CD" />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-3">Marque du véhicule</label>
                        <Input placeholder="Ex: Toyota, Mercedes..." />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-3">Modèle</label>
                        <Input placeholder="Ex: Corolla, C-Class..." />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-3">Année</label>
                        <Input type="number" placeholder="Ex: 2020" min="1980" max={new Date().getFullYear()} />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between mt-8">
                    <Button variant="outline" onClick={prevStep}>
                      Retour
                    </Button>
                    <Button 
                      onClick={nextStep}
                      disabled={!vehicleType}
                      className="btn-hero px-8 py-3"
                    >
                      Suivant
                      <Car className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </Card>
            )}

            {/* Step 3: Payment & Confirmation */}
            {currentStep === 3 && (
              <Card className="card-elevated">
                <div className="p-8">
                  <h2 className="text-3xl font-bold text-sicta-grey-dark mb-8 text-center">
                    Confirmation & Paiement
                  </h2>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-xl font-semibold mb-4">Récapitulatif de votre réservation</h3>
                      <div className="space-y-4 p-4 bg-secondary/30 rounded-lg">
                        <div className="flex justify-between">
                          <span className="text-sicta-grey-light">Agence :</span>
                          <span className="font-medium">SICTA Abidjan Centre</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sicta-grey-light">Date :</span>
                          <span className="font-medium">15 Janvier 2025</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sicta-grey-light">Heure :</span>
                          <span className="font-medium">10:00</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sicta-grey-light">Type :</span>
                          <span className="font-medium">Véhicule léger</span>
                        </div>
                        <div className="border-t pt-3 flex justify-between text-lg font-bold">
                          <span>Total :</span>
                          <span className="text-primary">15,000 FCFA</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-4">Mode de paiement</h3>
                      <div className="space-y-3">
                        <div
                          onClick={() => setPaymentMethod("mobile")}
                          className={`p-4 border rounded-lg cursor-pointer transition-all ${
                            paymentMethod === "mobile" 
                              ? 'border-primary bg-primary/5' 
                              : 'border-border hover:border-primary/50'
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <Smartphone className="h-5 w-5 text-primary" />
                            <div>
                              <div className="font-medium">Mobile Money</div>
                              <div className="text-sm text-sicta-grey-light">Orange Money, MTN Money, Moov Money</div>
                            </div>
                          </div>
                        </div>

                        <div
                          onClick={() => setPaymentMethod("card")}
                          className={`p-4 border rounded-lg cursor-pointer transition-all ${
                            paymentMethod === "card" 
                              ? 'border-primary bg-primary/5' 
                              : 'border-border hover:border-primary/50'
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <CreditCard className="h-5 w-5 text-primary" />
                            <div>
                              <div className="font-medium">Carte bancaire</div>
                              <div className="text-sm text-sicta-grey-light">Visa, Mastercard</div>
                            </div>
                          </div>
                        </div>

                        <div
                          onClick={() => setPaymentMethod("onsite")}
                          className={`p-4 border rounded-lg cursor-pointer transition-all ${
                            paymentMethod === "onsite" 
                              ? 'border-primary bg-primary/5' 
                              : 'border-border hover:border-primary/50'
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <MapPin className="h-5 w-5 text-primary" />
                            <div>
                              <div className="font-medium">Paiement sur place</div>
                              <div className="text-sm text-sicta-grey-light">Espèces ou carte à l'agence</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between mt-8">
                    <Button variant="outline" onClick={prevStep}>
                      Retour
                    </Button>
                    <Button 
                      disabled={!paymentMethod}
                      className="btn-hero px-8 py-3"
                    >
                      Confirmer la réservation
                      <CheckCircle className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold text-sicta-grey-dark mb-4">
            Besoin d'aide pour votre réservation ?
          </h3>
          <p className="text-sicta-grey-light mb-6">
            Notre équipe est disponible pour vous accompagner dans votre démarche
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="btn-hero">
              Appeler le support
            </Button>
            <Button variant="outline">
              Chat en ligne
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Booking;