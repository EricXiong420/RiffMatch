import { StyleSheet, View, Pressable, Text, } from 'react-native'
import { useNavigation } from '@react-navigation/native';

const ChevronBackButton = ({backTo}) => {
    const navigation = useNavigation();

    return (
        <View>
            <Pressable onPress={() => navigation.navigate(backTo ? backTo : "Landing")} style={styles.backButton}>
                <Text style={styles.buttonBack}>‹</Text>
            </Pressable>
        </View>
    )
}

export default ChevronBackButton

const styles = StyleSheet.create({
    buttonBack: {
        fontSize: 40,
        marginTop: 40
    },
})