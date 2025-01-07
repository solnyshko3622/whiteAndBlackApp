import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF4E2',
        // paddingHorizontal: 16,
        // paddingTop: 16,
    },
    // header: {
    //     paddingHorizontal: 10,
    //     paddingVertical: 10,
    //     fontSize: 24,
    //     fontWeight: 'bold',
    //     color: '#333',
    //     textAlign: 'center',
    //     marginBottom: 16,
    //     backgroundColor: '#FFA729',
    // },
    card: {
        backgroundColor: '#F9F9F9',
        borderRadius: 8,
        padding: 16,
        marginBottom: 12,
        shadowColor: '#000',
        marginHorizontal: 16,
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    cardSubtitle: {
        fontSize: 14,
        color: '#555',
        marginTop: 4,
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        fontSize: 16,
        color: 'red',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        fontSize: 16,
        textAlign: 'center',
        color: '#555',
    },
    list: {
        paddingHorizontal: 16,
    },
    backButtonText: {
        color: '#FFF',
        fontSize: 16,
        marginLeft: 8,
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 16,
        paddingHorizontal: 16,
        backgroundColor: '#FFA729',
        marginBottom: 20,
    },
    backButton: {
        marginRight: 16,
        padding: 8,
        backgroundColor: '#FFA729',
        borderRadius: 50,
    },
    header: {
        fontSize: 20,
        color: '#FFF',
        fontWeight: 'bold',
    },
    addButton: {
        marginTop: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#FFA729',
        borderRadius: 8,
        alignItems: 'center',
    },
    addButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
