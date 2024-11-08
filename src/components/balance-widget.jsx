import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../context/theme-context';

export default function BalanceWidget({ balance }) {
  const { isDarkMode } = useTheme();

  const formatCurrency = (amount) => {
    return amount.toLocaleString('es-CO', { style: 'currency', currency: 'COP' });
  };

  return (
    <View style={[styles.container, isDarkMode && styles.darkContainer]}>
      <Text style={[styles.label, isDarkMode && styles.darkText]}>Saldo Actual</Text>
      <Text style={[styles.balance, isDarkMode && styles.darkText]}>
        {formatCurrency(balance)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  darkContainer: {
    backgroundColor: '#374151',
  },
  label: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 5,
    fontFamily: 'Nunito_600SemiBold',
  },
  balance: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#10B981',
    fontFamily: 'Nunito_700Bold',
  },
  darkText: {
    color: '#FFFFFF',
  },
});