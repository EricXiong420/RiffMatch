import { View, StyleSheet, Text, Pressable } from "react-native";

export default function Chip({ text, onPress }) {
    return (
        <View style={styles.container}>
            <Pressable>
                <Text style={styles.text}>{text}</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 20,
        paddingHorizontal: 10,
        paddingTop: 2,
        paddingBottom: 3,
        backgroundColor: '#404040',
    },
    text: {
        fontSize: 15,
        color: 'white',
        textAlign: 'center'
    }
});