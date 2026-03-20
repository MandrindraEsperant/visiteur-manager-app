import React from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { Visitor } from '../models/Visitor';

interface Props {
    visitors: Visitor[];
}

export const VisitorChart: React.FC<Props> = ({ visitors }) => {
    if (visitors.length === 0) return null;

    const tarifs = visitors.map(v => v.nombre_de_jours * v.tarif_journalier);
    const total = tarifs.reduce((sum, current) => sum + current, 0);
    const max = Math.max(...tarifs);
    const min = Math.min(...tarifs);

    const screenWidth = Dimensions.get('window').width;

    const data = [
        {
            name: 'Total',
            population: total,
            color: '#3498db',
            legendFontColor: '#7F7F7F',
            legendFontSize: 13,
        },
        {
            name: 'Maximal',
            population: max,
            color: '#e74c3c',
            legendFontColor: '#7F7F7F',
            legendFontSize: 13,
        },
        {
            name: 'Minimal',
            population: min,
            color: '#f1c40f',
            legendFontColor: '#7F7F7F',
            legendFontSize: 13,
        },
    ];

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Visualisation des Tarifs</Text>
            <PieChart
                data={data}
                width={screenWidth - 40}
                height={220}
                chartConfig={{
                    backgroundColor: '#ffffff',
                    backgroundGradientFrom: '#ffffff',
                    backgroundGradientTo: '#ffffff',
                    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                }}
                accessor={'population'}
                backgroundColor={'transparent'}
                paddingLeft={'0'}
                center={[0, 0]}
                absolute
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        padding: 10,
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
        color: '#2c3e50',
    }
});
