import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import styles from "./styles/coffeeCard_styles"


export default function CoffeeShopCard({ coffeeShop, onPress }) {
    return (
        <TouchableOpacity style={styles.card} onPress={onPress}>
            <View style={styles.info}>
                <Text style={styles.name}>{coffeeShop.name}</Text>
                <Text style={styles.price}>{coffeeShop.address}</Text>
                <View style={styles.scoreContainer}>
                    <Text style={styles.score}>{coffeeShop.score}</Text>
                    <Image
                        source={require('../../assets/images/star.png')}
                        style={styles.starIcon}
                    />
                </View>
            </View>
        </TouchableOpacity>
    );
}
