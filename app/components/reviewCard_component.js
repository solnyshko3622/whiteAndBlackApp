import React from 'react';
import { View, Text } from 'react-native';
import styles from './styles/review_styles';

const ReviewCard = ({ date, reviewText, score }) => {
    return (
        <View style={styles.review}>
            <Text style={styles.reviewDate}>{new Date(date).toLocaleDateString()}</Text>
            <Text style={styles.reviewText}>{reviewText}</Text>
            <Text style={styles.reviewScore}>Рейтинг: {score || 'Не указан'}/5</Text>
        </View>
    );
};

export default ReviewCard;
