from fastapi import FastAPI, HTTPException
from connection import (
    fetch_weekly_data_with_currency,
    fetch_monthly_data_with_currency,
    fetch_quarterly_data_with_currency,
    fetch_yearly_data_with_currency,
    fetch_two_year_data_with_currency,
    fetch_five_year_data_with_currency
)
from fastapi.middleware.cors import CORSMiddleware
app = FastAPI()

origins = [
    "http://localhost:3000",  # Add your React app's URL
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/weekly")
async def get_weekly_data(currency: str):
    """
    Endpoint to fetch weekly currency exchange data for the given currency.
    :param currency: The currency for which data is to be fetched.
    """
    try:
        results = fetch_weekly_data_with_currency(currency)
        response = {
            "message": f"Weekly currency data fetched successfully for {currency}.",
            "data": results
        }
        return response
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")

@app.get("/monthly")
async def get_monthly_data(currency: str):
    """
    Endpoint to fetch monthly currency exchange data for the given currency.
    :param currency: The currency for which data is to be fetched.
    """
    try:
        results = fetch_monthly_data_with_currency(currency)
        response = {
            "message": f"Monthly currency data fetched successfully for {currency}.",
            "data": results
        }
        return response
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")

@app.get("/quarterly")
async def get_quarterly_data(currency: str):
    """
    Endpoint to fetch quarterly currency exchange data for the given currency.
    :param currency: The currency for which data is to be fetched.
    """
    try:
        results = fetch_quarterly_data_with_currency(currency)
        response = {
            "message": f"Quarterly currency data fetched successfully for {currency}.",
            "data": results
        }
        return response
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")

@app.get("/yearly")
async def get_yearly_data(currency: str):
    """
    Endpoint to fetch yearly currency exchange data for the given currency.
    :param currency: The currency for which data is to be fetched.
    """
    try:
        results = fetch_yearly_data_with_currency(currency)
        response = {
            "message": f"Yearly currency data fetched successfully for {currency}.",
            "data": results
        }
        return response
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")

@app.get("/two-year")
async def get_two_year_data(currency: str):
    """
    Endpoint to fetch two-year currency exchange data for the given currency.
    :param currency: The currency for which data is to be fetched.
    """
    try:
        results = fetch_two_year_data_with_currency(currency)
        response = {
            "message": f"Two-year currency data fetched successfully for {currency}.",
            "data": results
        }
        return response
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")

@app.get("/five-year")
async def get_five_year_data(currency: str):
    """
    Endpoint to fetch five-year currency exchange data for the given currency.
    :param currency: The currency for which data is to be fetched.
    """
    try:
        results = fetch_five_year_data_with_currency(currency)
        response = {
            "message": f"Five-year currency data fetched successfully for {currency}.",
            "data": results
        }
        return response
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")
