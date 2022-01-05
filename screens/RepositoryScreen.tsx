import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, View, Text } from 'react-native';
import { getRepo } from '../others/getInfo';
import storage from '../others/storage';
import { RepositoryObj } from '../components/types';


export default function RepositoryScreen() {
    const [rows, setRows] = useState<RepositoryObj[]>([]);

    useEffect(() => {
        getRepoInfo()
    }, []);

    const getRepoInfo = async () => {
        try {
            const token: string = await storage.load({ key: 'OAuthToken' })
            let returnVal: any = await getRepo(token)
            if (returnVal.data) {
                let repositoryList: RepositoryObj[] = []
                returnVal.data.viewer.repositories.nodes.forEach((item: RepositoryObj) => {
                    repositoryList.push(item)
                })
                setRows(repositoryList)
            }
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <ScrollView>
            {

                rows.map((item: any, index) =>
                    <View key={index} style={styles.container}>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.title}>{item.name}</Text>
                            <Text>{item.description}</Text>
                        </View>
                        <Text>
                            {item.owner.login}
                        </Text>
                    </View>
                )
            }
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#ccc',
        padding: '8px',
        minHeight: '60px'
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});
