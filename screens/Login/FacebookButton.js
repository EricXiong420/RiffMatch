import { Pressable, Image, StyleSheet } from "react-native";
import { useAuth } from "../../contexts/AuthContext.js";

const FacebookButton = () => {
    const { onFacebookButtonPress } = useAuth();

    return (
    <Pressable 
        style={({pressed}) => [{
            opacity: pressed ? 0.3 : 1
        }, styles.socialButtons]} 
        onPress={() => onFacebookButtonPress().then(() => console.log('Signed in with Facebook!'))}>
        <Image style={styles.facebookSignin} source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1200px-Facebook_Logo_%282019%29.png' }}></Image>
    </Pressable>
    );
}

export default FacebookButton

const styles = StyleSheet.create({
    socialButtons: {
        marginTop: 20,
        marginLeft: 20,
        marginRight: 20,
        padding: 10,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 10,
        width: 52,
        display: 'flex',
        flexDirection: 'row',
        alignSelf: 'center'
    },
    facebookSignin: {
        width: 30,
        height: 30,
    }
})