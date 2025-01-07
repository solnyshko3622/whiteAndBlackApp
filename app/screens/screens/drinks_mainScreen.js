import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, Switch } from 'react-native';
import styles from "../styles/drinks_screen_styles";
import { getDrinks } from '../../api/drinksAll_api';
import DrinkCard from "../../components/drinkCard_component"; // Импортируем функцию для получения напитков

export default function DrinksScreen({ navigation }) {
    const [drinks, setDrinks] = useState([]);
    const [filteredDrinks, setFilteredDrinks] = useState([]);
    const [search, setSearch] = useState('');
    const [filters, setFilters] = useState({ hot: false, iced: false, coffee: false, tea: false, other: false });
    const [showFilters, setShowFilters] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDrinks = async () => {
            try {
                const data = await getDrinks();
                setDrinks(data);
                setFilteredDrinks(data);
            } catch (error) {
                console.error("Ошибка при загрузке напитков", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDrinks();
    }, []);

    const handleSearch = (text) => {
        setSearch(text);
        applyFilters({ ...filters, search: text });
    };

    const toggleFilter = (key) => {
        const updatedFilters = { ...filters, [key]: !filters[key] };
        setFilters(updatedFilters);
        applyFilters(updatedFilters);
    };

    const applyFilters = ({ hot, iced, coffee, tea, other }) => {
        const filteredData = drinks.filter((item) => {
            const matchesSearch = search ? item.name.toLowerCase().includes(search.toLowerCase()) : true;

            const matchesHot = hot ? item.temperature === "HOT" : true;
            const matchesIced = iced ? item.temperature === "COLD" : true;

            const matchesCoffee = coffee ? item.type.includes("COFFEE") : true;
            const matchesTea = tea ? item.type === "MATCHA" : true;
            const matchesOther = other ? !item.type.includes("COFFEE") && item.type !== "MATCHA" : true;

            return matchesSearch && matchesHot && matchesIced && matchesCoffee && matchesTea && matchesOther;
        });

        setFilteredDrinks(filteredData);
    };

    if (loading) {
        return (
            <View style={styles.loaderContainer}>
                <Text>Загрузка...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.header}>Напитки</Text>
                <TouchableOpacity
                    style={styles.filterButton}
                    onPress={() => setShowFilters(!showFilters)}
                >
                    <Text style={styles.filterButtonText}>{showFilters ? "Скрыть фильтры" : "Фильтры"}</Text>
                </TouchableOpacity>
            </View>

            {showFilters && (
                <View style={styles.filtersContainer}>
                    <View style={styles.filter}>
                        <Text style={styles.filterLabel}>Горячий</Text>
                        <Switch value={filters.hot} onValueChange={() => toggleFilter('hot')} />
                    </View>
                    <View style={styles.filter}>
                        <Text style={styles.filterLabel}>Со льдом</Text>
                        <Switch value={filters.iced} onValueChange={() => toggleFilter('iced')} />
                    </View>
                    <View style={styles.filter}>
                        <Text style={styles.filterLabel}>Кофе</Text>
                        <Switch value={filters.coffee} onValueChange={() => toggleFilter('coffee')} />
                    </View>
                    <View style={styles.filter}>
                        <Text style={styles.filterLabel}>Чай</Text>
                        <Switch value={filters.tea} onValueChange={() => toggleFilter('tea')} />
                    </View>
                    <View style={styles.filter}>
                        <Text style={styles.filterLabel}>Другие напитки</Text>
                        <Switch value={filters.other} onValueChange={() => toggleFilter('other')} />
                    </View>
                </View>
            )}

            <TextInput
                style={styles.searchBar}
                placeholder="Поиск напитка..."
                value={search}
                onChangeText={handleSearch}
            />

            <FlatList
                data={filteredDrinks}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <DrinkCard
                        drink={item}
                        onPress={() => navigation.navigate('DrinkScreen', { drinkId: item.id })}
                    />
                )}
                ListEmptyComponent={<Text style={styles.emptyText}>Нет подходящих напитков</Text>}
            />
        </View>
    );
}
