import React from "react";
import { SafeAreaView, Text, View } from "react-native";
import BlackButton from "../../components/button_component";
import styles from "../styles/onboarding_screen_style"; // Импортируем стили

const OnboardingScreen = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <View
                style={[
                    styles.circle,
                    styles.circleGreen,
                    { width: 200, height: 200, top: -50, left: -50 },
                ]}
            />
            <View
                style={[
                    styles.circle,
                    styles.circleOrange,
                    { width: 100, height: 100, top: 80, right: 50 },
                ]}
            />
            <View
                style={[
                    styles.circle,
                    styles.circleGreen,
                    { width: 100, height: 100, bottom: 50, left: 30 },
                ]}
            />
            <View
                style={[
                    styles.circle,
                    styles.circleOrange,
                    { width: 200, height: 200, bottom: -50, right: -50 },
                ]}
            />
            <Text style={styles.text}>Войти</Text>
            <Text style={styles.text}>или</Text>
            <Text style={styles.text}>зарегистрироваться</Text>
            <BlackButton
                title="Вход"
                onPress={() => navigation.navigate("LoginScreen")}
                style={styles.button}
            />
            <BlackButton
                title="Регистрация"
                onPress={() => navigation.navigate("RegisterScreen")}
                style={styles.button}
            />
        </SafeAreaView>
    );
};

export default OnboardingScreen;
