import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useTheme } from '../context/theme-context';
import { useLoanContext } from '../context/loan-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Picker } from '@react-native-picker/picker';

export default function LoanManagementScreen({ navigation }) {
  const { isDarkMode } = useTheme();
  const { loanApplications } = useLoanContext();
  const [statusFilter, setStatusFilter] = useState('all');

  console.log('LoanManagementScreen - all loans:', loanApplications); // Debugging line

  const filteredLoans = loanApplications.filter(loan => 
    statusFilter === 'all' || loan.status === statusFilter
  );

  const renderLoanApplication = ({ item }) => (
    <TouchableOpacity
      className={`p-4 mb-4 rounded-lg ${
        isDarkMode ? 'bg-gray-800' : 'bg-white'
      }`}
      onPress={() => {
        console.log('Navigating to LoanDetails with id:', item.id); // Debugging line
        navigation.navigate('LoanDetails', { loanId: item.id });
      }}
    >
      <Text className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-black'}`}>
        Monto: ${item.amount}
      </Text>
      <Text className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
        Plazo: {item.term} meses
      </Text>
      <Text className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
        Tipo de Interés: {item.interestType}
      </Text>
      <Text className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
        Tasa de Interés: {item.interestRate}%
      </Text>
      <Text className={`mt-2 font-semibold ${
        item.status === 'approved' ? 'text-green-500' :
        item.status === 'rejected' ? 'text-red-500' :
        'text-yellow-500'
      }`}>
        Estado: {item.status === 'approved' ? 'Aprobado' : item.status === 'rejected' ? 'Rechazado' : 'Pendiente'}
      </Text>
    </TouchableOpacity>
  );

  return (
    <LinearGradient
      colors={isDarkMode ? ['#1F2937', '#111827'] : ['#F3F4F6', '#E5E7EB']}
      className="flex-1"
    >
      <View className="flex-1 p-5">
        <Text className="text-2xl font-bold text-center mb-4 font-nunito-bold text-gray-800 dark:text-gray-200">
          Gestión de Préstamos
        </Text>
        
        <View className={`mb-4 border rounded-md ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}>
          <Picker
            selectedValue={statusFilter}
            onValueChange={(itemValue) => setStatusFilter(itemValue)}
            style={{ color: isDarkMode ? 'white' : 'black' }}
          >
            <Picker.Item label="Todos" value="all" />
            <Picker.Item label="Pendientes" value="pending" />
            <Picker.Item label="Aprobados" value="approved" />
            <Picker.Item label="Rechazados" value="rejected" />
          </Picker>
        </View>
        
        {filteredLoans.length > 0 ? (
          <FlatList
            data={filteredLoans}
            renderItem={renderLoanApplication}
            keyExtractor={item => item.id}
          />
        ) : (
          <Text className={`text-center ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            No hay solicitudes de préstamo que coincidan con el filtro.
          </Text>
        )}
      </View>
    </LinearGradient>
  );
}