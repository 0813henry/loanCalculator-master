import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  Alert,
} from "react-native";
import { auth } from "../../firebase"; 
import { useNavigation } from "@react-navigation/native";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  const handleLogin = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        Alert.alert("Éxito", "Has iniciado sesión correctamente.");
        // Aquí puedes redirigir a otra pantalla si es necesario
      })
      .catch((error) => {
        Alert.alert("Error", error.message);
      });
  };

  const handleRecoverPassword = () => {
    // Navegar a la pantalla de recuperación de contraseña
    navigation.navigate("Recover");
  };

  const handleRegister = () => {
    navigation.navigate("Register"); // Navegar a la pantalla de registro
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={"padding"}>
      <Image source={require("../../assets/logo.png")} style={styles.logo} />
      <Text style={styles.welcomeText}>Bienvenido</Text>
      <Text style={styles.subtitle}>
        Para comenzar inicia sesión con tu correo electrónico y contraseña.
      </Text>
      
      <View style={styles.inputContainer}>
        <TextInput
          placeholder={"Correo Electrónico"}
          style={styles.input}
          value={email}
          onChangeText={(text) => setEmail(text)}
          keyboardType="email-address" // Teclado para ingresar email
        />
        <TextInput
          placeholder={"Contraseña"}
          style={styles.input}
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry // Ocultar texto de la contraseña
        />
      </View>

      <TouchableOpacity onPress={handleRecoverPassword} style={styles.link}>
        <Text style={styles.linkText}>¿Olvidaste tu contraseña?</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleLogin} style={styles.button}>
        <Text style={styles.buttonText}>Iniciar sesión</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleRegister}>
        <Text style={styles.footerText}>¿No tienes cuenta? Regístrate aquí.</Text>
      </TouchableOpacity>

      <Text style={styles.footerText}>© 2024 Tu Calculadora Financiera. Todos los derechos reservados.</Text>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    padding: 20,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
  },
  inputContainer: {
    width: "100%",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginVertical: 5,
    borderColor: "#B0BEC5",
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  button: {
    backgroundColor: "#007BFF",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  link: {
    marginVertical: 10,
  },
  linkText: {
    color: "#007BFF",
    fontSize: 14,
    textAlign: "center",
  },
  footerText: {
    marginTop: 20,
    color: "#B0BEC5",
    fontSize: 12,
    textAlign: "center",
  },
});

export default LoginScreen;
