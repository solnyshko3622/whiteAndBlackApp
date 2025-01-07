import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    review: {
        backgroundColor: '#ffffff',
        borderRadius: 8,
        padding: 16,
        marginVertical: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    reviewDate: {
        fontSize: 12,
        color: '#888',
        marginBottom: 8,
    },
    reviewText: {
        fontSize: 14,
        color: '#555',
        marginVertical: 8,
    },
    reviewScore: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#FFA729',
    },
});

export default styles;
