from pymongo import MongoClient
from datetime import datetime

# Replace with your MongoDB connection string
client = MongoClient("mongodb://localhost:27017/")

# Access the database and collection
db = client["nt_hackathon"]
collection = db["currency_exchange"]

# Selected currency by the user
selected_currency = "Algerian dinar (DZD)"  # Example currency, replace with user input if needed


def query_currency_exchange(start_date, end_date, selected_currency):
    """
    Function to query currency exchange rates for the selected date range
    :param start_date: The start date for the query
    :param end_date: The end date for the query
    :param selected_currency: The currency field to project
    """
    # MongoDB aggregation pipeline
    pipeline = [
        {
            "$match": {
                "Date": {
                    "$gte": start_date,
                    "$lte": end_date
                }
            }
        },
        {
            "$project": {
                "Date": 1,  # Include the date field
                selected_currency: 1  # Include the selected currency field
            }
        },
        {
            "$sort": {
                "Date": 1  # Sort by Date in ascending order
            }
        }
    ]

    # Fetching results using aggregation
    results = collection.aggregate(pipeline)

    # Printing results
    for record in results:
        print(record)


# Query for yearly data
def fetch_yearly_data():
    # Define the date range for the year (e.g., 2024)
    start_date = datetime(2024, 1, 1)   # 1st January 2024
    end_date = datetime(2024, 12, 31)   # 31st December 2024

    print(f"Fetching yearly data for {selected_currency} from {start_date} to {end_date}...\n")
    query_currency_exchange(start_date, end_date, selected_currency)


# Query for 2-year data
def fetch_two_year_data():
    # Define the date range for two years (e.g., 2023-2024)
    start_date = datetime(2023, 1, 1)   # 1st January 2023
    end_date = datetime(2024, 12, 31)   # 31st December 2024

    print(f"Fetching 2-year data for {selected_currency} from {start_date} to {end_date}...\n")
    query_currency_exchange(start_date, end_date, selected_currency)


# Query for 5-year data
def fetch_five_year_data():
    # Define the date range for five years (e.g., 2020-2024)
    start_date = datetime(2020, 1, 1)   # 1st January 2020
    end_date = datetime(2024, 12, 31)   # 31st December 2024

    print(f"Fetching 5-year data for {selected_currency} from {start_date} to {end_date}...\n")
    query_currency_exchange(start_date, end_date, selected_currency)


# Choose which query to run: yearly, 2-year, or 5-year
# Uncomment the desired function to fetch data

# Fetch yearly data
# fetch_yearly_data()

# Fetch 2-year data
# fetch_two_year_data()

# Fetch 5-year data
fetch_five_year_data()

# Close the connection
client.close()
