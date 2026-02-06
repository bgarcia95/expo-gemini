import { Layout, Text } from '@ui-kitten/components'
import React from 'react'

const NoImages = () => {
    return (
        <Layout style={{ alignItems: 'center', flexGrow: 0, height: 200, marginBottom: 50 }}>
            <Layout style={{
                alignItems: 'center',
                backgroundColor: '#E4E9F2',
                borderRadius: 16,
                flexGrow: 0,
                height: 200,
                justifyContent: 'center',
                marginTop: 15,
                width: 250
            }}>
                <Text category='h5'>No images</Text>
                <Text category='p2'>Writing something to get started!</Text>
            </Layout>
        </Layout>
    )
}

export default NoImages