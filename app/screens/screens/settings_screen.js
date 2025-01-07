import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/settings_screen_style'; // Подключаем стили

const UserProfileScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Любимое</Text>
            </View>

            <ScrollView style={styles.scrollContainer}>
                <TouchableOpacity
                    style={styles.section}
                    onPress={() => navigation.navigate('FavouriteDrinks')}
                >
                    <Ionicons name="heart-outline" size={24} color="#FFA729" style={styles.icon} />
                    <Text style={styles.sectionText}>Любимые напитки</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.section}
                    onPress={() => navigation.navigate('FavoriteCoffeeShopsScreen')}
                >
                    <Ionicons name="cafe-outline" size={24} color="#FFA729" style={styles.icon} />
                    <Text style={styles.sectionText}>Любимые кофейни</Text>
                </TouchableOpacity>

            </ScrollView>
        </View>
    );
};

export default UserProfileScreen;
