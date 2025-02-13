// import { useFonts } from 'expo-font';
// import * as SplashScreen from 'expo-splash-screen';
// import { useEffect } from 'react';
// import 'react-native-reanimated';
// import { createStackNavigator } from '@react-navigation/stack';

// import HomeScreen from "@/screens/HomeScreen";
// import FullPostScreen from "@/screens/FullPostScreen";
// import LoginPage from "@/screens/LoginPage";
// import { Provider } from 'react-redux';
// // import { store } from '../../components/stores/store'; // Исправленный путь

// // Prevent the splash screen from auto-hiding before asset loading is complete.
// SplashScreen.preventAutoHideAsync();

// export default function RootLayout() {

//   // const [loaded] = useFonts({
//   //   SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
//   // });

//   // useEffect(() => {
//   //   if (loaded) {
//   //     SplashScreen.hideAsync();
//   //   }
//   // }, [loaded]);

//   // if (!loaded) {
//   //   return null;
//   // }

//   const Stack = createStackNavigator();

//   return (
//     <Provider>
//         <Stack.Navigator>
//           <Stack.Screen name="Home" component={HomeScreen} options={{title: "Программы"}} />
//           <Stack.Screen name="FullPost" component={FullPostScreen} options={{title: "Программа"}}/>
//           <Stack.Screen name="Login" component={LoginPage} options={{title: "Войти"}}/>
//         </Stack.Navigator>
//     </Provider>
//   );
// }

import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from "@/screens/HomeScreen";
import FullPostScreen from "@/screens/FullPostScreen";
import LoginPage from "@/screens/LoginPage";
import ManufacturesPage from "@/screens/ManufacturesScreen";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {

  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  const Stack = createStackNavigator();

  return (
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{title: "Программы"}} />
        <Stack.Screen name="FullPost" component={FullPostScreen} options={{title: "Программа"}}/>
        <Stack.Screen name="Login" component={LoginPage} options={{title: "Войти"}}/>
        {/* <Stack.Screen name="Details" component={ManufacturesPage} options={{title: "Детали"}}/> */}
      </Stack.Navigator>
  );
}
