import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ScrollView, ActivityIndicator, Alert, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/drinkDetailed_screen_styles';
import { getDrink } from '../../api/drinkDetail_api';
import { sendLike } from '../../api/like_api';
import {Picker} from "@react-native-picker/picker";
import {sendDrinkReview} from "../../api/reviewDrinkSend_api";
import ReviewCard from "../../components/reviewCard_component";

const DrinkScreen = ({ route, navigation }) => {
    const { drinkId } = route.params;
    const [drink, setDrink] = useState(null);
    const [loading, setLoading] = useState(true);
    const [liked, setLiked] = useState(false);
    const [showReviewInput, setShowReviewInput] = useState(false);
    const [reviewText, setReviewText] = useState('');
    const [reviewScore, setReviewScore] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const getDrinkType = (type) => {
        switch (type) {
            case 'MATCHA': return 'Матча';
            case 'WHITE_COFFEE_AUTHOR': return 'Белый авторский кофе';
            case 'WHITE_COFFEE_CLASSIC': return 'Белый классический кофе';
            case 'BLACK_COFFEE': return 'Чёрный кофе';
            default: return 'Неизвестный тип';
        }
    };

    useEffect(() => {
        const fetchDrink = async () => {
            try {
                const data = await getDrink(drinkId);
                setDrink(data);
            } catch (error) {
                console.error("Ошибка при загрузке данных о напитке:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDrink();
    }, [drinkId]);

    const handleLike = async () => {
        try {
            await sendLike(drinkId, "DRINK");
            setLiked(true);
            Alert.alert('Избранное', 'Вы добавили напиток в любимые');
        } catch (error) {
            console.error('Ошибка при отправке лайка:', error);
            Alert.alert('Ошибка', 'Не удалось поставить лайк. Попробуйте снова.');
        }
    };

    const handleReviewSubmit = async () => {
        if (!reviewText.trim() || !reviewScore) {
            Alert.alert('Ошибка', 'Введите текст отзыва и укажите рейтинг.');
            return;
        }

        setSubmitting(true);

        try {
            await sendDrinkReview(drinkId, reviewText, parseInt(reviewScore));
            Alert.alert('Успех', 'Ваш отзыв был успешно отправлен.');
            setReviewText('');
            setReviewScore('');
            setShowReviewInput(false);

            const updatedData = await getDrink(drinkId);
            setDrink(updatedData);
        } catch (error) {
            console.error('Ошибка при отправке отзыва:', error);
            Alert.alert('Ошибка', 'Не удалось отправить отзыв. Попробуйте снова.');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="#000" />
                <Text>Загрузка...</Text>
            </View>
        );
    }

    if (!drink) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>Не удалось загрузить информацию о напитке.</Text>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Text style={styles.backButtonText}>Вернуться назад</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={24} color="#FFF" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.likeButton} onPress={handleLike} disabled={liked}>
                <Ionicons
                    name={liked ? 'heart' : 'heart-outline'}
                    size={28}
                    color={liked ? '#FF0000' : '#FFA729'}
                />
            </TouchableOpacity>

            <ScrollView>
                <View style={styles.info}>
                    <Text style={styles.title}>{drink.name}</Text>
                    <Text style={styles.subtitle}>{getDrinkType(drink.type)}</Text>
                    <Text style={styles.subtitle}>{drink.temperature === "HOT" ? "Горячий напиток" : "Холодный напиток"}</Text>
                    <Text style={styles.subtitle}>
                        Рейтинг: {drink.scoreCount ? (drink.scoreSum / drink.scoreCount).toFixed(1) : 'Не указан'}
                    </Text>
                </View>

                <TouchableOpacity
                    onPress={() => navigation.navigate("CoffeeShopDetail", { cafeId: drink.coffeeShopId })}
                    style={styles.button}>
                    <Text>Кофейня: {drink.coffeeShop}</Text>
                </TouchableOpacity>

                <Text style={styles.sectionTitle}>Состав</Text>
                <View style={styles.ingredients}>
                    <Text style={styles.ingredientText}>{drink.composition}</Text>
                </View>

                <Text style={styles.sectionTitle}>Отзывы   {drink.scoreCount}</Text>
                {drink.reviews.length > 0 ? (
                    <FlatList
                        data={drink.reviews}
                        renderItem={({ item }) => <ReviewCard date={item.createdAt}
                                                              reviewText={item.review}
                                                              score={item.score} />}
                        keyExtractor={(item) => item.id.toString()}
                        scrollEnabled={false}
                    />
                ) : (
                    <Text style={styles.noReviewsText}>Пока нет отзывов на этот напиток.</Text>
                )}
            </ScrollView>

            {!showReviewInput && (
                <TouchableOpacity
                    style={styles.addReviewButton}
                    onPress={() => setShowReviewInput(true)}
                >
                    <Text style={styles.addReviewButtonText}>Добавить отзыв</Text>
                </TouchableOpacity>
            )}

            {showReviewInput && (
                <View style={styles.reviewInputContainer}>
                    <TextInput
                        style={styles.reviewInput}
                        placeholder="Напишите ваш отзыв"
                        multiline
                        value={reviewText}
                        onChangeText={setReviewText}
                    />
                    <Picker
                        selectedValue={reviewScore}
                        onValueChange={(itemValue) => setReviewScore(itemValue)}
                        style={styles.reviewScorePicker}
                    >
                        <Picker.Item label="Выберите рейтинг" value="" />
                        <Picker.Item label="1" value="1" />
                        <Picker.Item label="2" value="2" />
                        <Picker.Item label="3" value="3" />
                        <Picker.Item label="4" value="4" />
                        <Picker.Item label="5" value="5" />
                    </Picker>
                    <TouchableOpacity
                        style={styles.submitButton}
                        onPress={handleReviewSubmit}
                        disabled={submitting}
                    >
                        <Text style={styles.submitButtonText}>{submitting ? 'Отправка...' : 'Отправить'}</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
};

export default DrinkScreen;
