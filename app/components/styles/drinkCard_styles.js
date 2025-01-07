import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        marginBottom: 15,
        flexDirection: 'row',
        elevation: 3,
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 10,
        marginRight: 10,
    },
    info: {
        justifyContent: 'center',
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    type: {
        fontSize: 14,
        color: '#666',
    },
    scoreContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
    },
    score: {
        fontSize: 16,
        color: '#f39c12',
        fontWeight: 'bold',
        marginRight: 5
    },
    starIcon: {
        width: 16,
        height: 16
    },
});

export default styles;
