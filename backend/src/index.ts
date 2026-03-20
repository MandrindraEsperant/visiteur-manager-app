import express from "express";
import { AppDataSource } from "./data-source";

const app = express();
app.use(express.json());

const PORT = 3000;

AppDataSource.initialize()
    .then(() => {
        console.log("🚀 Connexion à PostgreSQL réussie !");
        
        app.listen(PORT, () => {
            console.log(`Serveur démarré sur http://localhost:${PORT}`);
        });
    })
    .catch((error) => console.log("❌ Erreur de connexion : ", error));