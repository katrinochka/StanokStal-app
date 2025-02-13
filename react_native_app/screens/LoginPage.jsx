// import React, { useState, useCallback } from 'react';
// import { View, Text, TextInput, Button, StyleSheet, Alert, ActivityIndicator } from 'react-native'; // Добавляем ActivityIndicator
// import axios from 'axios';
// import { useDispatch } from 'react-redux';  // Импортируем useDispatch
// import { loginSuccess, loginFailure } from '../components/stores/authActions';  // Импортируем actions

// const LoginPage = ({ navigation }) => {
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const [isLoading, setIsLoading] = useState(false);

//     const dispatch = useDispatch();  // Получаем dispatch

//     const fetchLogins = useCallback(async () => {
//         setIsLoading(true);
//         try {
//             const data = {
//                 username: username,
//                 password: password,
//             };
//             const response = await axios.post(`http://${process.env.EXPO_PUBLIC_IP_ADDRESS}:8000/api/users/login/`, data);

//             if (response.status === 200) {
//                 // Диспетчеризуем действие успешного входа
//                 dispatch(loginSuccess());
//                 // Переходим на Home
//                 navigation.navigate('Home');
//             } else {
//                 // Диспетчеризуем действие ошибки входа
//                 dispatch(loginFailure(response.data?.detail || 'Неверный логин или пароль.')); // Use the error message from the API if available
//                 Alert.alert('Ошибка', response.data?.detail || 'Неверный логин или пароль.');
//             }
//         } catch (error) {
//             console.error("Login error:", error);
//             // Диспетчеризуем действие ошибки входа
//             dispatch(loginFailure(error.response?.data?.detail || "Произошла ошибка при входе."));  // Обрабатываем ошибки сети и другие ошибки
//             Alert.alert('Ошибка', error.response?.data?.detail || 'Произошла ошибка при входе.');  // Улучшенное отображение ошибок
//         } finally {
//             setIsLoading(false);
//         }
//     }, [username, password, navigation, dispatch]); // Добавляем dispatch в зависимости

//     const handleSubmit = () => {
//         if (username.trim() === '' || password.trim() === '') {
//             Alert.alert('Ошибка', 'Пожалуйста, заполните все поля.');
//             return;
//         }
//         fetchLogins();
//     };

//     return (
//         <View style={styles.container}>
//             <Text style={styles.title}>Форма входа</Text>
//             <TextInput
//                 style={styles.input}
//                 placeholder="Логин"
//                 value={username}
//                 onChangeText={setUsername}
//                 autoCapitalize="none"
//             />
//             <TextInput
//                 style={styles.input}
//                 placeholder="Пароль"
//                 secureTextEntry={true}
//                 value={password}
//                 onChangeText={setPassword}
//             />
//             <Button
//                 title={isLoading ? "Вход..." : "Войти"}  // Меняем текст кнопки в зависимости от isLoading
//                 onPress={handleSubmit}
//                 disabled={isLoading}  // Блокируем кнопку, пока идет загрузка
//             />
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         padding: 20,
//         backgroundColor: '#f0f0f0',
//     },
//     title: {
//         fontSize: 24,
//         fontWeight: 'bold',
//         marginBottom: 20,
//         textAlign: 'center',
//     },
//     input: {
//         height: 40,
//         borderColor: 'gray',
//         borderWidth: 1,
//         marginBottom: 10,
//         paddingLeft: 10,
//         backgroundColor: '#fff',
//     },
// });

// export default LoginPage;


import React, { useState, useCallback } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from "axios";

const LoginPage = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);  // Добавляем состояние для индикатора загрузки

    const fetchLogins = useCallback(async () => {
        setIsLoading(true); // Устанавливаем isLoading в true перед запросом
        try {
            const data = {
                username: username,
                password: password,
            };
            const response = await axios.post(`http://${process.env.EXPO_PUBLIC_IP_ADDRESS}:8000/api/users/login/`, data);
             // Обработайте успешный вход
            if (response.status === 200) {
                navigation.navigate('Home');
            } else {
                 //  Обработайте другие коды состояния
                 Alert.alert('Ошибка', 'Неверный логин или пароль.');
            }
        } catch (error) {
            console.error("Login error:", error);
            Alert.alert('Ошибка', 'Неверный логин или пароль.');
        } finally {
            setIsLoading(false);  // Устанавливаем isLoading в false после запроса
        }
    }, [username, password, navigation]);

    const handleSubmit = () => {
        fetchLogins();  // Вызываем fetchLogins при отправке формы
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Форма входа</Text>
            <TextInput
                style={styles.input}
                placeholder="Логин"
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="Пароль"
                secureTextEntry={true}
                value={password}
                onChangeText={setPassword}
            />
            <Button
                title={isLoading ? "Вход..." : "Войти"}  // Меняем текст кнопки в зависимости от isLoading
                onPress={handleSubmit}
                disabled={isLoading}  // Блокируем кнопку, пока идет загрузка
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#f0f0f0',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingLeft: 10,
        backgroundColor: '#fff',
    },
});

export default LoginPage;