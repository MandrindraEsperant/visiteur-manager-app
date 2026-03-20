import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Visiteur } from "../entities/Visiteur";

const visiteurRepository = AppDataSource.getRepository(Visiteur);

export class VisiteurController {
    
    // Ajouter un visiteur
    static async create(req: Request, res: Response) {
        try {
            const { nom, nombre_de_jours, tarif_journalier } = req.body;
            const visiteur = visiteurRepository.create({ nom, nombre_de_jours, tarif_journalier });
            await visiteurRepository.save(visiteur);
            res.status(201).json(visiteur);
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de l'ajout" });
        }
    }

    // Lire tous les visiteurs (avec calcul du tarif par ligne)
    static async getAll(req: Request, res: Response) {
        const visiteurs = await visiteurRepository.find();
        // On ajoute le calcul du tarif pour chaque ligne pour le FlatList du mobile
        const data = visiteurs.map(v => ({
            ...v,
            tarif: Number(v.nombre_de_jours) * Number(v.tarif_journalier)
        }));
        res.json(data);
    }

    // Modifier un visiteur
    static async update(req: Request, res: Response) {
        const { id } = req.params;
        try {
            await visiteurRepository.update(id, req.body);
            res.json({ message: "Visiteur mis à jour" });
        } catch (error) {
            res.status(500).json({ message: "Erreur de mise à jour" });
        }
    }

    // Supprimer un visiteur
    static async delete(req: Request, res: Response) {
        const { id } = req.params;
        await visiteurRepository.delete(id);
        res.json({ message: "Visiteur supprimé" });
    }

    // Statistiques (Total, Min, Max) pour le bas du tableau et les graphiques
    static async getStats(req: Request, res: Response) {
        const stats = await visiteurRepository
            .createQueryBuilder("visiteur")
            .select("SUM(visiteur.nombre_de_jours * visiteur.tarif_journalier)", "total")
            .addSelect("MIN(visiteur.tarif_journalier)", "min")
            .addSelect("MAX(visiteur.tarif_journalier)", "max")
            .getRawOne();
        
        res.json(stats);
    }
}