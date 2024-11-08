import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../context/theme-context';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  Percent, 
  Calculator, 
  Calendar, 
  TrendingUp, 
  DollarSign, 
  Home, 
  PieChart 
} from 'lucide-react-native';

const calculationTypes = [
  { title: 'Interés Simple', icon: Percent, screen: 'SimpleInterest', color: ['#4F46E5', '#7C3AED'] },
  { title: 'Interés Compuesto', icon: Calculator, screen: 'CompoundInterest', color: ['#10B981', '#059669'] },
  { title: 'Anualidades', icon: Calendar, screen: 'Annuities', color: ['#F59E0B', '#D97706'] },
  { title: 'Gradientes', icon: TrendingUp, screen: 'Gradient', color: ['#8B5CF6', '#6D28D9'] },
  { title: 'Amortización', icon: DollarSign, screen: 'Amortization', color: ['#EF4444', '#DC2626'] },
  { title: 'UVR', icon: Home, screen: 'UVR', color: ['#3B82F6', '#2563EB'] },
  { title: 'TIR', icon: PieChart, screen: 'TIR', color: ['#EC4899', '#DB2777'] },
];

export default function CalculationsScreen({ navigation }) {
  const { isDarkMode } = useTheme();

  const renderCalculationButton = ({ title, icon: Icon, screen, color }) => (
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
          Cálculos Financieros
        </Text>
        <View style={styles.buttonList}>
          {calculationTypes.map(renderCalculationButton)}
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