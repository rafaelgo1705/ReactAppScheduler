import colors from './colors';

const styles = {
    //Tela de Login
    screenLogin: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch',
        marginHorizontal: 10,
    },

    screenLoginInput: {
        height: 40, 
        maxWidth: 400,
        borderColor: 'gray', 
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
        borderRadius: 20,
        paddingHorizontal: 15,
        paddingVertical: 10
    },

    screenLoginButton: {
        alignItems: "center",
        backgroundColor: "#DDDDDD",
        padding: 10,
        marginTop: 10,
        maxWidth: 400,
        borderRadius: 20,
    },

    screenLoginImage: {
        width: 100,
        height: 100,
        margin: 10,
        alignItems: 'center',
    },

    //Fim tela de Login
    //Tela Home
    screenHome: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch',
        
    },

    screenHomeButton: {
        alignItems: "center",
        backgroundColor: "#DDDDDD",
        padding: 10,
        margin: 15,
        borderRadius: 20,
    },

    screenHomeItemsTitle: {
        marginHorizontal: 10,
        textAlign: 'justify',
        fontSize: 18,
        fontWeight: 'bold',
        justifyContent: 'center'
    },

    screenHomeItemsArray: {
        borderBottomWidth: 0.5,
        borderColor: colors.corSelecionado,
        padding: 12,
        flexDirection: 'row',
    }
}

export default styles;