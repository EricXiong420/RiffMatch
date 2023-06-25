import { StyleSheet, View, Text } from 'react-native';

export default function Divider() {
    return (
        <View style={{
            width: '75%',
            borderBottomColor: '#242424',
            borderBottomWidth: StyleSheet.hairlineWidth,
            alignSelf: 'center'
        }}></View>
    )
}