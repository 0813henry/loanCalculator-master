import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { useTheme } from '../context/theme-context';
import { useFinanceContext } from '../context/finance-context';
import { LinearGradient } from 'expo-linear-gradient';

export default function FinanceManagementScreen() {
  const { isDarkMode } = useTheme();
  const { balance, transactions, addFunds } = useFinanceContext();
  const [amount, setAmount] = useState('');

  const handleAddFunds = () => {
    const fundsToAdd = parseFloat(amount);
    if (fundsToAdd > 0) {
      addFunds(fundsToAdd);
      setAmount('');
    }
  };

  const renderTransaction = ({ item }) => (
    <View className={`p-4 mb-2 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
      <Text className={`font-semibold ${isDarkMode ? 'text-white' : 'text-black'}`}>
        {item.type}
      </Text>
      <Text className={`${item.amount >= 0 ? 'text-green-500' : 'text-red-500'}`}>
        {item.amount >= 0 ? '+' : '-'}${Math.abs(item.amount).toFixed(2)}
      </Text>
      <Text className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
        {item.date.toLocaleString()}
      </Text>
    </View>
  );

  return (
    <LinearGradient
      colors={isDarkMode ? ['#1F2937', '#111827'] : ['#F3F4F6', '#E5E7EB']}
      className="flex-1"
    >
      <View className="flex-1 p-5">
        <Text className="text-2xl font-bold text-center mb-4 font-nunito-bold text-gray-800 dark:text-gray-200">
          Gestión Financiera
        </Text>
        
        <View className={`p-4 mb-4 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <Text className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-black'}`}>
            Saldo Actual: ${balance.toFixed(2)}
          </Text>
        </View>
        
        <View className="flex-row mb-4">
          <TextInput
            value={amount}
            onChangeText={setAmount}
            placeholder="Monto a agregar"
            keyboardType="numeric"
            className={`flex-1 p-2 rounded-l-lg ${
              isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'
            }`}
          />
          <TouchableOpacity
            onPress={handleAddFunds}
            className="bg-blue-500 p-2 rounded-r-lg"
          >
            <Text className="text-white font-semibold">Agregar Fondos</Text>
          </TouchableOpacity>
        </View>
        
        <Text className={`text-lg font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-black'}`}>
          Transacciones Recientes
        </Text>
        <FlatList
          data={transactions}
          renderItem={renderTransaction}
          keyExtractor={item => item.id}
        />
      </View>
    </LinearGradient>
  );
}