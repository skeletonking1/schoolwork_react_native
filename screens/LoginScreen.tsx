import React, { useState, useEffect } from 'react';
import { StyleSheet, TextInput, SafeAreaView, View, Button, ActivityIndicator } from 'react-native';
import storage from '../others/storage';
import { getUserInfo } from '../others/getInfo';

interface Props {
    navigation: any
}

export default function LoginScreen(props: Props) {
    const [val, onChangeVal] = useState('');
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        getGitToken();
    }, []);

    const getGitToken = async () => {
        storage.load({
            key: 'OAuthToken'
        }).then(token => {
            if (token) {
                props.navigation.replace('Root')
            }
        }).catch(error => {
            setLoading(false)
        })
    }

    const getInfo = async (token: any) => {
        const returnVal: any = await getUserInfo(token)
        if (returnVal.data.viewer.login) {
            storage.save({ key: 'OAuthToken', data: token, expires: 1000 * 3600 }); // 1d expires
            storage.save({ key: 'username', data: returnVal.data.viewer.login, expires: 1000 * 3600 }); // 1d expires
            props.navigation.replace('Root')
        }
    }

    const loginView = () => {
        return (
            <View style={styles.view}>
                <TextInput
                    placeholder='Github API Token'
                    multiline numberOfLines={4}
                    onChangeText={val => onChangeVal(val)}
                    value={val}
                    maxLength={40}
                    style={styles.textinput}
                />

                <Button title="LOGIN" onPress={async () => getInfo(val)} />
            </View>
        )
    }

    return (
        <SafeAreaView>
            {isLoading ? <ActivityIndicator size="large" /> : loginView()}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    view: {
        height: '100%',
        padding: 40,
        display: 'flex',
    },
    textinput: {
        width: '100%',
        marginTop: 200,
        marginBottom: 40,
        border: '1px solid #4c4c4c',
        borderRadius: 5,
        padding: 10
    },
    button: {
        marginTop: 40
    }
})


