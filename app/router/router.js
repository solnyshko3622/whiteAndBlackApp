import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import RegisterScreen from "../screens/screens/registration_screen";
import LoginScreen from "../screens/screens/login_screen";
import TabNavigator from "../router/tabNavigator";
import OnboardingScreen from "../screens/screens/onboarding_screen";
import CoffeeShopDetail from "../screens/screens/coffee_shop_detailedScreen";
import DrinkScreen from "../screens/screens/drink_detailedScreen";
import FavouriteDrinks_screen from "../screens/screens/favourityDrinks_screen";
import FavoriteCoffeeShopsScreen from "../screens/screens/FavouriteCoffeeShops";
import CoffeeShopScreen from "../screens/screens/coffee_shop_mainScreen";
import DrinksScreen from "../screens/screens/drinks_mainScreen"; // Импортируем TabNavigator

const Stack = createStackNavigator();

const Router = () => {
    return (
        <Stack.Navigator initialRouteName="OnboardingScreen">
            <Stack.Screen
                name="OnboardingScreen"
                component={OnboardingScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="RegisterScreen"
                component={RegisterScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="LoginScreen"
                component={LoginScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="CoffeeShopDetail"
                component={CoffeeShopDetail}
                options={{ headerShown: false }}/>
            <Stack.Screen
                name="TabNavigator"
                component={TabNavigator}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="DrinkScreen"
                component={DrinkScreen}
                options={{ headerShown: false }}
                initialParams={{ cafeId: 1 }}/>
            <Stack.Screen
                name="FavouriteDrinks"
                component={FavouriteDrinks_screen}
                options={{ headerShown: false }}/>
            <Stack.Screen
                name="FavoriteCoffeeShopsScreen"
                component={FavoriteCoffeeShopsScreen}
                options={{ headerShown: false }}/>
        </Stack.Navigator>
    );
};

export default Router;
