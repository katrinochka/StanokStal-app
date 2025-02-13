import React, {useEffect, useState} from 'react'
import styled from 'styled-components/native'
import {StyleSheet, View, ScrollView, Text, Image} from "react-native";
import {Loading} from "@/components/Loader";
import axios from "axios";

const PostImage = styled.Image`
  border-radius: 10px;
  width: 100%;
  height: 350px;
  margin-bottom: 20px;
`

const styles = StyleSheet.create({
    container: {
        flex: 1,  // Занимает все доступное пространство
        padding: 20,
    },
    row: {
        flexDirection: 'row', // Выстраивает элементы в ряд
        flexWrap: 'wrap',      // Переносит элементы на новую строку, если они не помещаются
    },
    image: {
        width: '100%',
        height: 200,   // Задайте желаемую высоту
        resizeMode: 'cover', // Как изображение должно масштабироваться
    },
    textHeader: {
        fontSize: 40,
    },
    text: {
        fontSize: 16,
    },
    detailsContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: 10, //  Пример gap-md-3
    }
});


const FullPostScreen = ({ route, navigation }) => {

    const [isLoading, setIsLoading] = useState(true)
    const [data, setData] = useState()

    const { id, name } = route.params

    const fetchGroup = () => {
        navigation.setOptions({
            name,
        })

        axios
            .get(`http://${process.env.EXPO_PUBLIC_IP_ADDRESS}:8000/api/programms/` + id)
            .then(({data}) => {
                setData(data)
            })
            .catch((err) => {
                alert("Ошибка, не удалось получить статью")
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    useEffect(fetchGroup, [])

    if (isLoading) {
        return (
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Loading />
            </View>
        )
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.row}>
                <PostImage source={{uri: data.image}} />
                <View>
                    <View style={styles.detailsContainer}>
                        <Text style={[styles.textHeader]}>{data.name}</Text>
                        <Text style={styles.text}>Описание: {data.description}</Text>
                        <Text style={styles.text}>Цена: {data.price} руб.</Text>
                        <Text style={styles.text}>Материал: {data.material}</Text>
                    </View>
                </View>
            </View>
        </ScrollView>
    );

}

export default FullPostScreen;