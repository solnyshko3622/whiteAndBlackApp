import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    card: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        marginBottom: 15,
        borderRadius: 15,
        overflow: 'hidden',
        elevation: 5,
        minHeight: 100,
    },
    image: { width: 100, height: 100 },
    info: { flex: 1, padding: 10, justifyContent: 'center' },
    name: { fontSize: 16, fontWeight: 'bold', color: '#333' },
    price: { fontSize: 14, color: '#2c6e49', marginTop: 5 },
    scoreContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
    },
    score: { fontSize: 16, color: '#f39c12', fontWeight: 'bold', marginRight: 5 },
    starIcon: { width: 16, height: 16 },
});
