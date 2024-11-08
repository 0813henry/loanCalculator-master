import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useTheme } from '../context/theme-context';

export default function TransactionList({ transactions }) {
  const { isDarkMode } = useTheme();

  const renderTransaction = ({ item }) => (
    <View style={[styles.transactionItem, isDarkMode && styles.darkTransactionItem]}>
      <Text style={[styles.transactionType, isDarkMode && styles.darkText]}>{item.type}</Text>
      <Text style={[
        styles.transactionAmount,
        item.amount >= 0 ? styles.positiveAmount : styles.negativeAmount,
        isDarkMode && styles.darkText
      ]}>
        {item.amount >= 0 ? '+' : '-'}${Math.abs(item.amount).toFixed(2)}
      </Text>
      <Text style={[styles.transactionDate, isDarkMode && styles.darkSubText]}>
        {new Date(item.date).toLocaleDateString()}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={[styles.title, isDarkMode && styles.darkText]}>Transacciones Recientes</Text>
      <FlatList
        data={transactions}
        renderItem={renderTransaction}
        keyExtractor={item => item.id}
        style={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    fontFamily: 'Nunito_700Bold',
  },
  list: {
    flex: 1,
  },
  transactionItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  darkTransactionItem: {
    backgroundColor: '#374151',
  },
  transactionType: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    fontFamily: 'Nunito_600SemiBold',
  },
  transactionAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Nunito_700Bold',
  },
  positiveAmount: {
    color: '#10B981',
  },
  negativeAmount: {
    color: '#EF4444',
  },
  transactionDate: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 5,
    fontFamily: 'Nunito_400Regular',
  },
  darkText: {
    color: '#FFFFFF',
  },
  darkSubText: {
    color: '#9CA3AF',
  },
});