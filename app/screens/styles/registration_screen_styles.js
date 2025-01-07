import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFF4E2',
        flex: 1,
        justifyContent: 'center',
        // alignItems: 'center',
        padding: 20,
    },
    title: {
        marginLeft: 20,
        fontSize: 30,
        fontWeight: "bold",
        color: "#FFA729",
        textAlign: "center",
        marginBottom: 60,
    },
    input: {
        borderBottomWidth: 3,
        borderColor: '#885053',
        marginBottom: 10,
        padding: 8,
        paddingHorizontal: 20,
        marginLeft: 20,
        marginRight: 20,
    },
    error: {
        color: 'red',
        marginBottom: 10,
    },
});

export default styles;
