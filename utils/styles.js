import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        margin: 20,
        padding: 10,
        width: 200,
        borderRadius: 5,
    },
    input: {
        height: 40, width: 200, borderColor: 'gray', borderWidth: 1
    },
    messageView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    messageText: {
        fontSize: 20,
    },
    emphasis: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 5
    }
});

export default styles;




