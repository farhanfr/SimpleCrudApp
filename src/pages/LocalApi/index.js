import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Alert, Button, Image, ScrollView, StyleSheet, Text, TextInput, Touchable, TouchableOpacity, View, VirtualizedList } from 'react-native'

const Item = ({name,email,bidang,onPress,onDelete}) => {
    return (
        <View style={styles.itemContainer}>
            <TouchableOpacity onPress={onPress}>
                <Image source={{ uri: `https://ui-avatars.com/api/?name=${name}&size=150`}} style={styles.avatar} />
            </TouchableOpacity>
            <View style={styles.desc}>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.email}>{email}</Text>
                <Text style={styles.bidang} >{bidang}</Text>
            </View>
            <TouchableOpacity>
                <Text style={styles.delete} onPress={onDelete}>X</Text>
            </TouchableOpacity>
        </View>
    )

}

const LocalApi = () => {
    const[name,setName]=useState("")
    const[email,setEmail]=useState("")
    const[bidang,setBidang]=useState("")
    const[users,setUsers]=useState([])
    const[button,setButton]=useState("Simpan")
    const[selectedUser,setSelectedUser]=useState()
    
    useEffect(() => {
        let isSubscriber = true
        isSubscriber ? getData() : null
        return () => isSubscriber = false
    }, [])

    const submit = () =>{
        const data = {
            name,email,bidang
        }
        console.log(data)

        if (button === 'Simpan') {
            axios.post("http://192.168.1.4:3000/users",data)
            .then(res=>{console.log(res)})
            setName("")
            setEmail("")
            setBidang("")
            getData()    
        }else if (button === 'Update') {
            axios.put(`http://192.168.1.4:3000/users/${selectedUser.id}`,data)
            .then(res=>{
                console.log("update behasil")
                setName("")
                setEmail("")
                setBidang("")
                getData()    
                setButton("Simpan")
            })
        }

        
    }

    const getData = () =>{
        axios.get("http://192.168.1.4:3000/users")
        .then(res=>{
            console.log('res :' + res.data)
            setUsers(res.data)
        })
    }

    const deleteData = (item) =>{
        axios.delete(`http://192.168.1.4:3000/users/${item.id}`)
        .then(res=>{
            console.log("hapus berhasil")
            getData()
        })
    }
    
    const selectItem = (item) =>{
        console.log('selected item : ' + item)
        setSelectedUser(item)
        setName(item.name)
        setEmail(item.email)
        setBidang(item.bidang)
        setButton("Update")
    }

    return (
        <View style={styles.container}>
            
            <Text style={styles.textTitle}>Local api (json server)</Text>
            <Text>Masukkan User</Text>
            <TextInput placeholder="Nama" style={styles.input} value={name} onChangeText={(value)=>setName(value)} />
            <TextInput placeholder="Email" style={styles.input} value={email} onChangeText={(value)=>setEmail(value)} />
            <TextInput placeholder="Bidang" style={styles.input} value={bidang} onChangeText={(value)=>setBidang(value)} />
            <Button title={button} onPress={submit} />
            <View style={styles.line} />
            <View></View>
            {users.map(user=>{
               return (
                <Item 
                key={user.id} 
                name={user.name} 
                email={user.email} 
                bidang={user.bidang} 
                onPress={()=>selectItem(user)}
                onDelete={()=> 
                    Alert.alert('notice','Are you sure delete?',
                    [{text:'tidak',onPress:()=>console.log('tidak hapus')},
                    {text:'hapus',onPress:()=>deleteData(user)}])}/>
               )
            })}
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
