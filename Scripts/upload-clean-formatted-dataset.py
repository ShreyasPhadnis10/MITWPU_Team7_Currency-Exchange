import pandas as pd
from pymongo import MongoClient

# Load the cleaned and processed CSV file
file_path = '/path_to_your/Merged_Exchange_Rate_2023_2024.csv'
df = pd.read_csv(file_path)

# Connect to MongoDB
client = MongoClient("mongodb://localhost:27017/")
db = client["database_name"]
collection = db["collection_name"]

# Convert the DataFrame to a dictionary format for MongoDB
data = df.to_dict(orient='records')

# Insert data into the collection
collection.insert_many(data)

print("Data has been uploaded to MongoDB successfully!")
