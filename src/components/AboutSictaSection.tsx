import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Shield,
  Award,
  MapPin,
  ArrowRight,
  CheckCircle
} from "lucide-react";
import sictaInspectionImage from "@/assets/sicta-inspection-modern.jpg";
import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const AboutSictaSection = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { ref: sectionRef, isInView } = useScrollAnimation(0.2);

  const highlights = t("newEra.highlights", { returnObjects: true }) as string[];

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-br from-primary/5 via-background to-secondary/20">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
          >
            <div className="space-y-4">
              

              <h2 className="text-4xl lg:text-5xl font-bold text-sicta-grey-dark">
                {t("newEra.title")}{" "}
                <span className="text-gradient">{t("newEra.titleHighlight")}</span>
              </h2>

              <p className="text-xl text-sicta-grey-light leading-relaxed">
                {t("newEra.description")}
              </p>
            </div>

            {/* Highlights */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-sicta-grey-dark">{t("newEra.keyPoints")}</h3>
              <div className="space-y-3">
                {highlights.map((highlight, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                    <span className="text-sicta-grey-light">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>


            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="btn-hero" onClick={() => navigate("/reseau")}>
                <MapPin className="h-4 w-4 mr-2" />
                {t("newEra.findAgency")}
              </Button>
              <Button className="btn-outline" onClick={() => navigate("/a-propos")}>
                {t("newEra.learnMore")}
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative overflow-hidden rounded-2xl shadow-2xl group">
              <img
                src={sictaInspectionImage}
                alt="Centre d'inspection SICTA moderne"
                className="w-full h-[500px] object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>

            {/* Floating Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 1, duration: 0.6 }}
              whileHover={{ scale: 1.05 }}
            >
              <Card className="absolute -bottom-6 -left-6 p-6 bg-white shadow-xl border-l-4 border-l-primary hover:shadow-2xl transition-shadow duration-300">
                <div className="flex items-center space-x-4">
                  <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Award className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <div className="font-bold text-sicta-grey-dark">{t("newEra.isoCert")}</div>
                    <div className="text-sm text-sicta-grey-light">{t("newEra.isoCertLabel")}</div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSictaSection;