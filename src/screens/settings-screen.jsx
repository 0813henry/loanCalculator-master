import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Switch } from 'react-native';
import { useTheme } from '../context/theme-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Moon, LogOut } from 'lucide-react-native';
import { auth } from '../../firebase'
import DarkModeSwitch from '../components/dark-mode-switch';

export default function SettingsScreen({ navigation }) {
  const { isDarkMode, toggleTheme } = useTheme();

  const handleLogout = async () => {
    try {
      await auth.signOut();
      // Navigate to Login screen or handle logout in your authentication flow
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <LinearGradient
      colors={isDarkMode ? ['#1F2937', '#111827'] : ['#F3F4F6', '#E5E7EB']}
      style={styles.container}
    >
      <View style={styles.content}>
        <Text style={[styles.title, isDarkMode && styles.darkText]}>Configuración</Text>
        
        <View style={styles.optionContainer}>
          <View style={styles.optionLeft}>
            <Moon color={isDarkMode ? '#FFFFFF' : '#000000'} size={24} />
            <Text style={[styles.optionText, isDarkMode && styles.darkText]}>Modo Oscuro</Text>
          </View>
          <DarkModeSwitch/>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <LogOut color="#FFFFFF" size={24} />
          <Text style={styles.logoutText}>Cerrar Sesión</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
    fontFamily: 'Nunito_700Bold',
  },
  darkText: {
    color: '#FFFFFF',
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 16,
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionText: {
    fontSize: 18,
    marginLeft: 16,
    fontFamily: 'Nunito_600SemiBold',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EF4444',
    borderRadius: 12,
    padding: 16,
    marginTop: 20,
  },
  logoutText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 16,
    fontFamily: 'Nunito_600SemiBold',
  },
});