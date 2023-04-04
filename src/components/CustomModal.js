import { StyleSheet, Text, View, Modal, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'
import { deleteList } from '../database'

const { height, width } = Dimensions.get("window")

const CustomModal = ({ modal, setModal, item, setForm, setSelectModal, form }) => {

    const DeleteList = async (item) =>{
        await deleteList(item.id)
        const newItem = form.filter((items)=> items.id !== item.id)
        setForm(newItem)
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
        paddingVertical: 10,
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
        borderBottomColor: "#000",
        borderBottomWidth: 2,
    },
    msgText:{
        marginBottom: height * 0.01,
    },
    containerBox: {
        marginTop: height * 0.015,
        flexDirection: 'row',
    },
    btn:{
        borderWidth: 1,
        padding: 5,
        marginHorizontal: 10,
    },
    textBtn:{
        fontWeight: 'bold',
    },
})