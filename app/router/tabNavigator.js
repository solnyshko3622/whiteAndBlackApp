import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CoffeeShopScreen from '../screens/screens/coffee_shop_mainScreen';
import DrinksScreen from '../screens/screens/drinks_mainScreen';
import SettingsScreen from "../screens/screens/settings_screen";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    if (route.name === 'CoffeeShop') {
                        iconName = focused ? 'cafe' : 'cafe-outline';
                    } else if (route.name === 'Drinks') {
                        iconName = focused ? 'beer' : 'beer-outline';
                    } else if (route.name === 'SettingsScreen') {
                        iconName = focused ? 'person' : 'person-outline';
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'gray',
                headerShown: false,
            })}
        >
            <Tab.Screen name="CoffeeShop" component={CoffeeShopScreen} options={{ title: 'Кофейни' }} />
            <Tab.Screen name="Drinks" component={DrinksScreen} options={{ title: 'Напитки' }} />
            <Tab.Screen name="SettingsScreen" component={SettingsScreen} options={{ title: 'Профиль' }} />
        </Tab.Navigator>
    );
};

export default TabNavigator;
