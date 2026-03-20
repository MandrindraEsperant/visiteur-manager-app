import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ActivityIndicator, Platform, StatusBar } from 'react-native';
import { Visitor } from '../models/Visitor';
import { visitorService } from '../services/VisitorService';
import { VisitorForm } from '../components/VisitorForm';
import { VisitorList } from '../components/VisitorList';
import { VisitorStats } from '../components/VisitorStats';
import { VisitorChart } from '../components/VisitorChart';
import { ModernModal } from '../components/ModernModal';
import { SuccessModal } from '../components/SuccessModal';
import Toast from 'react-native-toast-message';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';

export const MainScreen: React.FC = () => {
    const [visitors, setVisitors] = useState<Visitor[]>([]);
    const [visitorToEdit, setVisitorToEdit] = useState<Visitor | null>(null);
    const [loading, setLoading] = useState(true);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [isDeleteVisible, setIsDeleteVisible] = useState(false);
    const [idToDelete, setIdToDelete] = useState<number | null>(null);
    const [successModal, setSuccessModal] = useState({ visible: false, title: '', message: '' });

    useEffect(() => {
        loadVisitors();
    }, []);

    const loadVisitors = async () => {
        setLoading(true);
        try {
            const data = await visitorService.getVisitors();
            setVisitors(data);
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Erreur de chargement',
                text2: 'Impossible de récupérer la liste des visiteurs.'
            });
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (visitorData: Omit<Visitor, "id"> | Visitor) => {
        setLoading(true);
        setIsFormVisible(false);
        try {
            if ('id' in visitorData) {
                await visitorService.updateVisitor(visitorData.id as number, visitorData);
                setSuccessModal({
                    visible: true,
                    title: 'Mise à jour réussie',
                    message: `${visitorData.nom} a été mis à jour avec succès.`
                });
            } else {
                await visitorService.addVisitor(visitorData);
                setSuccessModal({
                    visible: true,
                    title: 'Visiteur ajouté',
                    message: `Le nouveau visiteur ${visitorData.nom} a été enregistré.`
                });
            }
            setVisitorToEdit(null);
            await loadVisitors();
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Opération échouée',
                text2: "Une erreur est survenue lors de l'enregistrement."
            });
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (visitor: Visitor) => {
        setVisitorToEdit(visitor);
        setIsFormVisible(true);
    };

    const confirmDelete = (id: number) => {
        setIdToDelete(id);
        setIsDeleteVisible(true);
    };

    const handleDelete = async () => {
        if (idToDelete === null) return;
        setLoading(true);
        setIsDeleteVisible(false);
        try {
            await visitorService.deleteVisitor(idToDelete);
            setSuccessModal({
                visible: true,
                title: 'Suppression réussie',
                message: 'Le visiteur a bien été retiré de la base de données.'
            });
            await loadVisitors();
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Erreur',
                text2: 'Impossible de supprimer ce visiteur.'
            });
        } finally {
            setIdToDelete(null);
            setLoading(false);
        }
    };

    const handleCancelEdit = () => {
        setVisitorToEdit(null);
        setIsFormVisible(false);
    };

    const header = null;

    const footer = (
        <View style={styles.footerContainer}>
            <VisitorStats visitors={visitors} />
            <VisitorChart visitors={visitors} />
        </View>
    );

    return (
        <View style={styles.safeArea}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Gestion des Visiteurs</Text>
                <Text style={styles.headerSubtitle}>{visitors.length} Visiteurs enregistrés</Text>
            </View>

            <View style={styles.container}>
                {loading && visitors.length === 0 ? (
                    <ActivityIndicator size="large" color="#3498db" style={styles.loader} />
                ) : (
                    <VisitorList
                        visitors={visitors}
                        onEdit={handleEdit}
                        onDelete={confirmDelete}
                        header={header}
                        footer={footer}
                    />
                )}
            </View>

            <TouchableOpacity 
                style={styles.fab} 
                onPress={() => {
                    setVisitorToEdit(null);
                    setIsFormVisible(true);
                }}
            >
                <MaterialCommunityIcons name="plus" size={30} color="white" />
            </TouchableOpacity>

            <ModernModal
                visible={isFormVisible}
                onClose={handleCancelEdit}
                title={visitorToEdit ? "Modifier le visiteur" : "Nouveau visiteur"}
            >
                <VisitorForm
                    visitorToEdit={visitorToEdit}
                    onSave={handleSave}
                    onCancel={handleCancelEdit}
                />
            </ModernModal>

            <ModernModal
                visible={isDeleteVisible}
                onClose={() => setIsDeleteVisible(false)}
                title="Confirmer la suppression"
            >
                <View style={styles.deleteModalBody}>
                    <MaterialCommunityIcons name="alert-circle-outline" size={60} color="#e74c3c" style={styles.deleteIcon} />
                    <Text style={styles.deleteText}>Êtes-vous sûr de vouloir supprimer ce visiteur ? Cette action est irréversible.</Text>
                    <View style={styles.deleteButtons}>
                        <TouchableOpacity style={styles.cancelDeleteButton} onPress={() => setIsDeleteVisible(false)}>
                            <Text style={styles.cancelDeleteText}>Annuler</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.confirmDeleteButton} onPress={handleDelete}>
                            <Text style={styles.confirmDeleteText}>Supprimer</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ModernModal>

            <SuccessModal
                visible={successModal.visible}
                onClose={() => setSuccessModal({ ...successModal, visible: false })}
                title={successModal.title}
                message={successModal.message}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#ecf0f1',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    header: {
        padding: 20,
        backgroundColor: '#2980b9',
        alignItems: 'center',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 40,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
    },
    headerTitle: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
        letterSpacing: 0.5,
    },
    headerSubtitle: {
        color: 'rgba(255, 255, 255, 0.8)',
        fontSize: 14,
        marginTop: 5,
    },
    container: {
        flex: 1,
        paddingHorizontal: 15,
        marginTop: 10,
    },
    loader: {
        marginTop: 50,
    },
    footerContainer: {
        marginTop: 20,
        marginBottom: 80, // Space for FAB
    },
    fab: {
        position: 'absolute',
        bottom: 30,
        right: 30,
        backgroundColor: '#2980b9',
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
    },
    deleteModalBody: {
        alignItems: 'center',
        paddingVertical: 10,
    },
    deleteIcon: {
        marginBottom: 15,
    },
    deleteText: {
        textAlign: 'center',
        fontSize: 16,
        color: '#34495e',
        lineHeight: 22,
        marginBottom: 25,
    },
    deleteButtons: {
        flexDirection: 'row',
        gap: 15,
    },
    cancelDeleteButton: {
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 10,
    },
    cancelDeleteText: {
        color: '#7f8c8d',
        fontWeight: '600',
        fontSize: 16,
    },
    confirmDeleteButton: {
        backgroundColor: '#e74c3c',
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 10,
        elevation: 2,
    },
    confirmDeleteText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    }
});
