import axios from 'axios'
import React, { useState } from 'react'
import { Button, Image, StyleSheet, Text, TextInput, View } from 'react-native'

const Item = () => {
    return (
        <View style={styles.itemContainer}>
            <Image source={{ uri: 'https://ui-avatars.com/api/?size=150' }} style={styles.avatar} />
            <View style={styles.desc}>
                <Text style={styles.name}>Nama Lengkap</Text>
                <Text style={styles.email}>Email</Text>
                <Text style={styles.bidang} >Bidang</Text>
            </View>
            <Text style={styles.delete}>X</Text>
        </View>
    )

}

const LocalApi = () => {
    const[name,setName]=useState("")
    const[email,setEmail]=useState("")
    const[bidang,setBidang]=useState("")

    const submit = () =>{
        const data = {
            name,email,bidang
        }
        console.log(data)
        axios.post("http://192.168.1.4:3000/users",data)
        .then(res=>{console.log(res)})
        setName("")
        setEmail("")
        setBidang("")
    }

    return (
        <View style={styles.container}>
            <Text style={styles.textTitle}>Local api (json server)</Text>
            <Text>Masukkan User</Text>
            <TextInput placeholder="Nama" style={styles.input} value={name} onChangeText={(value)=>setName(value)} />
            <TextInput placeholder="Email" style={styles.input} value={email} onChangeText={(value)=>setEmail(value)} />
            <TextInput placeholder="Bidang" style={styles.input} value={bidang} onChangeText={(value)=>setBidang(value)} />
            <Button title="Tambah" onPress={submit} />
            <View style={styles.line} />
            <Item />
        </View>
    )
}

export default LocalApi

const styles = StyleSheet.create({
    container: {
        padding: 20
    },
    textTitle: {
        textAlign: 'center', marginBottom: 20
    },
    line: {
        height: 2, backgroundColor: 'black', marginVertical: 20
    },
    input: {
        borderWidth: 1, marginBottom: 12, borderRadius: 25, paddingHorizontal: 18
    },
    avatar: {
        width: 80, height: 80, borderRadius: 100
    },
    itemContainer: {
        flexDirection: 'row',marginBottom:20
    },
    desc: {
        marginLeft: 10,flex:1
    },
    name: {
        fontSize: 20, fontWeight: 'bold'
    },
    email: {
        fontSize: 16
    },
    bidang: {
        fontSize: 12, marginTop: 8
    },
    delete:{
        color:'red',fontWeight:'bold'
    }
})
