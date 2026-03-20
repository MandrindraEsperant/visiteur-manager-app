import { Visitor } from "../models/Visitor";

// API URL (adjust if testing on physical device, e.g., 'http://192.168.x.x:3001/api/visiteurs')
const API_URL = 'http://192.168.1.157:3001/api/visiteurs';

class VisitorService {
    async getVisitors(): Promise<Visitor[]> {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Erreur lors de la récupération des visiteurs");

        const data = await response.json();
        return data;
    }

    async addVisitor(visitor: Omit<Visitor, "id">): Promise<Visitor> {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(visitor),
        });
        if (!response.ok) throw new Error("Erreur lors de l'ajout");
        return await response.json();
    }

    async updateVisitor(id: number, updatedVisitor: Partial<Omit<Visitor, "id">>): Promise<Visitor> {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedVisitor),
        });
        if (!response.ok) throw new Error("Erreur lors de la mise à jour");
        return await response.json();
    }

    async deleteVisitor(id: number): Promise<void> {
        const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        if (!response.ok) throw new Error("Erreur lors de la suppression");
    }
}

export const visitorService = new VisitorService();
