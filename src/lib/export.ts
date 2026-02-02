import { FleetVehicle } from "@/types/espacePro";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";

export const exportVehicles = (vehicles: FleetVehicle[], format: "excel" | "csv" | "pdf") => {
    if (format === "excel") {
        const worksheet = XLSX.utils.json_to_sheet(vehicles);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Vehicles");
        XLSX.writeFile(workbook, "flotte_sicta.xlsx");
    } else if (format === "csv") {
        const worksheet = XLSX.utils.json_to_sheet(vehicles);
        const csv = XLSX.utils.sheet_to_csv(worksheet);
        const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
        const link = document.createElement("a");
        if (link.download !== undefined) {
            const url = URL.createObjectURL(blob);
            link.setAttribute("href", url);
            link.setAttribute("download", "flotte_sicta.csv");
            link.style.visibility = "hidden";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    } else if (format === "pdf") {
        const doc = new jsPDF();
        autoTable(doc, {
            head: [["Immatriculation", "Marque", "Modèle", "Statut", "Prochain Contrôle"]],
            body: vehicles.map(v => [
                v.immatriculation,
                v.marque,
                v.modele,
                v.statut,
                new Date(v.prochainControle).toLocaleDateString()
            ]),
        });
        doc.save("flotte_sicta.pdf");
    }
};

export const generateMonthlyReportPDF = (data: any) => {
    const doc = new jsPDF();
    doc.text("Rapport Mensuel", 14, 15);
    // Add more details here
    doc.save("rapport_mensuel.pdf");
};
