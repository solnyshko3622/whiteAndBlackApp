import React from "react";
import { TouchableOpacity, Text, StyleSheet, GestureResponderEvent } from "react-native";

interface BlackButtonProps {
    title: string; // Текст кнопки
    onPress: (event: GestureResponderEvent) => void; // Обработчик нажатия
    style?: object;
}

const BlackButton: React.FC<BlackButtonProps> = ({ title, onPress }) => {
    return (
        <TouchableOpacity style={[styles.button]} onPress={onPress}>
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        width: 337,
        paddingVertical: 13,
        paddingHorizontal: 20,
        borderRadius: 20,
        borderColor: "#885053",
        borderWidth: 3,
        alignItems: "center",
        marginTop: 20,
        height: 54,
        marginHorizontal: "auto",
    },
    text: {
        color: "#FFA729",
        fontSize: 20,
        lineHeight: 25,
        fontWeight: "bold",
    },
});

export default BlackButton;
