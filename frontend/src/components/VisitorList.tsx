import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert, Platform } from 'react-native';
import { Visitor } from '../models/Visitor';

interface Props {
    visitors: Visitor[];
    onEdit: (visitor: Visitor) => void;
    onDelete: (id: number) => void;
    header?: React.ReactElement;
    footer?: React.ReactElement;
}

export const VisitorList: React.FC<Props> = ({ visitors, onEdit, onDelete, header, footer }) => {
    const renderItem = ({ item }: { item: Visitor }) => {
        const tarif = item.nombre_de_jours * item.tarif_journalier;
        return (
            <View style={styles.itemContainer}>
                <View style={styles.infoContainer}>
                    <Text style={styles.name}>{item.nom}</Text>
                    <Text>Jours: {item.nombre_de_jours} | Tarif jr: {item.tarif_journalier} Ar</Text>
                    <Text style={styles.total}>Tarif total: {tarif} Ar</Text>
                </View>
                <View style={styles.actionContainer}>
                    <TouchableOpacity style={styles.buttonEdit} onPress={() => onEdit(item)}>
                        <Text style={styles.buttonText}>Modifier</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.buttonDelete}
                        onPress={()=> onDelete(item.id)}
                    >
                        <Text style={styles.buttonText}>Supprimer</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    return (
        <FlatList
            data={visitors}
            keyExtractor={(item) => String(item.id)}
            renderItem={renderItem}
            ListHeaderComponent={header}
            ListFooterComponent={footer}
            ListEmptyComponent={<Text style={styles.empty}>Aucun visiteur enregistré</Text>}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
        />
    );
};

const styles = StyleSheet.create({
    listContainer: {
        paddingBottom: 20,
    },
    itemContainer: {
        flexDirection: 'row',
        padding: 15,
        backgroundColor: '#fff',
        marginBottom: 10,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'space-between',
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 3,
        shadowOffset: { width: 0, height: 1 },
    },
    infoContainer: {
        flex: 1,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    total: {
        color: '#27ae60',
        fontWeight: 'bold',
        marginTop: 4,
    },
    actionContainer: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: 70,
        marginLeft: 10,
    },
    buttonEdit: {
        backgroundColor: '#3498db',
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderRadius: 4,
        alignItems: 'center',
        marginBottom: 8,
    },
    buttonDelete: {
        backgroundColor: '#e74c3c',
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderRadius: 4,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
    },
    empty: {
        textAlign: 'center',
        marginVertical: 20,
        fontStyle: 'italic',
        color: '#7f8c8d'
    }
});
