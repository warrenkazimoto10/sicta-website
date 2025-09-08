import { Star, User, Quote } from "lucide-react";
import { Card } from "@/components/ui/card";
import customerTestimonials from "@/assets/customer-testimonials.jpg";

const testimonials = [
  {
    name: "Kouadio Adjoua",
    position: "Commerçante",
    content: "Service rapide et professionnel. Mon véhicule a été contrôlé en 20 minutes et j'ai reçu un rapport détaillé. Je recommande vivement SICTA !",
    rating: 5,
    location: "Abidjan"
  },
  {
    name: "Mamadou Traoré", 
    position: "Chauffeur de taxi",
    content: "Excellent service client et prix abordable. L'équipe SICTA m'a aidé à comprendre les points à améliorer sur mon véhicule.",
    rating: 5,
    location: "Bouaké"
  },
  {
    name: "Marie-Claire Assoumou",
    position: "Directrice d'entreprise",
    content: "SICTA a contrôlé toute notre flotte d'entreprise. Service impeccable, ponctualité respectée et personnel très compétent.",
    rating: 5,
    location: "San Pedro"
  }
];

const TestimonialSection = () => {
  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-sicta-grey-dark mb-4">
            Ce que disent nos clients
          </h2>
          <p className="text-xl text-sicta-grey-light">
            Plus de 50 ans de confiance et de satisfaction client
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative">
            <img 
              src={customerTestimonials}
              alt="Clients satisfaits SICTA - Témoignages de satisfaction"
              className="w-full h-80 lg:h-96 object-cover rounded-2xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
          </div>

          {/* Testimonials */}
          <div className="space-y-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="card-elevated p-6 relative">
                <Quote className="h-8 w-8 text-primary/30 absolute top-4 right-4" />
                
                <div className="flex items-center space-x-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
                
                <p className="text-sicta-grey-light mb-4 italic leading-relaxed">
                  "{testimonial.content}"
                </p>
                
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold text-sicta-grey-dark">{testimonial.name}</div>
                    <div className="text-sm text-sicta-grey-light">{testimonial.position} • {testimonial.location}</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 text-center">
          <div>
            <div className="text-3xl font-bold text-primary mb-2">98%</div>
            <div className="text-sicta-grey-light">Clients satisfaits</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary mb-2">20min</div>
            <div className="text-sicta-grey-light">Temps moyen</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary mb-2">4.9/5</div>
            <div className="text-sicta-grey-light">Note moyenne</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary mb-2">500k+</div>
            <div className="text-sicta-grey-light">Véhicules contrôlés</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;