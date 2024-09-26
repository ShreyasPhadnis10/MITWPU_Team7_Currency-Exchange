# Currency Exchange Dashboard

This project is a comprehensive currency exchange dashboard that allows users to interact with historical and real-time currency data. It includes custom basket creation, risk indicators, and visual data representation over various time periods.

## Functional Tasks

- [X] **Read and store the data from file**
- [X] **Create a user interface** that allows users to:
  - [X] Select a currency
  - [x] Select the desired duration (weekly, monthly, quarterly, annual charts)
  - [X] Switch between different time frames on the charts
- [x] **Fetch data** for the given currency and time duration
  - [x] Show the trend over the given period
  - [x] Display the date and rate when the currency was at its highest
  - [x] Display the date and rate when the currency was at its lowest
- [x] **Custom Currency Basket**: 
  - [x] Allow users to create and manage custom currency baskets
  - [x] Enable users to define weights for each currency in the basket
  - [x] Calculate and display the aggregate value of the basket against a base currency
- [x] **Risk Indicator**: 
  - [x] Integrate a volatility or risk indicator 
  - [x] Display the fluctuation level between two selected currencies over a specified period

## Optional Tasks

- [X] **Currency Conversion Service/Component**: 
  - [X] Provide FX rates for all currencies based on a selected base currency and current date by integrating Currency API
- [X] **UI Screen**: 
  - [X] Display all currencies along with their short code, description, and current exchange rate against USD
- [X] **Automate Uploading**: 
  - [X] Automate the process of uploading exchange rate data into the database

---

### Technologies Used

- **Frontend**: React.js, Chart.js for interactive visualizations
- **Backend**: FastAPI for RESTful API, MongoDB for data storage
- **Languages**: Python, JavaScript
- **Libraries**: Axios for fetching data, FastAPI for building APIs, Pydantic for data validation
- **Platforms** : VSCode, Jupyter , PyCharm

---

### Team Members
- **Shreyas Phadnis** 
- **Sahil Choudhary** 
- **Shravya Dsouza**  
- **Prathamesh Keskar** 
- **Saket Sontakke**
  
---

### Screenshots
BRL Currency Exchange Rate over 5 years displays low volatility and on the hovered cursor 2012-10-22 the value is 5.7111
![WhatsApp Image 2024-09-26 at 10 43 18](https://github.com/user-attachments/assets/9795acb7-c7aa-442c-b51d-7362ed231a8c)
￼
CLP Currency Exchange Rate over 5 years displays high volatility
![WhatsApp Image 2024-09-26 at 10 41 21](https://github.com/user-attachments/assets/b4b2540e-a928-4a57-93e0-233063b58554)

Currency Basket Analysis
![WhatsApp Image 2024-09-26 at 10 45 29](https://github.com/user-attachments/assets/396774bf-3731-4427-9b26-2673e21072dc)
![WhatsApp Image 2024-09-26 at 10 46 05](https://github.com/user-attachments/assets/17556de3-f36a-4cd6-ad46-d9ccb8289053)
￼
Conversion 
![WhatsApp Image 2024-09-26 at 10 46 45](https://github.com/user-attachments/assets/bba605de-b232-4469-964c-5aeba409ee22)

According to the entered date , the currency exchange values are displayed	
![WhatsApp Image 2024-09-26 at 09 48 12](https://github.com/user-attachments/assets/e3e609da-6f11-493f-8e2f-2daddb0eda84)

Comparision Chart
![WhatsApp Image 2024-09-26 at 10 48 58](https://github.com/user-attachments/assets/ac3b63ec-379d-4b8e-a4c5-39cf771315f9)

---

### Additional Implementation
HeatMap 
![Heatmap](https://github.com/user-attachments/assets/3a794456-9e3f-4294-a469-fa8624ac4191)

---

## Extra Task
 - Pre-processing of Dataset for the year 2023-24. Data Source : IMF
 - Implemented AI/ML RNN model to Predict Currency Exchange with Mean Square Error of 0.089 on DZD prediction
![image](https://github.com/user-attachments/assets/b2df20e9-d031-4975-9187-3597fe6a289d)
![image](https://github.com/user-attachments/assets/a4edd699-49a4-4a49-8a90-54dbb5692e7c)





