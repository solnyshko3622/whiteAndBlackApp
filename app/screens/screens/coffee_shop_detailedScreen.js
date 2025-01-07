import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ScrollView, TouchableOpacity, ActivityIndicator, Alert, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getCafe } from '../../api/coffeeShopDetail_api';
import { sendLike } from '../../api/like_api';
import { Picker } from "@react-native-picker/picker";
import { sendCoffeeShopReview } from "../../api/reviewCoffeeShopSend_api";
import styles from '../styles/coffee_shop_detailedScreen_styles';
import ReviewCard from '../../components/reviewCard_component';

const CoffeeShopDetail = ({ route, navigation }) => {
    const { cafeId } = route.params;
    const [cafeData, setCafeData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [liked, setLiked] = useState(false);
    const [reviewText, setReviewText] = useState('');
    const [reviewScore, setReviewScore] = useState('');
    const [showReviewInput, setShowReviewInput] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        const fetchCafeData = async () => {
            try {
                const data = await getCafe(cafeId);
                setCafeData(data);
                console.log(data)
            } catch (err) {
                setError(err.message || 'Ошибка загрузки данных');
            } finally {
                setLoading(false);
            }
        };

        fetchCafeData();
    }, [cafeId]);

    const handleLike = async () => {
        try {
            await sendLike(cafeId, "COFFEE_SHOP");
            setLiked(true);
            Alert.alert('Избранное', 'Вы добавили эту кофейню в избранное');
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
            await sendCoffeeShopReview(cafeId, reviewText, parseInt(reviewScore));
            Alert.alert('Успех', 'Ваш отзыв был успешно отправлен.');
            setReviewText('');
            setReviewScore('');
            setShowReviewInput(false);

            const updatedData = await getCafe(cafeId);
            setCafeData(updatedData);
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
                <ActivityIndicator size="large" color="#FFA729" />
                <Text style={styles.loaderText}>Загрузка...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>Ошибка: {error}</Text>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.errorButton}>
                    <Text style={styles.errorButtonText}>Назад</Text>
                </TouchableOpacity>
            </View>
        );
    }
    const renderMenuItem = ({ item }) => {
        const rating = item.scoreCount ? (item.scoreSum / item.scoreCount).toFixed(1) : 'Нет оценок';

        return (
            <TouchableOpacity
                style={styles.card}
                onPress={() => navigation.navigate('DrinkScreen', { drinkId: item.id })}
            >
                <Text style={styles.cardTitle}>{item.name}</Text>
                <Text style={styles.cardPrice}>Рейтинг: {rating}</Text>
            </TouchableOpacity>
        );
    };

    const averageScore = cafeData.scoreCount ? (cafeData.scoreSum / cafeData.scoreCount).toFixed(1) : 'Не указан';

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

            <FlatList
                ListHeaderComponent={
                    <>
                        <View style={styles.info}>
                            <Text style={styles.title}>{cafeData.name}</Text>
                            <Text style={styles.description}>{cafeData.description || 'Описание не доступно'}</Text>
                            <Text style={styles.address}>Адрес: {cafeData.address || 'Не указан'}</Text>
                            <Text style={styles.rating}>Рейтинг: {averageScore} / 5</Text>
                        </View>
                        <Text style={styles.sectionTitle}>Меню</Text>
                        <FlatList
                            data={cafeData.drinks || []}
                            renderItem={renderMenuItem}
                            keyExtractor={(item) => item.id.toString()}
                            horizontal
                            style={styles.cards}
                            showsHorizontalScrollIndicator={false}
                        />
                        <Text style={styles.sectionTitle}>Отзывы</Text>
                    </>
                }
                data={cafeData.reviews}
                renderItem={({ item }) => (
                    <ReviewCard
                        date={item.createdAt}
                        reviewText={item.review}
                        score={item.score}
                    />
                )}
                keyExtractor={(item) => item.id.toString()}
                ListEmptyComponent={<Text style={styles.noReviewsText}>Пока нет отзывов на эту кофейню.</Text>}
            />

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
}

export default CoffeeShopDetail;
