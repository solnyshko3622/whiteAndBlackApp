import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { getFavoriteDrinks } from '../../api/favourityDrinks_api';
import styles from '../styles/favourity_screens_style';
import DrinkCard from "../../components/drinkCard_component";
import { Ionicons } from "@expo/vector-icons";

const FavouriteDrinksScreen = ({ navigation }) => {
    const [drinks, setDrinks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFavoriteDrinks = async () => {
            try {
                const data = await getFavoriteDrinks();
                setDrinks(data);
            } catch (err) {
                setError(err.message || 'Ошибка загрузки данных');
            } finally {
                setLoading(false);
            }
        };

        fetchFavoriteDrinks();
    }, []);

    if (loading) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="#FFA729" />
                <Text>Загрузка...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>Ошибка: {error}</Text>
            </View>
        );
    }

    if (drinks.length === 0) {
        return (
            <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>Упс, кажется вы пока не добавляли напитки в избранное. Хотите добавить?</Text>
                <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => navigation.navigate('TabNavigator')} // Навигация на экран напитков
                >
                    <Text style={styles.addButtonText}>Добавить напитки</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="#FFF" />
                </TouchableOpacity>
                <Text style={styles.header}>Любимые напитки</Text>
            </View>
            <View style={styles.list}>
                <FlatList
                    data={drinks}
                    renderItem={({ item }) => (
                        <DrinkCard
                            drink={item}
                            onPress={() => navigation.navigate('DrinkScreen', { drinkId: item.id })}
                        />
                    )}
                    keyExtractor={(item) => item.id.toString()}
                />
            </View>
        </View>
    );
};

export default FavouriteDrinksScreen;
