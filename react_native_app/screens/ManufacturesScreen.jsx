// import React, { useEffect, useState } from "react";
// import { View, Text, Button, TextInput, ScrollView, Alert } from "react-native";
// import { useAppDispatch, useAppSelector } from "store/store.ts";
// import { fetchManufactures, updateFilters } from "store/slices/manufacturesSlice.ts";
// import CustomDropdown from "components/CustomDropdown/CustomDropdown.tsx";
// import { T_ManufacturesFilters } from "modules/types.ts";
// import ManufacturesTable from "components/ManufacturesTable/ManufacturesTable.tsx";
// import { useNavigation } from "@react-navigation/native";

// const ManufacturesPage = () => {
//     const dispatch = useAppDispatch();
//     const navigation = useNavigation();

//     const manufactures = useAppSelector((state) => state.manufactures.manufactures);
//     const filters = useAppSelector<T_ManufacturesFilters>((state) => state.manufactures.filters);
//     const { is_authenticated } = useAppSelector((state) => state.user);

//     const [status, setStatus] = useState(filters.status);
//     const [dateFormationStart, setDateFormationStart] = useState(filters.date_formation_start);
//     const [dateFormationEnd, setDateFormationEnd] = useState(filters.date_formation_end);

//     const statusOptions = {
//         0: "Любой",
//         2: "В работе",
//         3: "Завершен",
//         4: "Отклонен",
//     };

//     useEffect(() => {
//         if (!is_authenticated) {
//             navigation.navigate("Home");  // Замените "Home" на ваше название экрана входа
//         }
//     }, [is_authenticated]);

//     useEffect(() => {
//         dispatch(fetchManufactures());
//     }, [filters]);

//     const applyFilters = async () => {
//         const filters: T_ManufacturesFilters = {
//             status: status,
//             date_formation_start: dateFormationStart,
//             date_formation_end: dateFormationEnd,
//         };

//         await dispatch(updateFilters(filters));
//     };

//     return (
//         <ScrollView>
//             <View style={{ padding: 16 }}>
//                 <Text>От</Text>
//                 <TextInput
//                     style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 16 }}
//                     value={dateFormationStart}
//                     onChangeText={setDateFormationStart}
//                     placeholder="YYYY-MM-DD"
//                 />

//                 <Text>До</Text>
//                 <TextInput
//                     style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 16 }}
//                     value={dateFormationEnd}
//                     onChangeText={setDateFormationEnd}
//                     placeholder="YYYY-MM-DD"
//                 />

//                 <CustomDropdown label="Статус" selectedItem={status} setSelectedItem={setStatus} options={statusOptions} />

//                 <Button title="Применить" onPress={applyFilters} />

//                 {manufactures.length ? (
//                     <ManufacturesTable manufactures={manufactures} />
//                 ) : (
//                     <Text style={{ textAlign: 'center', marginTop: 20 }}>Детали не найдены</Text>
//                 )}
//             </View>
//         </ScrollView>
//     );
// };

// export default ManufacturesPage;


// import React, { useEffect, useState } from "react";
// import { View, Text, Button, TextInput, ScrollView, Alert } from "react-native";
// import { T_ManufacturesFilters } from "./manufacturesSlice.ts";

// // import { fetchManufactures, updateFilters } from "./manufacturesSlice.ts";
// import CustomDropdown from "./CustomDropdown.tsx";
// import ManufacturesTable from "./ManufacturesTable.tsx";
// // import { useNavigation } from "@react-navigation/native";

// const ManufacturesPage = ({ navigation }) => {
//     // const dispatch = useAppDispatch();
//     // const navigation = useNavigation();
//     // const manufactures = useAppSelector((state) => state.manufactures.manufactures);
//     // const filters = useAppSelector<T_ManufacturesFilters>((state) => state.manufactures.filters);
//     // const { is_authenticated } = useAppSelector((state) => state.user);

//     const [status, setStatus] = useState(filters.status);
//     const [dateFormationStart, setDateFormationStart] = useState(filters.date_formation_start);
//     const [dateFormationEnd, setDateFormationEnd] = useState(filters.date_formation_end);

//     const statusOptions = {
//         0: "Любой",
//         2: "В работе",
//         3: "Завершен",
//         4: "Отклонен",
//     };

//     // useEffect(() => {
//     //     navigation.navigate("Home");
//     // },[];

//     const fetchManufactures = useCallback(() => {
//             setIsLoading(true);
//             axios
//                 .get(`http://${process.env.EXPO_PUBLIC_IP_ADDRESS}:8000/api/manufactures/`)
//                 .catch((err) => {
//                     alert(err);
//                 })
//                 .finally(() => {
//                     setIsLoading(false);
//                 });
//         }, []);

//     useEffect(() => {
//         fetchManufactures();
//     }, [fetchManufactures]);

//     const applyFilters = async () => {
//         const filters: T_ManufacturesFilters = {
//             status: status,
//             date_formation_start: dateFormationStart,
//             date_formation_end: dateFormationEnd,
//         };

//         await dispatch(updateFilters(filters));
//     };

//     return (
//         <ScrollView>
//             <View style={{ padding: 16 }}>
//                 <Text>От</Text>
//                 <TextInput
//                     style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 16 }}
//                     value={dateFormationStart}
//                     onChangeText={setDateFormationStart}
//                     placeholder="YYYY-MM-DD"
//                 />

//                 <Text>До</Text>
//                 <TextInput
//                     style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 16 }}
//                     value={dateFormationEnd}
//                     onChangeText={setDateFormationEnd}
//                     placeholder="YYYY-MM-DD"
//                 />

//                 <CustomDropdown label="Статус" selectedItem={status} setSelectedItem={setStatus} options={statusOptions} />

//                 <Button title="Применить" onPress={applyFilters} />

//                 {manufactures.length ? (
//                     <ManufacturesTable manufactures={manufactures} />
//                 ) : (
//                     <Text style={{ textAlign: 'center', marginTop: 20 }}>Детали не найдены</Text>
//                 )}
//             </View>
//         </ScrollView>
//     );
// };

// export default ManufacturesPage;