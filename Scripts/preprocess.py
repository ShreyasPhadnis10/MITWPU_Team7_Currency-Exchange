import pandas as pd
import glob

file_paths = glob.glob('Exchange_Rate_Report_*.csv')

processed_dfs = []

for file_path in file_paths:
   
    exchange_rate_df = pd.read_csv(file_path)

    # Step 1: Convert the "Date" column to datetime format, and drop rows where the conversion failed
    exchange_rate_df['Date'] = pd.to_datetime(exchange_rate_df['Date'], format='%d-%b-%y', errors='coerce')
    exchange_rate_df = exchange_rate_df.dropna(subset=['Date'])  # Drop rows where 'Date' is NaT

    # Step 2: Create a full date range from January 1st to the maximum date in the dataset
    full_date_range = pd.date_range(start=f'{exchange_rate_df["Date"].min().year}-01-01', end=exchange_rate_df['Date'].max())

    # Step 3: Reindex the DataFrame to include all dates in the range
    exchange_rate_df.set_index('Date', inplace=True)
    reindexed_df = exchange_rate_df.reindex(full_date_range)

    # Step 4: Backward fill for missing values at the beginning, then forward fill for the rest
    filled_df = reindexed_df.bfill().ffill()

    # Step 5: Fill any remaining missing values in the dataset using the mean method
    filled_df = filled_df.fillna(filled_df.mean())

    # Append the cleaned and filled DataFrame to the list
    processed_dfs.append(filled_df)


final_df = pd.concat(processed_dfs)
final_df.to_csv('Merged_Exchange_Rate_2013_2022.csv')

print("All CSV files processed, missing values handled, and merged into 'Merged_Exchange_Rate_2013_2022.csv'.")
