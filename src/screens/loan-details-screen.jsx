import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, Alert } from 'react-native';
import { useTheme } from '../context/theme-context';
import { useLoanContext } from '../context/loan-context';
import { useFinanceContext } from '../context/finance-context';
import { LinearGradient } from 'expo-linear-gradient';

export default function LoanDetailsScreen({ route, navigation }) {
  const { loanId } = route.params || {};
  const { isDarkMode } = useTheme();
  const { getLoanById, updateLoanStatus, updateLoanBalance, calculateFee } = useLoanContext();
  const { balance, makePayment } = useFinanceContext();
  const [paymentAmount, setPaymentAmount] = useState('');

  console.log('LoanDetailsScreen - received loanId:', loanId); // Debugging line

  const loan = loanId ? getLoanById(loanId) : null;

  console.log('LoanDetailsScreen - fetched loan:', loan); // Debugging line

  if (!loan) {
    return (
      <LinearGradient
        colors={isDarkMode ? ['#1F2937', '#111827'] : ['#F3F4F6', '#E5E7EB']}
        className="flex-1 justify-center items-center"
      >
        <Text className={`text-lg ${isDarkMode ? 'text-white' : 'text-black'}`}>
          Préstamo no encontrado (ID: {loanId || 'No ID provided'})
        </Text>
      </LinearGradient>
    );
  }

  const handleApprove = () => {
    updateLoanStatus(loanId, 'approved');
    navigation.goBack();
  };

  const handleReject = () => {
    updateLoanStatus(loanId, 'rejected');
    navigation.goBack();
  };

  const handlePayment = () => {
    const amount = parseFloat(paymentAmount);
    if (amount > 0 && amount <= balance) {
      if (amount > loan.remainingBalance) {
        Alert.alert('Error', 'El monto del pago no puede ser mayor que el saldo restante del préstamo.');
        return;
      }
      if (makePayment(amount, loanId, 'Pago de préstamo')) {
        updateLoanBalance(loanId, amount);
        setPaymentAmount('');
        Alert.alert('Éxito', 'Pago realizado con éxito');
      }
    } else {
      Alert.alert('Error', 'Fondos insuficientes o monto inválido');
    }
  };

  const handlePayFee = () => {
    const fee = calculateFee(loan);
    if (fee <= balance) {
      if (makePayment(fee, loanId, 'Pago de cuota')) {
        Alert.alert('Éxito', 'Cuota pagada con éxito');
      }
    } else {
      Alert.alert('Error', 'Fondos insuficientes para pagar la cuota');
    }
  };

  return (
    <LinearGradient
      colors={isDarkMode ? ['#1F2937', '#111827'] : ['#F3F4F6', '#E5E7EB']}
      className="flex-1"
    >
      <ScrollView className="flex-1 p-5">
        <Text className="text-2xl font-bold text-center mb-8 font-nunito-bold text-gray-800 dark:text-gray-200">
          Detalles del Préstamo
        </Text>
        
        <View className={`p-4 rounded-lg mb-4 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <Text className={`text-lg font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-black'}`}>
            Monto: ${loan.amount}
          </Text>
          <Text className={`mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Saldo restante: ${loan.remainingBalance.toFixed(2)}
          </Text>
          <Text className={`mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Plazo: {loan.term} meses
          </Text>
          <Text className={`mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Tipo de Interés: {loan.interestType}
          </Text>
          <Text className={`mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Tasa de Interés: {loan.interestRate}%
          </Text>
          <Text className={`mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Próximo pago: {loan.nextPaymentDue.toLocaleDateString()}
          </Text>
          <Text className={`font-semibold ${
            loan.status === 'approved' ? 'text-green-500' :
            loan.status === 'rejected' ? 'text-red-500' :
            'text-yellow-500'
          }`}>
            Estado: {
              loan.status === 'approved' ? 'Aprobado' :
              loan.status === 'rejected' ? 'Rechazado' :
              'Pendiente'
            }
          </Text>
        </View>
        
        {loan.status === 'pending' && (
          <View className="flex-row justify-around mt-4 mb-4">
            <TouchableOpacity
              onPress={handleApprove}
              className="bg-green-500 py-3 px-6 rounded-lg"
            >
              <Text className="text-white text-center font-semibold font-nunito">Aprobar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleReject}
              className="bg-red-500 py-3 px-6 rounded-lg"
            >
              <Text className="text-white text-center font-semibold font-nunito">Rechazar</Text>
            </TouchableOpacity>
          </View>
        )}

        {loan.status === 'approved' && (
          <View className="mt-4">
            <Text className={`text-lg font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-black'}`}>
              Realizar Pago
            </Text>
            <View className="flex-row mb-4">
              <TextInput
                value={paymentAmount}
                onChangeText={setPaymentAmount}
                placeholder="Monto a pagar"
                keyboardType="numeric"
                className={`flex-1 p-2 rounded-l-lg ${
                  isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'
                }`}
              />
              <TouchableOpacity
                onPress={handlePayment}
                className="bg-blue-500 p-2 rounded-r-lg"
              >
                <Text className="text-white font-semibold">Pagar</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={handlePayFee}
              className="bg-green-500 p-2 rounded-lg"
            >
              <Text className="text-white text-center font-semibold">
                Pagar Cuota (${calculateFee(loan)})
              </Text>
            </TouchableOpacity>
          </View>
        )}

        <Text className={`mt-4 text-center ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          Saldo disponible: ${balance.toFixed(2)}
        </Text>
      </ScrollView>
    </LinearGradient>
  );
}