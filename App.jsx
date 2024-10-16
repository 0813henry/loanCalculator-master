import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ThemeProvider, useTheme } from './src/context/theme-context';
import { useFonts, Nunito_400Regular, Nunito_700Bold, Nunito_600SemiBold } from '@expo-google-fonts/nunito';
import HomeScreen from './src/screens/home-screen';
import GradientScreen from './src/screens/gradient-screen';
import AnnuitiesScreen from './src/screens/annuities-screen';
import DarkModeSwitch from './src/components/dark-mode-switch';
import SimpleInterestScreen from './src/screens/simple-interest-screen';
import CompoundInterestScreen from './src/screens/compound-interest-screen';
import AmortizationScreen from './src/screens/amortization-screen';
import UVRScreen from './src/screens/uvr-screen';
import IRRScreen from './src/screens/tir-screen';
import LoginScreen from './src/screens/login';
import { auth } from './firebase'; // Asegúrate de tener el archivo firebase configurado correctamente

const Stack = createNativeStackNavigator();

// Contenido principal de la aplicación (después de iniciar sesión)
function AppContent() {
  const { isDarkMode } = useTheme(); // tema oscuro
  let [fontsLoaded] = useFonts({
    Nunito_400Regular,
    Nunito_600SemiBold,
    Nunito_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: isDarkMode ? '#1F2937' : '#F3F4F6',
        },
        headerTintColor: isDarkMode ? '#FFFFFF' : '#000000',
        headerRight: () => <DarkModeSwitch />,
        headerTitleStyle: {
          fontFamily: 'Nunito_700Bold',
          fontSize: 20,
        },
        headerShadowVisible: false,
        headerTitleAlign: 'center',
      }}
    >
      <Stack.Screen 
        name="Home" 
        component={HomeScreen}
        options={{
          title: 'Calculadora de intereses',
        }}
      />
      <Stack.Screen 
        name="SimpleInterest" 
        component={SimpleInterestScreen}
        options={{
          title: 'Interés Simple',
        }}
      />
      <Stack.Screen 
        name="CompoundInterest" 
        component={CompoundInterestScreen}
        options={{
          title: 'Interés Compuesto',
        }}
      />
      <Stack.Screen 
        name="Annuities" 
        component={AnnuitiesScreen}
        options={{
          title: 'Anualidades',
        }}
      />
      <Stack.Screen 
        name="Gradient" 
        component={GradientScreen}
        options={{
          title: 'Gradientes',
        }}
      />
      <Stack.Screen 
        name="Amortization" 
        component={AmortizationScreen}
        options={{
          title: 'Amortizacion',
        }}
      />
      <Stack.Screen 
        name="UVR" 
        component={UVRScreen}
        options={{
          title: 'UVR',
        }}
      />
      <Stack.Screen 
        name="TIR" 
        component={IRRScreen}
        options={{
          title: 'TIR',
        }}
      />
    </Stack.Navigator>
  );
}

// Componente principal de la aplicación que maneja la autenticación
export default function App() {
  const [user, setUser] = useState(null); // Estado para guardar la sesión del usuario

  useEffect(() => {
    // Verificar el estado de autenticación de Firebase
    const unsubscribe = auth.onAuthStateChanged((authenticatedUser) => {
      if (authenticatedUser) {
        setUser(authenticatedUser); // Usuario autenticado
      } else {
        setUser(null); // Usuario no autenticado
      }
    });

    return unsubscribe; // Limpiar la suscripción al desmontar el componente
  }, []);

  return (
    <ThemeProvider>
      <NavigationContainer>
        <Stack.Navigator>
          {/* Si hay usuario, muestra el contenido de la app, sino, muestra la pantalla de login */}
          {user ? (
            <Stack.Screen
              options={{ headerShown: false }}
              name="AppContent"
              component={AppContent}
            />
          ) : (
            <Stack.Screen
              options={{ headerShown: false }}
              name="Login"
              component={LoginScreen}
            />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}
