import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './HomeScreen';
import LoginPage from './LoginPage';
import FullPostScreen from './FullPostScreen';
import ManufacturePage from './ManufacturesScreen';

const Stack = createStackNavigator();

export const Navigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen
                    name="Home"
                    component={(props) => <HomeScreen {...props} />}
                    options={{ title: "Программы" }}
                />
                <Stack.Screen
                    name="Login"
                    component={(props) => <LoginPage {...props} />}
                    options={{ title: "Войти" }}
                />
                <Stack.Screen
                    name="FullPost"
                    component={FullPostScreen}
                    options={{ title: "Программа" }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};