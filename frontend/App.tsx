import React from 'react';
import { MainScreen } from './src/screens/MainScreen';
import Toast, { BaseToast, ErrorToast, InfoToast, ToastConfig } from 'react-native-toast-message';
import { View, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const toastConfig: ToastConfig = {
    success: (props) => (
        <BaseToast
            {...props}
            style={{ borderLeftColor: '#2ecc71', backgroundColor: '#fff', height: 70, borderLeftWidth: 10, borderRadius: 12, elevation: 5, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 10 }}
            contentContainerStyle={{ paddingHorizontal: 15 }}
            text1Style={{ fontSize: 16, fontWeight: 'bold', color: '#2c3e50' }}
            text2Style={{ fontSize: 13, color: '#7f8c8d' }}
            renderLeadingIcon={() => (
                <View style={{ justifyContent: 'center', paddingLeft: 15 }}>
                    <MaterialCommunityIcons name="check-circle" size={28} color="#2ecc71" />
                </View>
            )}
        />
    ),
    error: (props) => (
        <ErrorToast
            {...props}
            style={{ borderLeftColor: '#e74c3c', backgroundColor: '#fff', height: 70, borderLeftWidth: 10, borderRadius: 12, elevation: 5, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 10 }}
            text1Style={{ fontSize: 16, fontWeight: 'bold', color: '#2c3e50' }}
            text2Style={{ fontSize: 13, color: '#7f8c8d' }}
            renderLeadingIcon={() => (
                <View style={{ justifyContent: 'center', paddingLeft: 15 }}>
                     <MaterialCommunityIcons name="alert-circle" size={28} color="#e74c3c" />
                </View>
            )}
        />
    ),
    info: (props) => (
        <InfoToast
            {...props}
            style={{ borderLeftColor: '#3498db', backgroundColor: '#fff', height: 70, borderLeftWidth: 10, borderRadius: 12, elevation: 5, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 10 }}
            text1Style={{ fontSize: 16, fontWeight: 'bold', color: '#2c3e50' }}
            text2Style={{ fontSize: 13, color: '#7f8c8d' }}
            renderLeadingIcon={() => (
                <View style={{ justifyContent: 'center', paddingLeft: 15 }}>
                     <MaterialCommunityIcons name="information" size={28} color="#3498db" />
                </View>
            )}
        />
    )
};

export default function App() {
    return (
        <>
            <MainScreen />
            <Toast config={toastConfig} position="top" topOffset={50} />
        </>
    );
}
