import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../context/theme-context';
import { LinearGradient } from 'expo-linear-gradient';
import { FileText, List, CreditCard } from 'lucide-react-native';

const loanOptions = [
  { title: 'Solicitar Préstamo', icon: FileText, screen: 'LoanApplication', color: ['#14B8A6', '#0D9488'] },
  { title: 'Gestión de Préstamos', icon: List, screen: 'LoanManagement', color: ['#6366F1', '#4F46E5'] },
  { title: 'Gestión Financiera', icon: CreditCard, screen: 'FinanceManagement', color: ['#8B5CF6', '#6D28D9'] },
];

export default function LoansScreen({ navigation }) {
  const { isDarkMode } = useTheme();

  const renderLoanOption = ({ title, icon: Icon, screen, color }) => (
    <TouchableOpacity
      key={title}
      style={styles.buttonContainer}
      onPress={() => navigation.navigate(screen)}
    >
      <LinearGradient
        colors={color}
        style={styles.button}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <View style={styles.buttonContent}>
          <Icon color="#FFFFFF" size={24} />
          <Text style={styles.buttonText}>{title}</Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );

  return (
    <LinearGradient
      colors={isDarkMode ? ['#1F2937', '#111827'] : ['#F3F4F6', '#E5E7EB']}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={[styles.title, isDarkMode && styles.darkText]}>
          Gestión de Préstamos
        </Text>
        <View style={styles.buttonList}>
          {loanOptions.map(renderLoanOption)}
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
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
  buttonList: {
    gap: 16,
  },
  buttonContainer: {
    width: '100%',
  },
  button: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 16,
    fontFamily: 'Nunito_600SemiBold',
  },
});