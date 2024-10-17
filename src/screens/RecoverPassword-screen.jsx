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

const RecoverScreen = () => {
  const [email, setEmail] = useState("");
  const navigation = useNavigation();

  const handleRecoverPassword = () => {
    auth
      .sendPasswordResetEmail(email)
      .then(() => {
        Alert.alert("Éxito", "Se ha enviado un enlace de restablecimiento de contraseña a tu correo.");
        navigation.navigate("Login"); // Redirigir a Login después de la recuperación
      })
      .catch((error) => {
        Alert.alert("Error", error.message);
      });
  };

  const handleLogin = () => {
    navigation.navigate("Login"); // Navegar a la pantalla de Login
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={"padding"}>
      <Image source={require("../../assets/logo.png")} style={styles.logo} />
      <Text style={styles.title}>Recupera tu Contraseña</Text>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder={"Correo Electrónico"}
          style={styles.input}
          value={email}
          onChangeText={(text) => setEmail(text)}
          keyboardType="email-address" // Teclado para ingresar email
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleRecoverPassword} style={styles.button}>
          <Text style={styles.buttonText}>Recuperar Contraseña</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleLogin} style={[styles.button, styles.buttonOutline]}>
          <Text style={styles.buttonOutlineText}>Volver al Login</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.footerText}>© 2024 Tu Banco. Todos los derechos reservados.</Text>
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
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
  buttonContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#007BFF",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 5,
  },
  buttonOutline: {
    backgroundColor: "white",
    borderColor: "#007BFF",
    borderWidth: 1,
  },
  buttonOutlineText: {
    color: "#007BFF",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  footerText: {
    marginTop: 20,
    color: "#B0BEC5",
    fontSize: 12,
  },
});

export default RecoverScreen;
