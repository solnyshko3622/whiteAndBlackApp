import React from "react";
import Router from "../app/router/router";
import { AuthProvider } from "./api/data";
import 'react-native-gesture-handler';

export default function Index() {
    return (
        <AuthProvider>
                <Router />
        </AuthProvider>
    );
}
