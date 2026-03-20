import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Visitor } from '../models/Visitor';

interface Props {
    visitors: Visitor[];
}

export const VisitorStats: React.FC<Props> = ({ visitors }) => {
    if (visitors.length === 0) return null;

    const tarifs = visitors.map(v => v.nombre_de_jours * v.tarif_journalier);
    const total = tarifs.reduce((sum, current) => sum + current, 0);
    const max = Math.max(...tarifs);
    const min = Math.min(...tarifs);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Statistiques des Tarifs</Text>
            <View style={styles.statRow}>
                <Text style={styles.label}>Tarif Total:</Text>
                <Text style={styles.value}>{total} Ar</Text>
            </View>
            <View style={styles.statRow}>
                <Text style={styles.label}>Tarif Minimal:</Text>
                <Text style={styles.value}>{min} Ar</Text>
            </View>
            <View style={styles.statRow}>
                <Text style={styles.label}>Tarif Maximal:</Text>
                <Text style={styles.value}>{max} Ar</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 15,
        backgroundColor: '#fff',
        borderRadius: 8,
        marginVertical: 10,
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 3,
        shadowOffset: { width: 0, height: 1 },
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
        color: '#2c3e50',
    },
    statRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    label: {
        fontSize: 16,
        color: '#34495e',
    },
    value: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#2980b9',
    }
});
