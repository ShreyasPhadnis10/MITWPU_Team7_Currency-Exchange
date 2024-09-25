from pymongo import MongoClient
from datetime import datetime, timedelta

# Replace with your MongoDB connection string
client = MongoClient("mongodb://localhost:27017/")

# Access the database and collection
db = client["NothernHackathon"]
collection = db["CurrencyExchange"]

def query_currency_exchange(start_date, end_date, selected_currency):
    """
    Function to query currency exchange rates for the selected date range.
    :param start_date: The start date for the query.
    :param end_date: The end date for the query.
    :param selected_currency: The currency field to project.
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
    results = list(collection.aggregate(pipeline))  # Convert cursor to list

    # Serialize the results: convert ObjectId to str and datetime to str
    serialized_results = [
        {
            "_id": str(result["_id"]),  # Convert ObjectId to string
            "Date": result["Date"].strftime("%Y-%m-%d"),  # Convert datetime to string
            selected_currency: result.get(selected_currency)  # Include currency value
        }
        for result in results
    ]
    return serialized_results

def fetch_weekly_data_with_currency(selected_currency):
    """
    Fetches weekly currency data based on the provided currency.
    :param selected_currency: The currency field to project.
    """
    end_date = datetime(2024, 9, 26)  # 26th September 2024
    start_date = end_date - timedelta(weeks=1)  # 7 days before the end date
    results = query_currency_exchange(start_date, end_date, selected_currency)
    return results

def fetch_monthly_data_with_currency(selected_currency):
    """
    Fetches monthly currency data based on the provided currency.
    :param selected_currency: The currency field to project.
    """
    end_date = datetime(2024, 9, 26)  # 26th September 2024
    start_date = end_date.replace(day=1)  # 1st day of the current month
    results = query_currency_exchange(start_date, end_date, selected_currency)
    return results

def fetch_quarterly_data_with_currency(selected_currency):
    """
    Fetches quarterly currency data based on the provided currency.
    :param selected_currency: The currency field to project.
    """
    end_date = datetime(2024, 9, 26)  # 26th September 2024
    start_date = end_date - timedelta(weeks=13)  # 13 weeks (approx. 3 months) before the end date
    results = query_currency_exchange(start_date, end_date, selected_currency)
    return results


def fetch_yearly_data_with_currency(selected_currency):
    """
    Fetches yearly currency data based on the provided currency.
    :param selected_currency: The currency field to project.
    """
    start_date = datetime(2024, 1, 1)  # 1st January 2024
    end_date = datetime(2024, 12, 31)  # 31st December 2024
    results = query_currency_exchange(start_date, end_date, selected_currency)
    return results

def fetch_two_year_data_with_currency(selected_currency):
    """
    Fetches two-year currency data based on the provided currency.
    :param selected_currency: The currency field to project.
    """
    start_date = datetime(2023, 1, 1)  # 1st January 2023
    end_date = datetime(2024, 12, 31)  # 31st December 2024
    results = query_currency_exchange(start_date, end_date, selected_currency)
    return results

def fetch_five_year_data_with_currency(selected_currency):
    """
    Fetches five-year currency data based on the provided currency.
    :param selected_currency: The currency field to project.
    """
    start_date = datetime(2020, 1, 1)  # 1st January 2020
    end_date = datetime(2024, 12, 31)  # 31st December 2024
    results = query_currency_exchange(start_date, end_date, selected_currency)
    return results


