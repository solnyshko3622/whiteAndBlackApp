import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "#FFF4E2",
    },
    button: {
        marginVertical: 10,
        width: "80%",
    },
    circle: {
        position: "absolute",
    },
    circleGreen: {
        backgroundColor: "#885053",
        borderRadius: 100, // Радиус для создания круга
    },
    circleOrange: {
        backgroundColor: "#FFA729",
        width: 100,
        height: 100,
        borderRadius: 100,
    },
    text: {
        marginLeft: 20,
        fontSize: 30,
        fontWeight: "bold",
        color: "#FFA729",
    },
});

export default styles;
