import dateFormat, { masks } from "dateformat";

function GetTime(date) {
  var hours = parseInt(dateFormat(date, "hh"));
  var minutes = parseInt(dateFormat(date, "MM"));
  var ampm = hours >= 12 ? "AM" : "PM";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  var strTime = hours + ":" + minutes + " " + ampm;
  return strTime;
}

const PdfCode = (
  name,
  Address,
  Mobile_No,
  Quantity,
  Invoice,
  Product,
  Total,
  ReceivedBalance,
  PaymentType,
  RemainingBalance
) => `
<html>

<head>
    <meta name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
</head>

<body>
    <div style="min-height: auto;
    width: 100%;
    height : 97vh;
    border: solid 2px #000;">
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
                        +91 8208553219<br />
                        +91 9309780761
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
        <hr />


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
                    Bill To : <br />
                    Name : ${name} <br />
                    Address : ${Address} <br />
                    Phone No : +91 ${Mobile_No}
                </p>
            </div>
            <div style="align-items: flex-end;">
                <p>Invoice No : ${Invoice}<br />
                    Date : ${dateFormat(Date.now(), "dd-mm-yyyy")}<br />
                    Time :${GetTime(new Date())}</p>
                <br />
            </div>
        </div>
        <hr />
        <hr />
        <div style="height: auto;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;">
            <table style="width:100%; border-collapse: collapse;">
                <tr style="background-color: rgba(255, 0, 62, 0.8); color: white;">
                    <th style="height: 30px;">#</th>
                    <th style="height: 30px;">Item Name</th>
                    <th style="height: 30px;">Meter</th>
                    <th style="height: 30px;">Stitch Rate<br>QAR</th>
                    <th style="height: 30px;">Metrial Rate<br>QAR</th>
                    <th style="height: 30px;">Total<br>Amount</th>
                </tr>
                <!-- Item	Quantity	Meter	Stitch QAR	Metrial QAR	Amount -->
                <tr style="background-color: rgba(246, 221, 178, 0.8);">
                    <td style="text-align: center;height: 30px;">1</td>
                    <td style="text-align: center;height: 30px;">${Product}</td>
                    <td style="text-align: center;height: 30px;">${parseFloat(
                        parseFloat(Total) / parseFloat(Quantity)
                        ).toFixed(2)}</td>
                    <td style="text-align: center;height: 30px;">${Quantity}</td>
                    <td style="text-align: center;height: 30px;">${Quantity}</td>
                    <td style="text-align: center;height: 30px;">₹ ${Total}</td>
                </tr>

            </table>

            <div style="align-self: flex-end;margin-right: 10px;font-style: bold;">Received balance : 1</div>

            <hr />
            <div style="align-self: flex-end;margin-right: 10px;font-style: bold;">Grand Total : 1</div>
            <hr />
            <div style="align-self: flex-end;margin-right: 10px;font-style: bold;">Payment Mode : Cash</div>
            <hr />
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
        <hr />
        <hr />
        <div style="height:auto; padding: 20px;">

            <p>Account Details - <br />
                Bank Name: HDFC BANK, CHHINDWARA<br />
                Bank Account no : 1234567890<br />
                Bank IFSC code : HDFC01234567<br />
            </p>

        </div>

    </div>
</body>

</html>
`;

const style = `
    .container {
      margin : 15px;
      border : solid 2px #000
    }
`;

export { PdfCode };