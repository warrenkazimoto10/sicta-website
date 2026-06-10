import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  Mailbox,
} from "lucide-react";
import PageTransition from "@/components/PageTransition";
import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Contact = () => {
  const navigate = useNavigate();
  const { ref: sectionRef, isInView } = useScrollAnimation(0.2);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logique de soumission du formulaire
    console.log("Form submitted:", formData);
    // Réinitialiser le formulaire
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <PageTransition>
      <div className="w-full">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 via-background to-secondary/20 py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              
              <h1 className="text-5xl lg:text-6xl font-bold mb-6">
                <span className="text-sicta-grey-dark">Besoin d'aide ?</span>{" "}
                <span className="text-gradient">Contactez-nous</span>
              </h1>
              <p className="text-xl text-sicta-grey-light leading-relaxed max-w-3xl mx-auto">
                Notre équipe est à votre écoute pour répondre à toutes vos questions
                et vous accompagner dans vos démarches.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Information & Form */}
        <section ref={sectionRef} className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Information */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-bold text-sicta-grey-dark mb-6">
                    Nos Coordonnées
                  </h2>
                  <p className="text-lg text-sicta-grey-light mb-8">
                    Retrouvez-nous à l'une de nos agences ou contactez-nous directement.
                  </p>
                </div>

                <div className="space-y-6">
                  {/* Phone */}
                  <Card className="p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-start space-x-4">
                      <div className="bg-primary/10 rounded-full p-3">
                        <Phone className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-sicta-grey-dark mb-1">
                          Téléphone
                        </h3>
                        <p className="text-sicta-grey-light mb-2">
                          Appelez-nous du lundi au vendredi de 7h30 à 17h30
                        </p>
                        <a
                          href="tel:+2252721212990"
                          className="text-primary hover:underline font-medium"
                        >
                          27 21 21 29 90
                        </a>
                        <div className="mt-1">
                          <span className="text-sm text-sicta-grey-light">
                            N° vert :{" "}
                          </span>
                          <a
                            href="tel:80080041"
                            className="text-primary hover:underline font-medium"
                          >
                            800 800 41
                          </a>
                        </div>
                      </div>
                    </div>
                  </Card>

                  {/* Email */}
                  <Card className="p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-start space-x-4">
                      <div className="bg-primary/10 rounded-full p-3">
                        <Mail className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-sicta-grey-dark mb-1">
                          Email
                        </h3>
                        <p className="text-sicta-grey-light mb-2">
                          Envoyez-nous un email, nous vous répondrons sous 24h
                        </p>
                        <a
                          href="mailto:infos.sicta@sicta.ci"
                          className="text-primary hover:underline font-medium"
                        >
                          infos.sicta@sicta.ci
                        </a>
                      </div>
                    </div>
                  </Card>

                  {/* Address */}
                  <Card className="p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-start space-x-4">
                      <div className="bg-primary/10 rounded-full p-3">
                        <MapPin className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-sicta-grey-dark mb-1">
                          Adresse
                        </h3>
                        <p className="text-sicta-grey-light">
                          Zone 4C
                          <br />
                          Abidjan, Côte d'Ivoire
                        </p>
                      </div>
                    </div>
                  </Card>

                  {/* Opening Hours */}
                  <Card className="p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-start space-x-4">
                      <div className="bg-primary/10 rounded-full p-3">
                        <Clock className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-sicta-grey-dark mb-1">
                          Horaires
                        </h3>
                        <div className="text-sicta-grey-light space-y-1">
                          <p>Lundi - Vendredi : 7h30 - 17h30</p>
                          <p>Samedi : 8h00 - 12h00</p>
                          <p>Dimanche : Fermé</p>
                        </div>
                      </div>
                    </div>
                  </Card>
                
                </div>
              </div>

              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                transition={{ duration: 0.8 }}
              >
                <Card className="p-8 card-elevated">
                  <div className="mb-8">
                    <h2 className="text-3xl font-bold text-sicta-grey-dark mb-4">
                      Envoyez-nous un message
                    </h2>
                    <p className="text-sicta-grey-light">
                      Remplissez le formulaire ci-dessous et nous vous recontacterons
                      dans les plus brefs délais.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="name" className="text-sicta-grey-dark">
                          Nom complet *
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className="mt-2"
                          placeholder="Jean Dupont"
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone" className="text-sicta-grey-dark">
                          Téléphone *
                        </Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={handleChange}
                          className="mt-2"
                          placeholder="+225 XX XX XX XX XX"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="email" className="text-sicta-grey-dark">
                        Email *
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="mt-2"
                        placeholder="jean.dupont@example.com"
                      />
                    </div>

                    <div>
                      <Label htmlFor="subject" className="text-sicta-grey-dark">
                        Sujet *
                      </Label>
                      <Input
                        id="subject"
                        name="subject"
                        type="text"
                        required
                        value={formData.subject}
                        onChange={handleChange}
                        className="mt-2"
                        placeholder="Sujet de votre message"
                      />
                    </div>

                    <div>
                      <Label htmlFor="message" className="text-sicta-grey-dark">
                        Message *
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        required
                        value={formData.message}
                        onChange={handleChange}
                        className="mt-2 min-h-[150px]"
                        placeholder="Votre message..."
                      />
                    </div>

                    <Button type="submit" className="w-full btn-hero">
                      <Send className="h-4 w-4 mr-2" />
                      Envoyer le message
                    </Button>
                  </form>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Map or Additional Info */}
        <section className="py-20 bg-gradient-to-br from-sicta-grey/5 via-background to-primary/5">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-sicta-grey-dark mb-4">
                Trouvez l'agence la plus proche
              </h2>
              <p className="text-lg text-sicta-grey-light max-w-2xl mx-auto">
                SICTA dispose de 29 agences permanentes et 22 stations temporaires
                réparties sur l'ensemble du territoire ivoirien.
              </p>
            </div>
            <div className="flex justify-center">
              <Button
                size="lg"
                className="btn-hero"
                onClick={() => navigate("/reseau", { state: { rechercher: true } })}
              >
                <MapPin className="h-5 w-5 mr-2" />
                Rechercher
              </Button>
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default Contact;


