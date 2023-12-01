// src/components/InvoicePrint.js

import React, {useEffect} from 'react';
import RNPrint from 'react-native-print';

import {Text, View, } from 'react-native';

export default function InvoicePrint({invoiceDetails}) {
  useEffect(() => {
    // Call the print function when the component mounts
    printHTML();
  }, []); // Empty dependency array ensures the effect runs only once

  // Parse details
  const customer = JSON.parse(invoiceDetails.customer_details);
  const billing = JSON.parse(invoiceDetails.billing_details);
  const selectedItems = JSON.parse(invoiceDetails.products_details);

  // Extracting order details
  const orderId = invoiceDetails.order_id;
  const orderStatus = invoiceDetails.order_status;
  const orderDate = new Date(invoiceDetails.order_date).toLocaleDateString();
  const deliveryDate = new Date(
    invoiceDetails.delivery_date,
  ).toLocaleDateString();
  const deliveryStatus = invoiceDetails.delivery_status;

  console.log('Customer:', customer);
  console.log('Billing:', billing);
  console.log('Selected Items:', selectedItems);
  console.log('Order ID:', orderId);
  console.log('Order Status:', orderStatus);
  console.log('Order Date:', orderDate);
  console.log('Delivery Date:', deliveryDate);
  console.log('Delivery Status:', deliveryStatus);

  //console.warn('invoiceDetails : ', invoiceDetails);
  //   console.log('billing : ', billing);
  //   console.log('selectedItems : ', selectedItems);

  const printHTML = async () => {
    // Your HTML content goes here

    const selectedItemsHTML = selectedItems
      .map(
        (item, index) => `
      <tr style="background-color: rgba(246, 221, 178, 0.8);">
          <td style="text-align: center;height: 30px;">${index + 1}</td>
          <td style="text-align: center;height: 30px;">${item.dress_name}</td>
          <td style="text-align: center;height: 30px;">${item.dress_type}</td>
          <td style="text-align: center;height: 30px;">${item.size}</td>
          <td style="text-align: center;height: 30px;">${item.quantity}</td>
          <td style="text-align: center;height: 30px;">${item.price}</td>
          <td style="text-align: center;height: 30px;">₹ ${item.total}</td>
      </tr>
    `,
      )
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
                      Name : ${customer.name} <br/>
                      <!-- Address : Address <br/> -->
                    Mobile No : +91 ${customer.mobile} <br/>
                    Whatsapp No : +91 ${customer.whatsapp}
                  </p>
              </div>
              <div style="align-items: flex-end;">
                  <p>Order No : ${orderId}<br/>
                  Order Date: : ${orderDate}<br/>
                  Delivery Date: ${deliveryDate}<br/>
                  Delivery Status:  ${deliveryStatus}<br/>
                  </p>--ORIGNAL--</p>
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
                    <td style="text-align: center;height: 30px;">₹ ${billing.total}</td>
                </tr>
                <tr style="border-bottom: solid ;">
                              <th style="text-align: start;">Discount : </th>
                              <td style="text-align: center;height: 30px;">₹ ${billing.discount}</td>
                          </tr>
                          
                          <tr style="border-bottom: solid ;">
                              <th style="text-align: start;">Received Balance : </th>
                              <td style="text-align: center;height: 30px;">₹ ${billing.paid}</td>
                          </tr>
                         
                          <tr style="border-bottom: solid ;">
                          <th style="text-align: start;">Remaining Balance : </th>
                          <td style="text-align: center;height: 30px;">₹ ${billing.balance}</td>
                      </tr>
                          <tr>
                              <th style="text-align: start;">Payment Method: </th>
                              <td style="text-align: center;height: 30px;">${billing.paidmode}</td>
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

  return <View></View>;
}
