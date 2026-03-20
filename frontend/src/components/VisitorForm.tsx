import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Visitor } from '../models/Visitor';

interface Props {
    visitorToEdit: Visitor | null;
    onSave: (visitor: Omit<Visitor, "id"> | Visitor) => void;
    onCancel: () => void;
}

export const VisitorForm: React.FC<Props> = ({ visitorToEdit, onSave, onCancel }) => {
    const [nom, setNom] = useState('');
    const [nombre_de_jours, setNombreDeJours] = useState('');
    const [tarif_journalier, setTarifJournalier] = useState('');

    useEffect(() => {
        if (visitorToEdit) {
            setNom(visitorToEdit.nom);
            setNombreDeJours(visitorToEdit.nombre_de_jours.toString());
            setTarifJournalier(visitorToEdit.tarif_journalier.toString());
        } else {
            setNom('');
            setNombreDeJours('');
            setTarifJournalier('');
        }
    }, [visitorToEdit]);

    const handleSave = () => {
        if (!nom || !nombre_de_jours || !tarif_journalier) return;

        const visitorData = {
            nom,
            nombre_de_jours: parseInt(nombre_de_jours),
            tarif_journalier: parseFloat(tarif_journalier),
        };

        if (visitorToEdit) {
            onSave({ ...visitorData, id: visitorToEdit.id });
        } else {
            onSave(visitorData);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Nom du visiteur</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Ex: Jean Dupont"
                    value={nom}
                    onChangeText={setNom}
                    placeholderTextColor="#95a5a6"
                />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Nombre de jours</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Ex: 5"
                    value={nombre_de_jours}
                    onChangeText={setNombreDeJours}
                    keyboardType="numeric"
                    placeholderTextColor="#95a5a6"
                />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Tarif journalier (Ar)</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Ex: 20000"
                    value={tarif_journalier}
                    onChangeText={setTarifJournalier}
                    keyboardType="numeric"
                    placeholderTextColor="#95a5a6"
                />
            </View>

            <View style={styles.footer}>
                <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
                    <Text style={styles.cancelButtonText}>Annuler</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[styles.saveButton, (!nom || !nombre_de_jours || !tarif_journalier) && styles.disabledButton]} 
                    onPress={handleSave}
                    disabled={!nom || !nombre_de_jours || !tarif_journalier}
                >
                    <Text style={styles.saveButtonText}>{visitorToEdit ? "Mettre à jour" : "Ajouter"}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    inputContainer: {
        marginBottom: 15,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#34495e',
        marginBottom: 5,
    },
    input: {
        backgroundColor: '#f9f9f9',
        borderWidth: 1,
        borderColor: '#ecf0f1',
        padding: 12,
        borderRadius: 10,
        fontSize: 16,
        color: '#2c3e50',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 20,
        gap: 10,
    },
    saveButton: {
        backgroundColor: '#3498db',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 10,
        elevation: 2,
    },
    saveButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    cancelButton: {
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 10,
    },
    cancelButtonText: {
        color: '#7f8c8d',
        fontWeight: '600',
        fontSize: 16,
    },
    disabledButton: {
        backgroundColor: '#bdc3c7',
    }
});

