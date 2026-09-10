import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ADMIN_BASE = import.meta.env.VITE_ADMIN_URL ?? "https://sicta.cieria-app.com";

const AdminRedirect = () => {
  const location = useLocation();

  useEffect(() => {
    // Construire l'URL complète côté backend Laravel
    // ex: /admin/login → http://127.0.0.1:8000/admin/login
    const target = ADMIN_BASE + location.pathname + location.search;
    window.location.replace(target);
  }, [location]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-white text-sm font-medium">Redirection vers le backoffice…</p>
      </div>
    </div>
  );
};

export default AdminRedirect;
