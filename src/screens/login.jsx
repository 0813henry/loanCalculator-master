import { useEffect, useState } from "react";
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { auth } from "../../firebase";
import { useNavigation } from "@react-navigation/core";

const LoginScreen = () => {
    const [cedula, setCedula] = useState(''); // Cambiado de email a cedula
    const [password, setPassword] = useState('');
    const navigation = useNavigation();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                navigation.replace("Home");
            }
        });

        return unsubscribe;
    }, []);

    const handleSignUp = () => {
        const cedulaEmail = `${cedula}@cedula.com`; // Simulamos un email con la cedula

        auth
            .createUserWithEmailAndPassword(cedulaEmail, password)
            .then(userCreds => {
                const user = userCreds.user;
                console.log('Registered with: ', user?.email);
            })
            .catch(error => alert(error.message));
    };

    const handleLogin = () => {
        const cedulaEmail = `${cedula}@cedula.com`; // Simulamos un email con la cedula

        auth
            .signInWithEmailAndPassword(cedulaEmail, password)
            .then(userCrds => {
                const user = userCrds.user;
                console.log('Logged in with: ', user?.email);
            })
            .catch(error => alert(error.message));
    };

    return (
        <KeyboardAvoidingView style={styles.container} behavior={'padding'}>
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder={'Cédula'}
                    style={styles.input}
                    value={cedula}
                    onChangeText={text => setCedula(text)}
                    keyboardType="numeric" // Para que el teclado numérico aparezca
                />
                <TextInput
                    placeholder={'Contraseña'}
                    style={styles.input}
                    value={password}
                    onChangeText={pwd => setPassword(pwd)}
                    secureTextEntry
                />
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={handleLogin} style={styles.button}>
                    <Text style={styles.buttonText}>Iniciar Sesión</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={handleSignUp} style={[styles.button, styles.buttonOutline]}>
                    <Text style={styles.buttonOutlineText}>Registrarse</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputContainer: {
        width: '80%',
    },
    input: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5,
    },
    buttonContainer: {
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
    },
    button: {
        backgroundColor: '#0782F9',
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonOutline: {
        backgroundColor: 'white',
        marginTop: 5,
        borderColor: '#0782F9',
        borderWidth: 1,
    },
    buttonOutlineText: {
        color: '#0782F9',
        fontWeight: '700',
        fontSize: 16,
    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
    }
});
