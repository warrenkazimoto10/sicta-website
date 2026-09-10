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
  CheckCircle,
} from "lucide-react";
import PageTransition from "@/components/PageTransition";
import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { sendContactMessage } from "@/services/contactService";
import { useQuery } from "@tanstack/react-query";
import { fetchSettings } from "@/services/settingsService";

const Contact = () => {
  const navigate = useNavigate();
  const { ref: sectionRef, isInView } = useScrollAnimation(0.2);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);

  const { data: settings } = useQuery({
    queryKey: ["settings"],
    queryFn: fetchSettings,
    staleTime: 300_000,
  });

  const phoneValue = settings?.settings_phone || "27 21 21 29 90";
  const emailValue = settings?.settings_email || "infos@sicta.ci";
  const addressValue = settings?.settings_address || "Rue Abli Mathieu, Zone 4C, Marcory\nAbidjan, Côte d'Ivoire";
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setSendError(null);
    try {
      await sendContactMessage({
        nom_complet: formData.name,
        telephone: formData.phone,
        email: formData.email,
        sujet: formData.subject,
        message: formData.message,
      });
      setSubmitted(true);
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch (err) {
      setSendError(err instanceof Error ? err.message : "Erreur lors de l'envoi. Réessayez.");
    } finally {
      setSending(false);
    }
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
        <section ref={sectionRef} className="py-20 bg-sicta-bg-peach">
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
                          href={`tel:${phoneValue.replace(/\s/g, "")}`}
                          className="text-primary hover:underline font-medium animate-pulse-slow"
                        >
                          {phoneValue}
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
                          href={`mailto:${emailValue}`}
                          className="text-primary hover:underline font-medium"
                        >
                          {emailValue}
                        </a>
                      </div>
                    </div>
                  </Card>

                  {/* Address */}
                  <Card className="p-6 hover:shadow-lg transition-shadow border border-orange-100 bg-orange-50/20">
                    <div className="flex items-start space-x-4">
                      <div className="bg-primary/10 rounded-full p-3">
                        <MapPin className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-sicta-grey-dark mb-1">
                          Adresse (Siège Social)
                        </h3>
                        <p className="text-sicta-grey-light whitespace-pre-line">
                          {addressValue}
                        </p>
                        <a
                          href="https://maps.app.goo.gl/raaF3pipxgcsBByV7"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline text-sm mt-1 inline-block font-semibold"
                        >
                          Voir sur Google Maps →
                        </a>
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
                          <p>Lundi - Vendredi : 7h30 - 17h00</p>

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
                  {submitted ? (
                    <div className="flex flex-col items-center text-center py-8 space-y-4">
                      <div className="h-20 w-20 bg-green-100 rounded-full flex items-center justify-center">
                        <CheckCircle className="h-12 w-12 text-green-600" />
                      </div>
                      <h3 className="text-2xl font-bold text-sicta-grey-dark">
                        Message envoyé !
                      </h3>
                      <p className="text-sicta-grey-light max-w-sm">
                        Merci de nous avoir contactés. Notre équipe vous répondra
                        dans un délai de 24h à l'adresse{" "}
                        <a href={`mailto:${emailValue}`} className="text-primary font-medium">
                          {emailValue}
                        </a>
                        .
                      </p>
                      <Button
                        variant="outline"
                        className="mt-4"
                        onClick={() => setSubmitted(false)}
                      >
                        Envoyer un autre message
                      </Button>
                    </div>
                  ) : (
                    <>
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

                        {sendError && (
                          <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-2">
                            {sendError}
                          </p>
                        )}
                        <Button type="submit" className="w-full btn-hero" disabled={sending}>
                          <Send className="h-4 w-4 mr-2" />
                          {sending ? "Envoi en cours…" : "Envoyer le message"}
                        </Button>
                      </form>
                    </>
                  )}
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Google Maps iframe */}
        <section className="py-20 bg-gradient-to-br from-sicta-grey/5 via-background to-primary/5">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-sicta-grey-dark mb-4">
                Notre Localisation (Siège Social - Zone 4C)
              </h2>
              <p className="text-lg text-sicta-grey-light max-w-2xl mx-auto mb-8">
                Retrouvez notre direction générale et nos bureaux de Marcory Zone 4C.
              </p>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-primary/20 mb-8 max-w-5xl mx-auto">
              <iframe
                title="SICTA Direction Générale - Zone 4C, Marcory, Abidjan"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3972.7824132800366!2d-3.999558985235222!3d5.321151696182186!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfc1ef6beeeeeeeb%3A0xe54d24beceb162cd!2sRue+Abli+Mathieu%2C+Abidjan!5e0!3m2!1sfr!2sci!4v1699999999999!5m2!1sfr!2sci"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <div className="flex justify-center gap-4">
              <Button
                size="lg"
                variant="outline"
                asChild
              >
                <a
                  href="https://maps.app.goo.gl/raaF3pipxgcsBByV7"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MapPin className="h-5 w-5 mr-2 text-primary" />
                  Ouvrir sur Google Maps
                </a>
              </Button>
              <Button
                size="lg"
                className="btn-hero"
                onClick={() => navigate("/reseau")}
              >
                <MapPin className="h-5 w-5 mr-2" />
                Découvrir l'ensemble du réseau
              </Button>
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default Contact;


