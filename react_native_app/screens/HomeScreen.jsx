import { FlatList, RefreshControl, TouchableOpacity, View, Text } from 'react-native';
import Post from "../components/Post";
import React, { useEffect, useState, useCallback } from "react";
import SearchBar from "../components/SearchBar";
import styled from 'styled-components/native';
import axios from "axios";

const HomeScreen = ({ navigation }) => {

    const [isLoading, setIsLoading] = useState(true)
    const [items, setItems] = useState([])
    const [programm_name, setProgrammName] = useState("")
    const [clicked, setClicked] = useState(false)

    const fetchPosts = useCallback(() => {
        setIsLoading(true);
        axios
            .get(`http://${process.env.EXPO_PUBLIC_IP_ADDRESS}:8000/api/programms?programm_name=${programm_name}`)
            .then(({ data }) => {
                setItems(data["programms"]);
            })
            .catch((err) => {
                alert(err);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [programm_name]);

    useEffect(() => {
        fetchPosts();
    }, [fetchPosts]);

    const handleLoginPress = useCallback(() => {
        navigation.navigate("Login", {});
    }, [navigation]);

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity
                    style={{ padding: 10, backgroundColor: 'lightblue', marginRight: 10, borderRadius: 5 }}
                    // onPress={handleLoginPress}
                    onPress={() => navigation.navigate("Login", {})}
                >
                    <Text>Войти</Text>
                </TouchableOpacity>
            ),
        });
    }, [navigation, handleLoginPress]);

    const renderItem = ({ item }) => (
        <View>
            <TouchableOpacity onPress={() => navigation.navigate("FullPost", { id: item.id, name: item.name })}>
                <Post navigation={navigation} id={item.id} name={item.name} item={item} />
            </TouchableOpacity>
        </View>
    );

    return (
        <PostsListContainer>
            <SearchBar searchPhrase={programm_name} setSearchPhrase={setProgrammName} clicked={clicked} setClicked={setClicked} />
            <FlatList
                refreshControl={<RefreshControl refreshing={isLoading} onRefresh={fetchPosts} />}
                data={items}
                renderItem={renderItem}
                keyExtractor={item => item.id ? item.id.toString() : Math.random().toString()}
            />
        </PostsListContainer>
    );
}

const PostsListContainer = styled.View`
  padding-bottom: 75px;
`;

export default HomeScreen;






// import { FlatList, RefreshControl, TouchableOpacity, View, Text } from 'react-native';
// import Post from "../components/Post";
// import React, { useEffect, useState, useCallback } from "react";
// import SearchBar from "../components/SearchBar";
// import styled from 'styled-components/native';
// import axios from "axios";
// import { useSelector, useDispatch } from 'react-redux'; // Import hooks
// import { logout } from './authActions';

// const HomeScreen = ({ navigation }) => {
//     const [isLoading, setIsLoading] = useState(true)
//     const [items, setItems] = useState([])
//     const [programm_name, setProgrammName] = useState("")
//     const [clicked, setClicked] = useState(false)

//     const isAuthenticated = useSelector((state) => state.user.isAuthenticated); // Get auth state
//     const dispatch = useDispatch();

//     const fetchPosts = useCallback(() => {
//         setIsLoading(true);
//         axios
//             .get(`http://${process.env.EXPO_PUBLIC_IP_ADDRESS}:8000/api/programms?programm_name=${programm_name}`)
//             .then(({ data }) => {
//                 setItems(data["programms"]);
//             })
//             .catch((err) => {
//                 alert(err);
//             })
//             .finally(() => {
//                 setIsLoading(false);
//             });
//     }, [programm_name]);

//     useEffect(() => {
//         fetchPosts();
//     }, [fetchPosts]);

//     const handleLoginPress = useCallback(() => {
//         navigation.navigate("Login", {});
//     }, [navigation]);

//     const handleLogoutPress = useCallback(() => {
//         dispatch(logout());
//     }, [navigation, dispatch]); // Add dispatch to dependencies

//     const handleDetailsPress = useCallback(() => {
//         navigation.navigate("Details");
//     }, [navigation]);

//     useEffect(() => {
//         navigation.setOptions({
//             headerRight: () => {
//                 if (!isAuthenticated) {
//                     return (
//                         <TouchableOpacity
//                             style={{ padding: 10, backgroundColor: 'lightblue', marginRight: 10, borderRadius: 5 }}
//                             onPress={handleLoginPress}
//                         >
//                             <Text>Войти</Text>
//                         </TouchableOpacity>
//                     );
//                 } else {
//                     return (
//                         <View style={{ flexDirection: 'row' }}>
//                             <TouchableOpacity
//                                 style={{ padding: 10, backgroundColor: 'lightgreen', marginRight: 10, borderRadius: 5 }}
//                                 onPress={handleDetailsPress}
//                             >
//                                 <Text>Детали</Text>
//                             </TouchableOpacity>
//                             <TouchableOpacity
//                                 style={{ padding: 10, backgroundColor: 'lightcoral', marginRight: 10, borderRadius: 5 }}
//                                 onPress={handleLogoutPress}
//                             >
//                                 <Text>Выйти</Text>
//                             </TouchableOpacity>
//                         </View>
//                     );
//                 }
//             },
//         });
//     }, [navigation, isAuthenticated, handleLoginPress, handleLogoutPress, handleDetailsPress]);

