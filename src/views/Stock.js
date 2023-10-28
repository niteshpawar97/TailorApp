import React, {Component} from 'react';
import {
  AppRegistry,
  Button,
  StyleSheet,
  NativeModules,
  Platform,
  Text,
  View,
} from 'react-native';

import RNHTMLtoPDF from 'react-native-html-to-pdf';
import RNPrint from 'react-native-print';

export default class RNPrintExample extends Component {
  state = {
    selectedPrinter: null,
  };

  // @NOTE iOS Only
  selectPrinter = async () => {
    const selectedPrinter = await RNPrint.selectPrinter({x: 100, y: 100});
    this.setState({selectedPrinter});
  };

  // @NOTE iOS Only
  silentPrint = async () => {
    if (!this.state.selectedPrinter) {
      alert('Must Select Printer First');
    }

    const jobName = await RNPrint.print({
      printerURL: this.state.selectedPrinter.url,
      html: '<h1>Silent Print</h1>',
    });
  };

  async printHTML() {
    const name = 'Rajesh Kumar';
    const Address = 'Default Address';
    const Mobile_No = '1234567890';
    const Product = 'Shirt';
    const Quantity = 5; // You can set the default quantity here
    const Total = 100; // You can set the default total amount here
    const ReceivedBalance = 50; // You can set the default received balance here
    const RemainingBalance = 50; // You can set the default remaining balance here
    const PaymentType = 'Cash'; // You can set the default payment type here
    const Invoice = 'IVC00123'; // You can set the default payment type here

    await RNPrint.print({
      html: `<html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
      </head>
      <body >
        <div style="min-height: auto;
        width: 100%;
        height : 97vh;
        border: solid 2px #000;"  >
        <div style="height: auto;
        width: 100%;
        display: flex;
        flex-direction: row;
        /* padding: 20px; */
        justify-content: space-between;
        align-items: center;">
        <div class="data-title">
            <div style="display: flex;
            flex-direction: column;
            align-items: flex-start;
            font-size: 2rem;  
            padding-left: 20px;">NIKET GROUP<br></div>
        <div style="
        display: flex;
        flex-direction: column;
        align-items: flex-start; 
        padding-left: 20px;
        ">At Post Kamthi <br> Dist Chhindwara MP 480001</div>
        </div>
       
            <img style="
            height: 90px;
        width: 90px;
        margin-right:15px;
            " src="https://i.ibb.co/Rv9KpGf/logo.png" />
        </div>
        <hr />
            <hr/>
    
    
            <div style="
            width: 100%;
            height: auto;
            padding: 15px;
            display: flex;
            flex-direction: row;
            justify-content: space-evenly;
            ">
                <div style="
                width: 50%;
                align-items: flex-start;
                ">
                    <p class="invoice-user">
                        Bill To : <br/>
                        Name : ${name} <br/>
                        Address : ${Address} <br/>
                        Phone No : +91 ${Mobile_No}
                    </p>
                </div>
                <div style="align-items: flex-end;">
                    <p>Invoice No : ${Invoice}<br/>
                    Date : 28-10-2023<br/>
                    Time :11:30 AM</p>
                    <br/>
                    <br/>
                    <p>Mobile No :- <br/>
                    +91 8208553219<br/>
                    +91 9309780761
                    </p>
                </div>
            </div>
            <hr/>
            <hr/>
            <div style="height: auto;
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;">
                <table style="width:100%; border-collapse: collapse;">
                    <tr style="background-color: rgba(255, 0, 62, 0.8); color: white;">
                      <th style="height: 30px;">Index</th>
                      <th style="height: 30px;">Product Name</th>
                      <th style="height: 30px;">Price(Per)</th>
                      <th style="height: 30px;">Bras</th>
                      <th style="height: 30px;">Total</th>
                    </tr>
                    <tr style="background-color: rgba(246, 221, 178, 0.8);">
                      <td style="text-align: center;height: 30px;">1</td>
                      <td style="text-align: center;height: 30px;">${Product}</td>
                      <td style="text-align: center;height: 30px;">${parseFloat(
                        parseFloat(Total) / parseFloat(Quantity),
                      ).toFixed(2)}</td>
                      <td style="text-align: center;height: 30px;">${Quantity}</td>
                      <td style="text-align: center;height: 30px;">₹ ${Total}</td>
                    </tr>
                   
                  </table>
                  
                    <!-- <div style="align-self: flex-end;margin-right: 10px;font-style: bold;">Received balance :  1</div>
              
                  <hr/>
                  <div style="align-self: flex-end;margin-right: 10px;font-style: bold;">Grand Total : 1</div>
                  <hr/>
                  <div style="align-self: flex-end;margin-right: 10px;font-style: bold;">Payment Mode : Cash</div>
                  <hr/> -->
                  <div style="width:100%;align-self: flex-end; display: flex; flex-direction: row;">
                    <div style="width:40%"></div>
                      <table style="width: 50%; align-self: flex-end;">
                      <tr>
                      <th style="text-align: start;">Grand Total : </th>
                      <td style="text-align: center;height: 30px;">₹ ${Total}</td>
                  </tr>
                            <tr style="border-bottom: solid ;">
                                <th style="text-align: start;">Received Balance : </th>
                                <td style="text-align: center;height: 30px;">₹ ${ReceivedBalance}</td>
                            </tr>
                           
                            <tr style="border-bottom: solid ;">
                            <th style="text-align: start;">Remaining Balance : </th>
                            <td style="text-align: center;height: 30px;">₹ ${RemainingBalance}</td>
                        </tr>
                            <tr>
                                <th style="text-align: start;">Payment Method: </th>
                                <td style="text-align: center;height: 30px;">${PaymentType}</td>
                            </tr>
                      </table>
                  </div>
            </div>
            <hr/>
            <hr/>
            <div style="height:auto; padding: 20px;">
    
                <p>Account Details - <br/>
                Bank Name: HDFC BANK, DHANGARWADI<br/>
                Bank Account no : 50100272967118<br/>
                Bank IFSC code : HDFC0004850<br/>
                </p>
    
            </div>
    
        </div>
      </body>
    </html>`,
    });
  }

  async printPDF() {
    const results = await RNHTMLtoPDF.convert({
      html: '<h1>Custom converted PDF Document</h1>',
      fileName: 'test',
      base64: true,
    });

    await RNPrint.print({filePath: results.filePath});
  }

  async printRemotePDF() {
    await RNPrint.print({
      filePath: 'https://graduateland.com/api/v2/users/jesper/cv',
    });
  }

  customOptions = () => {
    return (
      <View>
        {this.state.selectedPrinter && (
          <View>
            <Text>{`Selected Printer Name: ${this.state.selectedPrinter.name}`}</Text>
            <Text>{`Selected Printer URI: ${this.state.selectedPrinter.url}`}</Text>
          </View>
        )}
        <Button onPress={this.selectPrinter} title="Select Printer" />
        <Button onPress={this.silentPrint} title="Silent Print" />
      </View>
    );
  };

  render() {
    return (
      <View classname="flex-col">
        {Platform.OS === 'ios' && this.customOptions()}
        <Button onPress={this.printHTML} title="Print HTML" />
        <Button onPress={this.printPDF} title="Print PDF" />
        <Button onPress={this.printRemotePDF} title="Print Remote PDF" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});
