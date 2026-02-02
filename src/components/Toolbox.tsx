import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Users, 
  Award, 
  Calendar, 
  Download, 
  Shield,
  ChevronLeft,
  Settings
} from "lucide-react";
import { Button } from "@/components/ui/button";

const Toolbox = () => {
  const [isOpen, setIsOpen] = useState(false);

  const tools = [
    {
      icon: Users,
      label: "Carrières",
      href: "/carrieres",
      color: "bg-blue-500"
    },
    {
      icon: Award,
      label: "Mur de l'Excellence",
      href: "/excellence",
      color: "bg-yellow-500"
    },
    {
      icon: Calendar,
      label: "Galerie",
      href: "/galerie",
      color: "bg-green-500"
    },
    {
      icon: Download,
      label: "À télécharger",
      href: "/telechargements",
      color: "bg-purple-500"
    },
    {
      icon: Shield,
      label: "Espace Client",
      href: "/espace-client",
      color: "bg-red-500"
    }
  ];

  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 z-40">
      {/* Toolbox Button */}
      <motion.div
        className="relative"
        initial={{ x: 0 }}
        animate={{ x: isOpen ? -200 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="h-14 w-14 rounded-full bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-300"
          size="icon"
        >
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <Settings className="h-6 w-6 text-white" />
          </motion.div>
        </Button>

        {/* Tool Items */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="absolute right-16 top-0 space-y-3"
            >
              {tools.map((tool, index) => (
                <motion.div
                  key={tool.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link to={tool.href}>
                    <motion.div
                      className="flex items-center space-x-3 bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 p-3 min-w-[200px]"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className={`h-10 w-10 rounded-full ${tool.color} flex items-center justify-center`}>
                        <tool.icon className="h-5 w-5 text-white" />
                      </div>
                      <span className="text-sicta-grey-dark font-medium text-sm">
                        {tool.label}
                      </span>
                    </motion.div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 z-30"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Toolbox;







