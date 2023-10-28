import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const InvoiceScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>Phone: 7799554467</Text>
        <Text style={styles.infoText}>OrderID: 1013876150</Text>
        <Text style={styles.infoText}>Ordered Date: 2023-10-27</Text>
        <Text style={styles.infoText}>Delivery Date: 2023-10-27</Text>
        <Text style={styles.infoText}>Customer: Sunita Pawar</Text>
      </View>
      <View style={styles.tableContainer}>
        <View style={styles.tableHeader}>
          <Text style={styles.headerText}>Item</Text>
          <Text style={styles.headerText}>Quantity</Text>
          <Text style={styles.headerText}>Meter</Text>
          <Text style={styles.headerText}>Stitch</Text>
          <Text style={styles.headerText}>Material/Items QAR</Text>
          <Text style={styles.headerText}>Amount</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.cellText}>Coat suit</Text>
          <Text style={styles.cellText}>1</Text>
          <Text style={styles.cellText}>0</Text>
          <Text style={styles.cellText}>0</Text>
          <Text style={styles.cellText}>10 QAR</Text>
          <Text style={styles.cellText}>10 QAR</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.cellText}>SHIRTS</Text>
          <Text style={styles.cellText}>1</Text>
          <Text style={styles.cellText}>3</Text>
          <Text style={styles.cellText}>10</Text>
          <Text style={styles.cellText}>30 QAR</Text>
          <Text style={styles.cellText}>40 QAR</Text>
        </View>
      </View>
      <View style={styles.summaryContainer}>
        <Text style={styles.summaryText}>Total: 50 QAR</Text>
        <Text style={styles.summaryText}>Discount: 0 QAR</Text>
        <Text style={styles.summaryText}>Cash Card Pay Total: 50 QAR</Text>
        <Text style={styles.summaryText}>Paid: 0</Text>
        <Text style={styles.summaryText}>Balance: 50 QAR</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Print Bill</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Print Order</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Done</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  infoContainer: {
    marginTop: 20,
  },
  infoText: {
    fontSize: 16,
    marginBottom: 5,
    color: 'black',
  },
  tableContainer: {
    marginTop: 20,
    borderColor: 'black',
    borderWidth: 1,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    padding: 10,
  },
  headerText: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
  },
  tableRow: {
    flexDirection: 'row',
    padding: 10,
  },
  cellText: {
    flex: 1,
    textAlign: 'center',
    color: 'black',
  },
  summaryContainer: {
    marginTop: 20,
  },
  summaryText: {
    fontSize: 16,
    marginBottom: 5,
    color: 'black',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    flex: 1,
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    margin: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default InvoiceScreen;
