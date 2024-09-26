import pandas as pd
from pymongo import MongoClient
from tkinter import Tk
from tkinter.filedialog import askopenfilename

# Function to load CSV and insert into MongoDB
def load_csv_to_mongodb():
    # Initialize Tkinter and hide root window
    Tk().withdraw()
    
    # Ask for file to upload
    file_path = askopenfilename(filetypes=[("CSV files", "*.csv")], title="Choose a CSV file")
    
    if not file_path:
        print("No file selected, exiting.")
        return

    # Load the CSV file
    df = pd.read_csv(file_path)
    
    # Connect to MongoDB
    client = MongoClient('mongodb://localhost:27017/')  # Update with your MongoDB URI if needed
    db = client['currency']  # Update with your database name
    collection = db['exchangerates']  # Update with your collection name

    # Convert DataFrame to dictionary and insert into MongoDB
    data_dict = df.to_dict(orient='records')
    collection.insert_many(data_dict)

    print(f"Inserted {len(data_dict)} records into MongoDB.")

# Call the function
load_csv_to_mongodb()
