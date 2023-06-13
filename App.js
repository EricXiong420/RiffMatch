import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer, Modal } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as eva from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components';
import Home from './screens/Home';
import Landing from './screens/Login/Landing';
import RegisterPortal from './screens/Login/RegisterPortal';
import LoginPortal from './screens/Login/LoginPortal';
import CreateProfileInstruments from './screens/Login/CreateProfileInstruments';
import CreateProfileBasic from './screens/Login/CreateProfileBasic';
import CreateProfileImage from './screens/Login/CreateProfileImage';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Landing" component={Landing} options={{headerShown: false}} />
          <Stack.Screen name="Home" component={Home} options={{headerShown: false}}/>
          <Stack.Screen name="LoginPortal" component={LoginPortal} options={{headerShown: false}}/>
          <Stack.Screen name="RegisterPortal" component={RegisterPortal} options={{headerShown: false}}/>
          <Stack.Screen name="CreateProfileBasic" component={CreateProfileBasic} options={{headerShown: false}}/>
          <Stack.Screen name="CreateProfileInstruments" component={CreateProfileInstruments} options={{headerShown: false}}/>
          <Stack.Screen name="CreateProfileImage" component={CreateProfileImage} options={{headerShown: false}}/>
        </Stack.Navigator>
      </NavigationContainer>
    </ApplicationProvider>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
