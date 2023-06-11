import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as eva from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components';
import Home from './screens/Home';
import Login from './screens/Login/Login';
import Landing from './screens/Login/Landing';
import RegisterPortal from './screens/Login/RegisterPortal';
import LoginPortal from './screens/Login/LoginPortal';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Landing" component={Landing} options={{headerShown: false}} />
          <Stack.Screen name="Login" component={Login} options={{headerBackVisible: true}} />
          <Stack.Screen name="Home" component={Home} options={{headerBackVisible: false}}/>
          <Stack.Screen name="LoginPortal" component={LoginPortal} options={{headerBackVisible: true}}/>
          <Stack.Screen name="RegisterPortal" component={RegisterPortal} />
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
