import express from "express";
import { AppDataSource } from "./data-source";
import visiteurRoutes from "./routes/visiteurRoutes";

const app = express();
app.use(express.json());
app.use("/api/visiteurs", visiteurRoutes);

const PORT = 3001;

AppDataSource.initialize()
    .then(() => {
        console.log("🚀 Connexion à PostgreSQL réussie !");
        
        app.listen(PORT, () => {
            console.log(`Serveur démarré sur http://localhost:${PORT}`);
        });
    })
    .catch((error) => console.log("❌ Erreur de connexion : ", error));