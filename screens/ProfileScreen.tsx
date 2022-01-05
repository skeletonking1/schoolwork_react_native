import React, { useState, useEffect } from 'react';
import { StyleSheet, Button } from 'react-native';

import ListInfo from '../components/ListInfo';
import { Text, View } from '../components/Themed';
import storage from '../others/storage';
import { getUserInfo } from '../others/getInfo';
import { ProfileObj } from '../components/types';

interface Props {
    navigation: any,
}

export default function ProfileScreen(props: Props) {
    const [data, setData] = useState<ProfileObj>({
        avatarUrl: '',
        name: '',
        login: '',
        email: '',
        bio: '',
        repositories: { totalCount: 0 },
        url: '',
        following: { totalCount: 0 },
        followers: { totalCount: 0 },
        createdAt: '',
    })

    const userCache = async () => {
        const token: string = await storage.load({ key: 'OAuthToken' })
        const returnVal: any = await getUserInfo(token)
        if (returnVal.data) {
            setData(returnVal.data.viewer)
        }
    }

    useEffect(() => {
        userCache();
    }, []);

    const logout = () => {
        storage.remove({ key: 'OAuthToken' })
        props.navigation.push('Login')
    }
    return (
        <View style={styles.container}>
            <ListInfo data={data} {...props} />
            <View style={styles.logout}><Button onPress={() => logout()} title="LOGOUT" /></View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    logout: {
        width: '80%',
        borderRadius: 5
    }
});
