import { StyleSheet, Text, View, TextInput, Dimensions } from 'react-native'
import React from 'react'

const { height, width } = Dimensions.get("window")

const CustomInputs = ({ label, placeholder, datos, tipo, setDatos, value }) => {

    const onChangeText = (text, tipo) => {
        switch (tipo) {
            case "nombre":
                setDatos({...datos, nombres: text, id: new Date()})
                return
            case "apellido":
                setDatos({...datos, apellidos: text, id: new Date()})
                return
            default:
                return;
        }
    }

    return (
        <View style={styles.container}>
            <Text>{label}</Text>
            <TextInput
                style={styles.input}
                placeholder={placeholder}
                onChangeText={(text) => onChangeText(text, tipo)}
                value={value}
            />
        </View>
    )
}

export default CustomInputs

const styles = StyleSheet.create({
    container: {
        marginTop: height * 0.01,
    },
    input: {
        borderWidth: 1,
        width: width * 0.8,
        height: height * 0.06,
        marginTop: height * 0.01,
        paddingLeft: 5,
    },
})