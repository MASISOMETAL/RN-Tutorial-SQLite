import { StyleSheet, Text, View, Modal, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'
import { deleteList, loadList } from '../database'

const { height, width } = Dimensions.get("window")

const CustomModal = ({ modal, setModal, item, setForm, setSelectModal, form }) => {

    const DeleteList = async (item) =>{
        //Borrar dato de la base de datos
        await deleteList(item.id)
        //Volver a cargar la base de Datos
        const result = await loadList()
        const array = result?.rows?._array
        setForm(array)
        setModal(false)
        setSelectModal(null)
    }

    return (
        <Modal visible={modal} transparent={true}>
            <View style={styles.container}>
                <View style={styles.containerModal}>
                    <View style={styles.containerText}>
                        <Text style={styles.msgText}>Seguro quieres borrar: {item?.nombres} {item?.apellidos}</Text>
                    </View>
                    <View style={styles.containerBox}>
                        <TouchableOpacity style={styles.btn} onPress={()=> setModal(false)}>
                            <Text style={styles.textBtn}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btn} onPress={()=> DeleteList(item)}>
                            <Text style={styles.textBtn}>Aceptar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default CustomModal

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: "#cccccccc"
    },
    containerModal: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
        margin: 20,
        borderRadius: 10,
        paddingHorizontal: 30,
        paddingVertical: 20,
        shadowColor: "#fff",
        shadowOffset: {
            width: 3,
            height: 3,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    containerText: {
        width: width * 0.75,
        justifyContent: "flex-start",
        alignItems: "center",
        borderBottomColor: "#f4a404",
        borderBottomWidth: 2,
    },
    msgText:{
        marginBottom: height * 0.01,
    },
    containerBox: {
        marginTop: height * 0.02,
        flexDirection: 'row',
    },
    btn:{
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: "#f4a404",
        width: width * 0.2,
        height: height * 0.05,
        marginHorizontal: width * 0.1,
    },
    textBtn:{
        fontWeight: 'bold',
    },
})