import { Pressable, Image, StyleSheet } from "react-native";
import { useAuth } from "../../contexts/AuthContext";

const GoogleButton = () => {
  const { onGoogleButtonPress } = useAuth();
  
  return (
    <Pressable style={styles.socialButtons} onPress={() => onGoogleButtonPress().then(() => console.log('Signed in with Google!'))}>
        <Image style={styles.googleSignin} source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/1200px-Google_%22G%22_Logo.svg.png' }}></Image>
    </Pressable>
  );
};

export default GoogleButton

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
    googleSignin: {
        width: 30,
        height: 30,
    }
})