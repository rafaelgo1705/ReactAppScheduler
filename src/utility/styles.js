import colors from './colors';

const styles = {
    //Tela de Login
    telaLogin: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch',
        marginHorizontal: 10,
    },

    telaLoginInput: {
        height: 40, 
        borderColor: 'gray', 
        borderWidth: 1,
        alignItems: 'center',
        marginVertical: 10,
        borderRadius: 20,
        paddingHorizontal: 15,
        paddingVertical: 10
    },

    telaLoginButton: {
        alignItems: "center",
        backgroundColor: "#DDDDDD",
        padding: 10,
        marginTop: 10,
        borderRadius: 20,
    },

    logoTelaLogin: {
        width: 100,
        height: 100,
        margin: 10,
        alignItems: 'center',
    },

    //Fim tela de Login
    //Tela Home
    telaHome: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch',
        
    },

    telaHomeButton: {
        alignItems: "center",
        backgroundColor: "#DDDDDD",
        padding: 10,
        margin: 15,
        borderRadius: 20,
    },

    telaHomeItensTitle: {
        marginLeft: 10,
        fontSize: 18,
        fontWeight: 'bold',
        justifyContent: 'center'
    },

    telaHomeItensArray: {
        borderBottomWidth: 0.5,
        borderColor: colors.corSelecionado,
        padding: 12,
        flexDirection: 'row',
    }
}

export default styles;