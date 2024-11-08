import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ThemeProvider, useTheme } from './src/context/theme-context';
import { useFonts, Nunito_400Regular, Nunito_700Bold, Nunito_600SemiBold } from '@expo-google-fonts/nunito';
import { LoanProvider } from './src/context/loan-context';
import { FinanceProvider } from './src/context/finance-context';
import { Home, Calculator, DollarSign, Settings } from 'lucide-react-native';

// Import screens
import HomeScreen from './src/screens/home-screen';
import CalculationsScreen from './src/screens/calculations-screens';
import LoansScreen from './src/screens/loans-screens';
import SettingsScreen from './src/screens/settings-screen';
import LoginScreen from './src/screens/login-screen';
import RegisterScreen from './src/screens/Register-Screen';
import RecoverScreen from './src/screens/RecoverPassword-screen';
import SimpleInterestScreen from './src/screens/simple-interest-screen';
import CompoundInterestScreen from './src/screens/compound-interest-screen';
import AnnuitiesScreen from './src/screens/annuities-screen';
import GradientScreen from './src/screens/gradient-screen';
import AmortizationScreen from './src/screens/amortization-screen';
import UVRScreen from './src/screens/uvr-screen';
import IRRScreen from './src/screens/tir-screen';
import LoanApplicationScreen from './src/screens/loan-aplication-screen';
import LoanManagementScreen from './src/screens/loan-management-screen';
import LoanDetailsScreen from './src/screens/loan-details-screen';
import FinanceManagementScreen from './src/screens/finance-management-screen';

import { auth } from './firebase';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function TabNavigator() {
  const { isDarkMode } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let icon;
          if (route.name === 'Home') {
            icon = <Home color={color} size={size} />;
          } else if (route.name === 'Calculations') {
            icon = <Calculator color={color} size={size} />;
          } else if (route.name === 'Loans') {
            icon = <DollarSign color={color} size={size} />;
          } else if (route.name === 'Settings') {
            icon = <Settings color={color} size={size} />;
          }
          return icon;
        },
        tabBarActiveTintColor: isDarkMode ? '#60A5FA' : '#2563EB',
        tabBarInactiveTintColor: isDarkMode ? '#9CA3AF' : '#6B7280',
        tabBarStyle: {
          backgroundColor: isDarkMode ? '#1F2937' : '#F3F4F6',
          borderTopWidth: 0,
        },
        headerStyle: {
          backgroundColor: isDarkMode ? '#1F2937' : '#F3F4F6',
        },
        headerTintColor: isDarkMode ? '#FFFFFF' : '#000000',
        headerTitleStyle: {
          fontFamily: 'Nunito_700Bold',
          fontSize: 20,
        },
        headerShadowVisible: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Inicio' }} />
      <Tab.Screen name="Calculations" component={CalculationsScreen} options={{ title: 'Cálculos' }} />
      <Tab.Screen name="Loans" component={LoansScreen} options={{ title: 'Préstamos' }} />
      <Tab.Screen name="Settings" component={SettingsScreen} options={{ title: 'Configuración' }} />
    </Tab.Navigator>
  );
}

function AppContent() {
  let [fontsLoaded] = useFonts({
    Nunito_400Regular,
    Nunito_600SemiBold,
    Nunito_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Main" component={TabNavigator} />
      <Stack.Screen name="SimpleInterest" component={SimpleInterestScreen} options={{ headerShown: true, title: 'Interés Simple' }} />
      <Stack.Screen name="CompoundInterest" component={CompoundInterestScreen} options={{ headerShown: true, title: 'Interés Compuesto' }} />
      <Stack.Screen name="Annuities" component={AnnuitiesScreen} options={{ headerShown: true, title: 'Anualidades' }} />
      <Stack.Screen name="Gradient" component={GradientScreen} options={{ headerShown: true, title: 'Gradientes' }} />
      <Stack.Screen name="Amortization" component={AmortizationScreen} options={{ headerShown: true, title: 'Amortización' }} />
      <Stack.Screen name="UVR" component={UVRScreen} options={{ headerShown: true, title: 'UVR' }} />
      <Stack.Screen name="TIR" component={IRRScreen} options={{ headerShown: true, title: 'TIR' }} />
      <Stack.Screen name="LoanApplication" component={LoanApplicationScreen} options={{ headerShown: true, title: 'Solicitar Préstamo' }} />
      <Stack.Screen name="LoanManagement" component={LoanManagementScreen} options={{ headerShown: true, title: 'Gestión de Préstamos' }} />
      <Stack.Screen name="LoanDetails" component={LoanDetailsScreen} options={{ headerShown: true, title: 'Detalles del Préstamo' }} />
      <Stack.Screen name="FinanceManagement" component={FinanceManagementScreen} options={{ headerShown: true, title: 'Gestión Financiera' }} />
    </Stack.Navigator>
  );
}

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authenticatedUser) => {
      setUser(authenticatedUser);
    });

    return unsubscribe;
  }, []);

  return (
    <ThemeProvider>
      <LoanProvider>
        <FinanceProvider>
          <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              {user ? (
                <Stack.Screen name="AppContent" component={AppContent} />
              ) : (
                <>
                  <Stack.Screen name="Login" component={LoginScreen} />
                  <Stack.Screen name="Register" component={RegisterScreen} />
                  <Stack.Screen name="Recover" component={RecoverScreen} />
                </>
              )}
            </Stack.Navigator>
          </NavigationContainer>
        </FinanceProvider>
      </LoanProvider>
    </ThemeProvider>
  );
}