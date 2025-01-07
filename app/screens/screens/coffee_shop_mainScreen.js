import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, Switch } from 'react-native';
import styles from "../styles/coffee_shop_mainScreen_styles";
import CoffeeShopCard from "../../components/coffeeCard_component";
import { getCafes } from "../../api/coffeeShopsAll_api";

export default function CoffeeShopScreen({ navigation }) {
    const [cafes, setCafes] = useState([]); // Полный список кофеен
    const [search, setSearch] = useState('');
    const [filters, setFilters] = useState({ withDog: false, seats: false, withLaptop: false });
    const [showFilters, setShowFilters] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCafes = async () => {
            try {
                const response = await getCafes();
                setCafes(response);
            } catch (err) {
                setError("Не удалось загрузить кофейни. Проверьте подключение к интернету.");
            }
        };

        fetchCafes();
    }, []);

    const filteredCafes = useMemo(() => {
        return cafes.filter((item) => {
            const matchesSearch = search ? item.name.toLowerCase().includes(search.toLowerCase()) : true;
            const matchesDogs = filters.withDog ? item.withDog : true;
            const matchesSeats = filters.seats ? item.seats : true;
            const matchesLaptop = filters.withLaptop ? item.withLaptop : true;
            return matchesSearch && matchesDogs && matchesSeats && matchesLaptop;
        });
    }, [cafes, search, filters]);

    const handleSearch = (text) => {
        setSearch(text);
    };

    const toggleFilter = (key) => {
        setFilters((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.header}>Кофейни</Text>
                <TouchableOpacity
                    style={styles.filterButton}
                    onPress={() => setShowFilters(!showFilters)}
                >
                    <Text style={styles.filterButtonText}>{showFilters ? "Скрыть фильтры" : "Фильтры"}</Text>
                </TouchableOpacity>
            </View>
            {error && <Text style={styles.errorText}>{error}</Text>}
            {showFilters && (
                <View style={styles.filtersContainer}>
                    <View style={styles.filter}>
                        <Text style={styles.filterLabel}>С животными</Text>
                        <Switch
                            value={filters.withDog}
                            onValueChange={() => toggleFilter('withDog')}
                        />
                    </View>
                    <View style={styles.filter}>
                        <Text style={styles.filterLabel}>С сидячими местами</Text>
                        <Switch
                            value={filters.seats}
                            onValueChange={() => toggleFilter('seats')}
                        />
                    </View>
                    <View style={styles.filter}>
                        <Text style={styles.filterLabel}>С ноутбуком</Text>
                        <Switch
                            value={filters.withLaptop}
                            onValueChange={() => toggleFilter('withLaptop')}
                        />
                    </View>
                </View>
            )}
            <TextInput
                style={styles.searchBar}
                placeholder="Поиск кофейни..."
                value={search}
                onChangeText={handleSearch}
            />
            <FlatList
                data={filteredCafes}
                keyExtractor={(item) => String(item.id)}
                renderItem={({ item }) => (
                    <CoffeeShopCard
                        coffeeShop={item}
                        onPress={() => navigation.navigate('CoffeeShopDetail', { cafeId: item.id })}
                    />
                )}
            />
        </View>
    );
}
