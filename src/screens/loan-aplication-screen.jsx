import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useTheme } from '../context/theme-context';
import { useLoanContext } from '../context/loan-context';
import { Picker } from '@react-native-picker/picker';
import { LinearGradient } from 'expo-linear-gradient';

const interestTypes = [
  { label: 'Interés Simple', value: 'simple' },
  { label: 'Interés Compuesto', value: 'compound' },
  { label: 'Gradiente', value: 'gradient' },
  { label: 'Amortización', value: 'amortization' },
];

export default function LoanApplicationScreen({ navigation }) {
  const { isDarkMode } = useTheme();
  const { addLoanApplication } = useLoanContext();
  const [amount, setAmount] = useState('');
  const [term, setTerm] = useState('');
  const [interestType, setInterestType] = useState('');
  const [interestRate, setInterestRate] = useState('');

  const handleSubmit = () => {
    const newApplication = {
      amount: parseFloat(amount),
      term: parseInt(term),
      interestType,
      interestRate: parseFloat(interestRate),
    };
    addLoanApplication(newApplication);
    navigation.navigate('LoanManagement');
  };

  return (
    <LinearGradient
      colors={isDarkMode ? ['#1F2937', '#111827'] : ['#F3F4F6', '#E5E7EB']}
      className="flex-1"
    >
      <ScrollView className="flex-1 p-5">
        <Text className="text-2xl font-bold text-center mb-8 font-nunito-bold text-gray-800 dark:text-gray-200">
          Solicitud de Préstamo
        </Text>
        
        <View className="mb-4">
          <Text className="text-gray-700 dark:text-gray-300 mb-2 font-nunito">Monto del Préstamo</Text>
          <TextInput
            value={amount}
            onChangeText={setAmount}
            keyboardType="numeric"
            placeholder="Ingrese el monto"
            className={`border rounded-md p-2 ${isDarkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-black border-gray-300'}`}
          />
        </View>
        
        <View className="mb-4">
          <Text className="text-gray-700 dark:text-gray-300 mb-2 font-nunito">Plazo (en meses)</Text>
          <TextInput
            value={term}
            onChangeText={setTerm}
            keyboardType="numeric"
            placeholder="Ingrese el plazo"
            className={`border rounded-md p-2 ${isDarkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-black border-gray-300'}`}
          />
        </View>
        
        <View className="mb-4">
          <Text className="text-gray-700 dark:text-gray-300 mb-2 font-nunito">Tipo de Interés</Text>
          <View className={`border rounded-md ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}>
            <Picker
              selectedValue={interestType}
              onValueChange={(itemValue) => setInterestType(itemValue)}
              style={{ color: isDarkMode ? 'white' : 'black' }}
            >
              <Picker.Item label="Seleccione el tipo de interés" value="" />
              {interestTypes.map((type) => (
                <Picker.Item key={type.value} label={type.label} value={type.value} />
              ))}
            </Picker>
          </View>
        </View>
        
        <View className="mb-8">
          <Text className="text-gray-700 dark:text-gray-300 mb-2 font-nunito">Tasa de Interés (%)</Text>
          <TextInput
            value={interestRate}
            onChangeText={setInterestRate}
            keyboardType="numeric"
            placeholder="Ingrese la tasa de interés"
            className={`border rounded-md p-2 ${isDarkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-black border-gray-300'}`}
          />
        </View>
        
        <TouchableOpacity 
          onPress={handleSubmit} 
          className="bg-blue-500 py-3 rounded-lg"
        >
          <Text className="text-white text-center font-semibold font-nunito">Enviar Solicitud</Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
}