import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getFavoriteCoffeeShops } from '../../api/favourityCoffeeShop_api';
import styles from '../styles/favourity_screens_style';
import CoffeeShopCard from "../../components/coffeeCard_component";

const FavoriteCoffeeShopsScreen = ({ navigation }) => {
    const [coffeeShops, setCoffeeShops] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFavoriteCoffeeShops = async () => {
            try {
                const data = await getFavoriteCoffeeShops();
                setCoffeeShops(data);
            } catch (err) {
                setError(err.message || 'Ошибка загрузки данных');
            } finally {
                setLoading(false);
            }
        };

        fetchFavoriteCoffeeShops();
    }, []);

    const renderCoffeeShopItem = ({ item }) => (
        <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('CoffeeShopDetail', { cafeId: item.id })}
        >
            <Text style={styles.cardTitle}>{item.name}</Text>
            <Text style={styles.cardSubtitle}>Адрес: {item.address || 'Не указан'}</Text>
        </TouchableOpacity>
    );

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

    if (coffeeShops.length === 0) {
        return (
            <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>У вас пока нет любимых кофеен.</Text>
                <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => navigation.navigate('TabNavigator')} // Навигация на экран напитков
                >
                    <Text style={styles.addButtonText}>Добавить кофейни</Text>
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
                <Text style={styles.header}>Любимые кофейни</Text>
            </View>
            <FlatList
                data={coffeeShops}
                renderItem={({ item }) => (
                    <CoffeeShopCard
                        coffeeShop={item}
                        onPress={() => navigation.navigate('CoffeeShopDetail', { cafeId: item.id })}
                    />
                )}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.list}
            />
        </View>
    );
};

export default FavoriteCoffeeShopsScreen;
