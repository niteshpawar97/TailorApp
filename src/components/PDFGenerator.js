// src/components/PDFGenerator.js

import React from 'react';
import RNPrint from 'react-native-print';

import { Text, View, TouchableOpacity } from 'react-native';


export default function PDFGenerator({ selectedItems, customer, billing }) {
  const name = customer.name;
  const Address = 'Default Address';
  const Mobile_No = '1234567890';
  
  const Total = billing.paytotal; 
  const discount = billing.discount; 
  const paidmode = billing.paidmode; 
  const paid = billing.paid; 
  const balance = billing.balance; 
  const Invoice = 'IVC00123'; // You can set the default payment type here


  const printHTML = async () => {

  // Your HTML content goes here
  // You can use the selectedItems prop to dynamically generate the table rows

  const selectedItemsHTML = selectedItems
    .map((item, index) => `
      <tr style="background-color: rgba(246, 221, 178, 0.8);">
          <td style="text-align: center;height: 30px;">${index + 1}</td>
          <td style="text-align: center;height: 30px;">${item.dress_name}</td>
          <td style="text-align: center;height: 30px;">${item.dress_type}</td>
          <td style="text-align: center;height: 30px;">${item.size}</td>
          <td style="text-align: center;height: 30px;">${item.quantity}</td>
          <td style="text-align: center;height: 30px;">${item.price}</td>
          <td style="text-align: center;height: 30px;">₹ ${item.total}</td>
      </tr>
    `)
    .join('');

    const htmlContent = `<html>
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
      ">At Post Kamthi Dist Chhindwara MP 480001
                      <p>Mobile No :- <br />
                          +91 1234567890<br />
                          +91 1234567800
                      </p>
                  </div>
              </div>
     
          <img style="
          height: 90px;
      width: 90px;
      margin-right:15px;
          " src="https://i.ibb.co/ZJJZ365/tailorlogo.png" />
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
                  ---- TEST -----</p>
                  <br/>
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
                  <th style="height: 30px;">#</th>
                  <th style="height: 30px;">Item Name</th>
                  <th style="height: 30px;">Type</th>
                  <th style="height: 30px;">Size</th>
                  <th style="height: 30px;">Qty</th>
                  <th style="height: 30px;">Price</th>
                  <th style="height: 30px;">Total<br>Amount</th>
              </tr>
              <!-- Item	Quantity	Meter	Stitch QAR	Metrial QAR	Amount -->
              ${selectedItemsHTML}
          </table>
                
             
                <div style="width:100%;align-self: flex-end; display: flex; flex-direction: row;">
                  <div style="width:40%"></div>
                    <table style="width: 50%; align-self: flex-end;">
                    <tr>
                    <th style="text-align: start;">Grand Total : </th>
                    <td style="text-align: center;height: 30px;">₹ ${Total}</td>
                </tr>
                          <tr style="border-bottom: solid ;">
                              <th style="text-align: start;">Received Balance : </th>
                              <td style="text-align: center;height: 30px;">₹ ${paid}</td>
                          </tr>
                         
                          <tr style="border-bottom: solid ;">
                          <th style="text-align: start;">Remaining Balance : </th>
                          <td style="text-align: center;height: 30px;">₹ ${balance}</td>
                      </tr>
                          <tr>
                              <th style="text-align: start;">Payment Method: </th>
                              <td style="text-align: center;height: 30px;">${paidmode}</td>
                          </tr>
                    </table>
                </div>
          </div>
          <hr/>
          <hr/>
          <div style="height:auto; padding: 20px;">
  
          <p>Account Details - <br />
          Bank Name: HDFC BANK, CHHINDWARA<br />
          Bank Account no : 1234567890<br />
          Bank IFSC code : HDFC01234567<br />
          </p>
  
          </div>
  
      </div>
    </body>
  </html>`;
  await RNPrint.print({
    html: htmlContent,
  });
};

return (
    <View>
      <TouchableOpacity
        style={{
          backgroundColor: 'blue',
          borderRadius: 4,
          paddingVertical: 8,
          paddingHorizontal: 16,
        }}
        onPress={printHTML}
      >
        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}>
          Print Invoice
        </Text>
      </TouchableOpacity>
    </View>
  );
}
