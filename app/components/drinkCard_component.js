import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from './styles/drinkCard_styles';

export default function DrinkCard({ drink, onPress }) {
    return (
        <TouchableOpacity style={styles.card} onPress={onPress}>
            <Image source={{ uri: drink.image }} style={styles.image} />
            <View style={styles.info}>
                <Text style={styles.name}>{drink.name}</Text>
                <View style={styles.scoreContainer}>
                    <Text style={styles.score}>{drink.score}</Text>
                    <Image
                        source={require('../../assets/images/star.png')}
                        style={styles.starIcon}
                    />
                </View>
            </View>
        </TouchableOpacity>
    );
}
