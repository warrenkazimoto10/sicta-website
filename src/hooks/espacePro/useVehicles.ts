import { useState, useEffect } from "react";
import {
    FleetVehicle,
    Alert,
    Request,
    Notification,
    PaginatedResponse,
    VehicleFormData,
    RequestFormData
} from "@/types/espacePro";

// Mock data generation
const generateMockVehicles = (count: number): FleetVehicle[] => {
    return Array.from({ length: count }).map((_, i) => ({
        id: `v-${i}`,
        companyId: "1",
        immatriculation: `AB-${100 + i}-CD`,
        marque: ["Toyota", "Peugeot", "Renault", "Mercedes"][Math.floor(Math.random() * 4)],
        modele: ["Corolla", "308", "Clio", "Sprinter"][Math.floor(Math.random() * 4)],
        type: ["particulier", "utilitaire", "transport"][Math.floor(Math.random() * 3)] as any,
        dernierControle: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
        prochainControle: new Date(Date.now() + Math.random() * 10000000000).toISOString(),
        statut: ["valide", "expire", "bientot-du"][Math.floor(Math.random() * 3)] as any,
        joursRestants: Math.floor(Math.random() * 365),
        agence: "Abidjan Plateau",
        dateAjout: new Date().toISOString(),
    }));
};

export const useVehicles = (page: number, limit: number, filters?: any) => {
    const [vehicles, setVehicles] = useState<PaginatedResponse<FleetVehicle> | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isCreating, setIsCreating] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const fetchVehicles = async () => {
            setIsLoading(true);
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            setVehicles({
                data: generateMockVehicles(10),
                total: 10,
                page,
                limit,
                totalPages: 1
            });
            setIsLoading(false);
        };
        fetchVehicles();
    }, [page, limit, JSON.stringify(filters)]);

    const createVehicle = async (data: VehicleFormData) => {
        setIsCreating(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        setIsCreating(false);
        // In a real app, we would refetch or update state
    };

    const updateVehicle = async ({ id, data }: { id: string, data: Partial<VehicleFormData> }) => {
        setIsUpdating(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        setIsUpdating(false);
    };

    const deleteVehicle = async (id: string) => {
        setIsDeleting(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        setIsDeleting(false);
    };

    return {
        vehicles,
        isLoading,
        createVehicle,
        updateVehicle,
        deleteVehicle,
        isCreating,
        isUpdating,
        isDeleting
    };
};

export const useVehicle = (id: string) => {
    const [vehicle, setVehicle] = useState<FleetVehicle | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchVehicle = async () => {
            setIsLoading(true);
            await new Promise(resolve => setTimeout(resolve, 500));
            setVehicle(generateMockVehicles(1)[0]);
            setIsLoading(false);
        };
        fetchVehicle();
    }, [id]);

    return { vehicle, isLoading };
};

export const useAlerts = (page: number, limit: number) => {
    const [alerts, setAlerts] = useState<PaginatedResponse<Alert> | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchAlerts = async () => {
            setIsLoading(true);
            await new Promise(resolve => setTimeout(resolve, 800));
            setAlerts({
                data: [],
                total: 0,
                page,
                limit,
                totalPages: 0
            });
            setIsLoading(false);
        };
        fetchAlerts();
    }, [page, limit]);

    const markAsRead = async (id: string) => { };
    const markAllAsRead = async () => { };
    const deleteAlert = async (id: string) => { };

    return { alerts, isLoading, markAsRead, markAllAsRead, deleteAlert };
};

export const useRequests = (page: number, limit: number) => {
    const [requests, setRequests] = useState<PaginatedResponse<Request> | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isCreating, setIsCreating] = useState(false);

    useEffect(() => {
        const fetchRequests = async () => {
            setIsLoading(true);
            await new Promise(resolve => setTimeout(resolve, 800));
            setRequests({
                data: [],
                total: 0,
                page,
                limit,
                totalPages: 0
            });
            setIsLoading(false);
        };
        fetchRequests();
    }, [page, limit]);

    const createRequest = async (data: RequestFormData) => {
        setIsCreating(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        setIsCreating(false);
    };

    return { requests, isLoading, createRequest, isCreating };
};

export const useRequest = (id: string) => {
    return { request: null, isLoading: false };
};

export const useNotifications = (page: number, limit: number) => {
    const [notifications, setNotifications] = useState<PaginatedResponse<Notification> | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchNotifications = async () => {
            setIsLoading(true);
            await new Promise(resolve => setTimeout(resolve, 800));
            setNotifications({
                data: [],
                total: 0,
                page,
                limit,
                totalPages: 0
            });
            setIsLoading(false);
        };
        fetchNotifications();
    }, [page, limit]);

    const markAsRead = async (id: string) => { };
    const markAllAsRead = async () => { };

    return {
        notifications,
        unreadCount: 0,
        isLoading,
        markAsRead,
        markAllAsRead
    };
};
