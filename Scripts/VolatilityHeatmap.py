import pandas as pd
import numpy as np
import seaborn as sns
import matplotlib.pyplot as plt


file_path = 'Exchange_Rate13-24.csv'
df = pd.read_csv(file_path)

# Convert the 'Date' column to datetime
df['Date'] = pd.to_datetime(df['Date'])

# Clean non-numeric values by forcing columns to numeric
for col in df.columns[1:]:
    df[col] = pd.to_numeric(df[col], errors='coerce')

# Function to calculate improved volatility for each year using log returns and annualization
def calculate_yearly_volatility(start_date, end_date, window=30):
    filtered_df = df[(df['Date'] >= start_date) & (df['Date'] <= end_date)]
    
    # Add 'Year' column to group by year later
    filtered_df['Year'] = filtered_df['Date'].dt.year

    # Calculate daily log returns for each currency
    log_returns = np.log(filtered_df.drop(columns=['Date', 'Year']) / filtered_df.drop(columns=['Date', 'Year']).shift(1))

    # Calculate rolling volatility (standard deviation of log returns over a rolling window)
    rolling_volatility = log_returns.rolling(window=window).std()

    # Annualize the rolling volatility (assuming 252 trading days in a year)
    annualized_volatility = rolling_volatility * np.sqrt(252)

    # Group by 'Year' and calculate the mean annualized volatility for each currency for each year
    yearly_volatility = annualized_volatility.groupby(filtered_df['Year']).mean()

    return yearly_volatility

# Function to plot the volatility heatmap with currencies on rows and years on columns
def plot_yearly_volatility_heatmap(start_date, end_date, window=30):
    # Calculate yearly volatility
    yearly_volatility = calculate_yearly_volatility(start_date, end_date, window)

    # Transpose the dataframe so that currencies are rows and years are columns
    yearly_volatility = yearly_volatility.T

    # Create the heatmap
    plt.figure(figsize=(12, 8))
    sns.heatmap(yearly_volatility, cmap='coolwarm', cbar_kws={'label': 'Annualized Volatility'}, linewidths=0.5, annot=True)

    # Rotate x-axis labels to align with the heatmap style
    plt.xticks(rotation=45, ha='right')

    # Add title
    plt.title(f'Currency Annualized Volatility Heatmap by Year from {start_date} to {end_date}')

    # Adjust layout to prevent overlap
    plt.tight_layout()

    # Show the plot
    plt.show()

# Example usage of the function with start and end date
start_date = '2019-01-01'
end_date = '2023-01-01'
plot_yearly_volatility_heatmap(start_date, end_date)
