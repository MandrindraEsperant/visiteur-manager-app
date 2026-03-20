import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Visiteur {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    nom!: string;

    @Column({ type: "int" })
    nombre_de_jours!: number;

    @Column({ type: "decimal", precision: 10, scale: 2 })
    tarif_journalier!: number;
}