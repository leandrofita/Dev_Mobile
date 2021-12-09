import { StyleSheet, Text, View } from "react-native";

import React from "react";

const Title = ({children}) => {
    return (
        <View>
            <Text style={styles}>{children}</Text>
        </View>
    )
    
}

const styles = StyleSheet.create({
    
    fontSize: 30,
    
});
export default Title;