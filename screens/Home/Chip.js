import { StyleSheet, Text, Pressable } from "react-native";

export default function Chip({ text, onPress }) {
    return (
        <Pressable styles={styles.container}>
            <Text style={styles.text}>{text}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'black'
    },
    text: {
        fontSize: 30
    }
});