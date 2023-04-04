import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Dimensions, FlatList, TouchableOpacity, Alert } from 'react-native'
import CustomInputs from '../components/CustomInputs'
import { addList, deleteList, loadList } from '../database'
import CustomModal from '../components/CustomModal'

const { height, width } = Dimensions.get("window")

const Home = () => {

    const [datos, setDatos] = useState({ nombres: "", apellidos: "", id: "" })
    const [form, setForm] = useState([])
    const [modal, setModal] = useState(false)
    const [selecModal, setSelectModal] = useState(null)

    useEffect(() => {
        const Api = async () => {
            const result = await loadList()
            const array = result?.rows?._array
            setForm(array)
        }
        Api()
    }, [])

    const DeleteList = (item) => {
        /*deleteList(id)
        const newItem = form.filter((item)=> item.id !== id)
        setForm(newItem)*/
        setSelectModal(item)
        setModal(!modal)
    }

    const RenderItem = ({ item }) => {
        return (
            <TouchableOpacity style={styles.containerRender} onPress={() => DeleteList(item)}>
                <Text style={styles.textItem}>
                    <Text style={styles.textItemBold}>Nombre: </Text>{item.nombres}
                </Text>
                <Text style={styles.textItem}>
                    <Text style={styles.textItemBold}>Apellido: </Text>{item.apellidos}
                </Text>
            </TouchableOpacity>
        )
    }

    const onHandleSendForm = async () => {
        if (datos.nombres == "" || datos.apellidos == "") {
            Alert.alert("Debes completar los datos")
        } else {
            await addList(datos.nombres, datos.apellidos)
            setForm([...form, datos])
            setDatos({ nombres: "", apellidos: "", id: "" })
            Alert.alert("Los datos se enviaron correctamente")
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.head}>
                <Text style={styles.titleText}>Usando SQLite</Text>
            </View>
            <View style={styles.body}>
                <View style={styles.containerInputs}>
                    <CustomInputs
                        label="Nombre"
                        placeholder="Pepe..."
                        datos={datos}
                        tipo="nombre"
                        setDatos={setDatos}
                        value={datos.nombres}
                    />
                    <CustomInputs
                        label="Apellido"
                        placeholder="Artigas..."
                        datos={datos}
                        tipo="apellido"
                        setDatos={setDatos}
                        value={datos.apellidos}
                    />
                    <TouchableOpacity style={styles.btnEnviar} onPress={onHandleSendForm}>
                        <Text>Enviar</Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={form}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={RenderItem}
                />
            </View>
            <CustomModal
                modal={modal}
                setModal={setModal}
                item={selecModal}
                setForm={setForm}
                setSelectModal={setSelectModal}
                form={form}
            />
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    head: {
        height: height * 0.15,
        width: width,
        backgroundColor: "#f4a404",
        justifyContent: 'center',
        alignItems: 'center',
    },
    body: {
        flex: 1,

    },
    titleText: {
        backgroundColor: "#f4c404",
        padding: 5,
        fontSize: 24,
        fontWeight: 'bold',
    },
    text: {
        fontSize: 16,
    },
    containerInputs: {
        alignItems: 'center',
    },
    btnEnviar: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        backgroundColor: "#f4a404",
        height: height * 0.06,
        width: width * 0.8,
    },
    containerRender: {
        borderWidth: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: height * 0.01,
    },
    textItem: {
        fontSize: 20,
        marginHorizontal: 10
    },
    textItemBold: {
        fontWeight: 'bold',
    }
})