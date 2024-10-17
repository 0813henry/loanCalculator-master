import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useTheme } from '../context/theme-context';
import { calculateUVR, formatDate } from '../utils/uvr';

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

export default function UVRScreen() {
  const { isDarkMode } = useTheme();
  const [lastUVR, setLastUVR] = useState('');
  const [inflation, setInflation] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartDate, setShowStartDate] = useState(false);
  const [showEndDate, setShowEndDate] = useState(false);
  const [results, setResults] = useState([]);

  const handleCalculate = () => {
    if (!lastUVR || !inflation) {
      Alert.alert('Error', 'Por favor, rellene todos los campos');
      return;
    }

    const calculatedResults = calculateUVR(
      parseFloat(lastUVR),
      parseFloat(inflation) / 100,
      startDate,
      endDate
    );

    // Formatear los resultados de UVR antes de guardarlos
    const formattedResults = calculatedResults.map(result => ({
      ...result,
      uvr: formatNumber(result.uvr), // Formatear el valor de UVR
    }));

    setResults(formattedResults);
  };

  const renderInput = (label, value, setValue, isDate = false) => (
    <View className="mb-4">
      <Text className={`mb-2 ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>{label}</Text>
      {isDate ? (
        <TouchableOpacity
          onPress={() => label.includes('Start') ? setShowStartDate(true) : setShowEndDate(true)}
          className={`p-2 rounded-md ${isDarkMode ? 'bg-gray-700' : 'bg-white'}`}
        >
          <Text className={isDarkMode ? 'text-white' : 'text-gray-700'}>
            {formatDate(label.includes('Start') ? startDate : endDate)}
          </Text>
        </TouchableOpacity>
      ) : (
        <TextInput
          className={`p-2 rounded-md ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-700'}`}
          value={value}
          onChangeText={setValue}
          keyboardType="numeric"
        />
      )}
    </View>
  );

  return (
    <ScrollView className={`flex-1 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <View className="p-4">
        <Text className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
          UVR Calculator
        </Text>

        {renderInput('Último UVR', lastUVR, setLastUVR)}
        {renderInput('Inflación (%)', inflation, setInflation)}
        {renderInput('Fecha de inicio', startDate, setStartDate, true)}
        {renderInput('Fecha de finalización', endDate, setEndDate, true)}

        <TouchableOpacity
          className={`p-4 rounded-md ${isDarkMode ? 'bg-blue-600' : 'bg-blue-500'}`}
          onPress={handleCalculate}
        >
          <Text className="text-white text-center font-bold">Calcular</Text>
        </TouchableOpacity>

        {results.length > 0 && (
          <View className="mt-4">
            <Text className={`text-lg font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              UVR Values
            </Text>
            <ScrollView horizontal>
              <View>
                <View className="flex-row bg-gray-200">
                  <Text className="font-bold p-2 w-16 text-center">Dia</Text>
                  <Text className="font-bold p-2 w-32 text-center">Fecha</Text>
                  <Text className="font-bold p-2 w-32 text-center">UVR</Text>
                </View>
                {results.map((row, index) => (
                  <View key={index} className={`flex-row ${index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}`}>
                    <Text className="p-2 w-16 text-center">{row.day}</Text>
                    <Text className="p-2 w-32 text-center">{row.date}</Text>
                    <Text className="p-2 w-32 text-center">{row.uvr}</Text>
                  </View>
                ))}
              </View>
            </ScrollView>
          </View>
        )}

        {showStartDate && (
          <DateTimePicker
            value={startDate}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              setShowStartDate(false);
              if (selectedDate) setStartDate(selectedDate);
            }}
          />
        )}

        {showEndDate && (
          <DateTimePicker
            value={endDate}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              setShowEndDate(false);
              if (selectedDate) setEndDate(selectedDate);
            }}
          />
        )}
      </View>
    </ScrollView>
  );
}
