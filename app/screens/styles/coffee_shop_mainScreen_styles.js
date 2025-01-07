import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FFF4E2', padding: 20 },
    headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    },
    header: {
        fontSize: 40,
        fontWeight: 'bold',
        color: '#FFA729',
    },
    filterButton: {
        backgroundColor: '#FFA729',
        padding: 10,
        borderRadius: 5,
    },
    filterButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    searchBar: {
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 10,
        marginBottom: 20,
        fontSize: 16,
        elevation: 3,
    },
    filtersContainer: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        marginBottom: 20,
        elevation: 3,
    },
    filter: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    filterLabel: {
        fontSize: 14,
    },
    scrollView: {
        showsVerticalScrollIndicator: false,
    },
});