//     const renderItem = ({ item }) => (
//         <View>
//             <TouchableOpacity onPress={() => navigation.navigate("FullPost", { id: item.id, name: item.name })}>
//                 <Post navigation={navigation} id={item.id} name={item.name} item={item} />
//             </TouchableOpacity>
//         </View>
//     );

//     return (
//         <PostsListContainer>
//             <SearchBar searchPhrase={programm_name} setSearchPhrase={setProgrammName} clicked={clicked} setClicked={setClicked} />
//             <FlatList
//                 refreshControl={<RefreshControl refreshing={isLoading} onRefresh={fetchPosts} />}
//                 data={items}
//                 renderItem={renderItem}
//                 keyExtractor={item => item.id ? item.id.toString() : Math.random().toString()}
//             />
//         </PostsListContainer>
//     );
// }

// const PostsListContainer = styled.View`
//   padding-bottom: 75px;
// `;

// export default HomeScreen;

// import React, { useEffect, useState, useCallback } from 'react';
// import { FlatList, RefreshControl, TouchableOpacity, View, Text } from 'react-native';
// import Post from '../components/Post';
// import styled from 'styled-components/native';
// import axios from 'axios';
// import { useSelector, useDispatch } from 'react-redux';
// import { logout } from '../components/stores/authActions';
// import SearchBar from "../components/SearchBar";


// const HomeScreen = ({ navigation }) => {
//     const [isLoading, setIsLoading] = useState(true);
//     const [items, setItems] = useState([]);
//     const [programm_name, setProgrammName] = useState('');
//     const [clicked, setClicked] = useState(false);

//     const dispatch = useDispatch(); // Остается здесь

//     const fetchPosts = useCallback(() => {
//         setIsLoading(true);
//         axios
//             .get(`http://${process.env.EXPO_PUBLIC_IP_ADDRESS}:8000/api/programms?programm_name=${programm_name}`)
//             .then(({ data }) => {
//                 setItems(data.programms);
//             })
//             .catch((err) => {
//                 console.error("Error fetching posts:", err); // Log the error instead of using alert
//                 alert(err.message); // Show the error message, but log the full error
//             })
//             .finally(() => {
//                 setIsLoading(false);
//             });
//     }, [programm_name]);

//     useEffect(() => {
//         fetchPosts();
//     }, [fetchPosts]);

//     const handleLoginPress = useCallback(() => {
//         navigation.navigate('Login');
//     }, [navigation]);

//     // const handleLogoutPress = useCallback(() => {
//     //     dispatch(logout());
//     // }, [dispatch]);

//     const handleDetailsPress = useCallback(() => {
//         navigation.navigate('Details'); // Убедитесь, что у вас есть маршрут 'Details'
//     }, [navigation]);

//     useEffect(() => {
//         const isAuthenticated = useSelector((state) => state.user.isAuthenticated); // Остается здесь
//         navigation.setOptions({
//             headerRight: () => {
//                 if (!isAuthenticated) {
//                     return (
//                         <TouchableOpacity
//                             style={{ padding: 10, backgroundColor: 'lightblue', marginRight: 10, borderRadius: 5 }}
//                             onPress={handleLoginPress}
//                         >
//                             <Text>Войти</Text>
//                         </TouchableOpacity>
//                     );
//                 } else {
//                     return (
//                         <View style={{ flexDirection: 'row' }}>
//                             <TouchableOpacity
//                                 style={{ padding: 10, backgroundColor: 'lightgreen', marginRight: 10, borderRadius: 5 }}
//                                 onPress={handleDetailsPress}
//                             >
//                                 <Text>Детали</Text>
//                             </TouchableOpacity>
//                             <TouchableOpacity
//                                 style={{ padding: 10, backgroundColor: 'lightcoral', marginRight: 10, borderRadius: 5 }}
//                                 onPress={handleLogoutPress}
//                             >
//                                 <Text>Выйти</Text>
//                             </TouchableOpacity>
//                         </View>
//                     );
//                 }
//             },
//         });
//     }, [navigation, handleLoginPress, handleLogoutPress, handleDetailsPress]);

//     const renderItem = ({ item }) => (
//         <View>
//             <TouchableOpacity onPress={() => navigation.navigate('FullPost', { id: item.id, name: item.name })}>
//                 <Post navigation={navigation} id={item.id} name={item.name} item={item} />
//             </TouchableOpacity>
//         </View>
//     );

//     return (
//         <PostsListContainer>
//             <SearchBar searchPhrase={programm_name} setSearchPhrase={setProgrammName} clicked={clicked} setClicked={setClicked} />
//             <FlatList
//                 refreshControl={<RefreshControl refreshing={isLoading} onRefresh={fetchPosts} />}
//                 data={items}
//                 renderItem={renderItem}
//                 keyExtractor={(item) => item.id.toString()} // Убрал Math.random()
//             />
//         </PostsListContainer>
//     );
// };

// const PostsListContainer = styled.View`
//   padding-bottom: 75px;
// `;

// export default HomeScreen;