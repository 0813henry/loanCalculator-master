import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useTheme } from '../context/theme-context';
import { useFinanceContext } from '../context/finance-context';
import { LinearGradient } from 'expo-linear-gradient';
import BalanceWidget from '../components/balance-widget';
import TransactionList from '../components/transaction-list'

export default function HomeScreen() {
  const { isDarkMode } = useTheme();
  const { balance, transactions } = useFinanceContext();

  return (
    <LinearGradient
      colors={isDarkMode ? ['#1F2937', '#111827'] : ['#F3F4F6', '#E5E7EB']}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={[styles.title, isDarkMode && styles.darkText]}>
          Resumen Financiero
        </Text>
        <BalanceWidget balance={balance} />
        <TransactionList transactions={transactions} />
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: 'Nunito_700Bold',
  },
  darkText: {
    color: '#FFFFFF',
  },
});