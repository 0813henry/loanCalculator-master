import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useTheme } from '../context/theme-context';
import { calculateAmortization, calculateTotalInterest, calculateTotalPayments } from '../utils/amortization';

const amortizationSystems = [
  { label: 'Frances', value: 'french' },
  { label: 'Aleman', value: 'german' },
  { label: 'Americano', value: 'american' },
];

// Función para darle formato a los números con separador de miles y decimales
const formatNumber = (number) => {
  if (!number) return '';
  
  // Convertimos el número en string con dos decimales
  const formattedNumber = parseFloat(number).toFixed(2);

  // Separamos la parte entera y decimal
  const [integerPart, decimalPart] = formattedNumber.split('.');

  // Formateamos la parte entera con separador de miles
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

  // Retornamos el número con coma como separador decimal
  return `${formattedInteger},${decimalPart}`;
};

export default function AmortizationScreen() {
  const { isDarkMode } = useTheme();
  const [system, setSystem] = useState('french');
  const [loanValue, setLoanValue] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [paymentFrequency, setPaymentFrequency] = useState('');
  const [numberOfPeriods, setNumberOfPeriods] = useState('');
  const [amortizationTable, setAmortizationTable] = useState([]);
  const [totalInterest, setTotalInterest] = useState('');
  const [totalPayments, setTotalPayments] = useState('');

  const handleCalculate = () => {
    if (!loanValue || !interestRate || !paymentFrequency || !numberOfPeriods) {
      Alert.alert('Error', 'Por favor, rellene todos los campos');
      return;
    }

    try {
      const table = calculateAmortization(system, loanValue, interestRate, paymentFrequency, numberOfPeriods);
      setAmortizationTable(table);
      setTotalInterest(calculateTotalInterest(table));
      setTotalPayments(calculateTotalPayments(table));
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const renderInput = (label, value, setValue) => (
    <View className="mb-4">
      <Text className={`mb-2 ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>{label}</Text>
      <TextInput
        className={`p-2 rounded-md ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-700'}`}
        value={value}
        onChangeText={setValue}
        keyboardType="numeric"
      />
    </View>
  );

  return (
    <ScrollView className={`flex-1 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <View className="p-4">
        <Text className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
        Calculadora de amortización
        </Text>
        
        <View className="mb-4">
          <Text className={`mb-2 ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>Sistema de amortización</Text>
          <View className={`border rounded-md ${isDarkMode ? 'border-gray-600' : 'border-gray-300'}`}>
            <Picker
              selectedValue={system}
              onValueChange={(itemValue) => setSystem(itemValue)}
              style={{ color: isDarkMode ? 'white' : 'black' }}
            >
              {amortizationSystems.map((option) => (
                <Picker.Item key={option.value} label={option.label} value={option.value} />
              ))}
            </Picker>
          </View>
        </View>

        {renderInput('Valor del préstamo', loanValue, setLoanValue)}
        {renderInput('Tasa de interés (%)', interestRate, setInterestRate)}
        {renderInput('Frecuencia de pago (por año)', paymentFrequency, setPaymentFrequency)}
        {renderInput('Número de periodos', numberOfPeriods, setNumberOfPeriods)}

        <TouchableOpacity
          className={`p-4 rounded-md ${isDarkMode ? 'bg-blue-600' : 'bg-blue-500'}`}
          onPress={handleCalculate}
        >
          <Text className="text-white text-center font-bold">Calcular</Text>
        </TouchableOpacity>

        {amortizationTable.length > 0 && (
          <View className="mt-4">
            <Text className={`text-lg font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              Tabla de amortización
            </Text>
            <ScrollView horizontal>
              <View>
                <View className="flex-row bg-gray-200">
                  <Text className="font-bold p-2 w-16 text-center">Período</Text>
                  <Text className="font-bold p-2 w-24 text-center">Pago</Text>
                  <Text className="font-bold p-2 w-24 text-center">Principal</Text>
                  <Text className="font-bold p-2 w-24 text-center">Interés</Text>
                  <Text className="font-bold p-2 w-24 text-center">Balance</Text>
                </View>
                {amortizationTable.map((row, index) => (
                  <View key={index} className={`flex-row ${index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}`}>
                    <Text className="p-2 w-16 text-center">{row.period}</Text>
                    <Text className="p-2 w-24 text-center">{formatNumber(row.payment)}</Text>
                    <Text className="p-2 w-24 text-center">{formatNumber(row.principal)}</Text>
                    <Text className="p-2 w-24 text-center">{formatNumber(row.interest)}</Text>
                    <Text className="p-2 w-24 text-center">{formatNumber(row.balance)}</Text>
                  </View>
                ))}
              </View>
            </ScrollView>
            <View className="mt-4">
              <Text className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                Interés total: {formatNumber(totalInterest)}
              </Text>
              <Text className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                Pagos totales: {formatNumber(totalPayments)}
              </Text>
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
}
