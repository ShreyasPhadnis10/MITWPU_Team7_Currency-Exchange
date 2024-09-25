import warnings
import numpy
from keras.layers import Dense
from keras.models import Sequential
from matplotlib import pyplot
from pandas import read_csv

TRAINING_PERCENTAGE = 0.7
TESTING_PERCENTAGE = 1 - TRAINING_PERCENTAGE
NUMBER_OF_PREVIOUS_DATA_POINTS = 3
LENGTH_DATA_SET = 0
numpy.random.seed(7)
TRAINING_SET_LENGTH = 0
TESTING_SET_LENGTH = 0


def training_testing_buckets(raw_data, training_percentage, testing_percentage):
    global TRAINING_SET_LENGTH, TESTING_SET_LENGTH
    TRAINING_SET_LENGTH = int(LENGTH_DATA_SET * training_percentage)
    TESTING_SET_LENGTH = LENGTH_DATA_SET - TRAINING_SET_LENGTH
    training_set, testing_set = raw_data[0:TRAINING_SET_LENGTH], raw_data[TRAINING_SET_LENGTH:LENGTH_DATA_SET]
    return training_set, testing_set


def modify_data_set_rnn(training_set, testing_set):
    train_actual = []
    train_predict = []
    for interval in range(len(training_set) - NUMBER_OF_PREVIOUS_DATA_POINTS - 1):
        train_actual.append(training_set[interval: interval + NUMBER_OF_PREVIOUS_DATA_POINTS])
        train_predict.append(training_set[interval + NUMBER_OF_PREVIOUS_DATA_POINTS])

    test_actual = []
    test_predict = []
    for interval in range(len(testing_set) - NUMBER_OF_PREVIOUS_DATA_POINTS - 1):
        test_actual.append(testing_set[interval: interval + NUMBER_OF_PREVIOUS_DATA_POINTS])
        test_predict.append(testing_set[interval + NUMBER_OF_PREVIOUS_DATA_POINTS])

    return train_actual, train_predict, test_actual, test_predict


def load_data_set(currency):
    # Read the dataset with the header intact
    data_set_frame = read_csv('currency_prediction_data_set.csv', header=0, index_col=0, squeeze=True)

    # Reverse the rows of the dataset (but not the header)
    data_set_frame = data_set_frame.iloc[::-1]

    # Extract the column headers and identify the specific currency column
    column_headers = data_set_frame.columns.values.tolist()
    currency_index = column_headers.index('USD/' + currency.upper()) + 1

    # Read the specific column for the currency
    data_file = data_set_frame.iloc[:, currency_index - 1]  # Use iloc to access the column by index

    raw_data = data_file.values.tolist()

    global LENGTH_DATA_SET
    LENGTH_DATA_SET = len(raw_data)
    return raw_data



def build_recurrent_neural_network(train_actual, train_predict):
    recurrent_neural_network = Sequential()

    recurrent_neural_network.add(Dense(12, input_dim=NUMBER_OF_PREVIOUS_DATA_POINTS, activation="relu"))
    recurrent_neural_network.add(Dense(8, activation="relu"))
    recurrent_neural_network.add(Dense(1))

    recurrent_neural_network.compile(loss='mean_squared_error', optimizer='adam')
    recurrent_neural_network.fit(train_actual, train_predict, epochs=50, batch_size=2, verbose=2)

    return recurrent_neural_network


def predict_rnn(recurrent_neural_network, train_actual, test_actual, future_days=30):
    # Predict for the test set first
    training_predict = recurrent_neural_network.predict(train_actual)
    testing_predict = recurrent_neural_network.predict(test_actual)

    # Print the next day prediction
    print('\t The prediction for the next day:', testing_predict[-1])

    # Now predict for the next `future_days` (e.g., 30 days)
    last_test_data = test_actual[-1]  # The last data from the testing set
    future_predictions = []

    print(f'Predicting for the next {future_days} days:')
    for day in range(future_days):
        next_prediction = recurrent_neural_network.predict(numpy.array([last_test_data]))[0]
        future_predictions.append(next_prediction)

        # Update the input by appending the predicted day and removing the first element
        last_test_data = numpy.append(last_test_data[1:], next_prediction)

        print(f'Day {day + 1}: {next_prediction}')

    return training_predict, testing_predict, future_predictions


def evaluate_performance_rnn(recurrent_neural_network, train_actual, train_predict, test_actual, test_predict):
    mse_testing = recurrent_neural_network.evaluate(test_actual, test_predict, verbose=0)
    print('\t Testing Mean Square Error:', mse_testing)

    with open("mse_rnn.txt", 'w') as mse_file:
        mse_file.write(str(mse_testing) + '\n')


def plot_rnn(currency, raw_data, training_predict, testing_predict, file_name):
    training_data_trend = [None] * LENGTH_DATA_SET
    testing_data_trend = [None] * LENGTH_DATA_SET

    training_data_trend[NUMBER_OF_PREVIOUS_DATA_POINTS:len(training_predict) + NUMBER_OF_PREVIOUS_DATA_POINTS] = \
        list(training_predict[:, 0])
    testing_data_trend[NUMBER_OF_PREVIOUS_DATA_POINTS - 1:len(training_predict) + NUMBER_OF_PREVIOUS_DATA_POINTS] = \
        list(testing_predict[:, 0])

    actual = pyplot.plot(raw_data[int(TRAINING_PERCENTAGE * LENGTH_DATA_SET):], label="Actual data points", color="blue")
    testing = pyplot.plot(testing_data_trend, label="Testing prediction", color="red")

    pyplot.ylabel('currency values for 1 USD')
    pyplot.xlabel('number of days')
    pyplot.title('USD/' + currency + ' : actual vs predicted using RNN')

    pyplot.legend()
    pyplot.savefig(file_name)
    pyplot.clf()

from datetime import timedelta

def plot_future_predictions(future_predictions, last_date, currency, file_name):
    future_dates = [last_date + timedelta(days=i) for i in range(1, len(future_predictions) + 1)]

    pyplot.plot(future_dates, future_predictions, label="Future predictions", color="green", marker='o')
    
    pyplot.ylabel('Predicted currency values for 1 USD')
    pyplot.xlabel('Date')
    pyplot.title('USD/' + currency + ' : Future predictions for next days')

    pyplot.xticks(rotation=45)
    pyplot.tight_layout()

    pyplot.legend()
    pyplot.savefig(file_name)
    pyplot.clf()
    

import pandas as pd  # Make sure to import pandas to use the date conversion

def rnn_model(currency):
    print('\nNeural Network Model')

    print('loading the dataset...')
    raw_data = load_data_set(currency)

    print('splitting training and testing set...')
    training_set, testing_set = training_testing_buckets(raw_data, TRAINING_PERCENTAGE, TESTING_PERCENTAGE)
    train_actual, train_predict, test_actual, test_predict = modify_data_set_rnn(training_set, testing_set)

    print('building and training model...')
    rnn = build_recurrent_neural_network(train_actual, train_predict)

    print('predicting...')
    future_days = 30  # Set the number of future days to predict
    training_predict, testing_predict, future_predictions = predict_rnn(rnn, train_actual, test_actual, future_days)

    print('evaluating performance...')
    evaluate_performance_rnn(rnn, train_actual, train_predict, test_actual, test_predict)

    print('plotting the graph...')
    plot_rnn(currency, raw_data, training_predict, testing_predict, "testing_prediction_rnn.pdf")

    print('plotting future predictions...')
    last_date_in_dataset = data_set_frame.index[1]  # Get the last date in the dataset (as a string)
    last_date_in_dataset = pd.to_datetime(last_date_in_dataset)  # Convert the string to a datetime object
    plot_future_predictions(future_predictions, last_date_in_dataset, currency, "future_predictions_rnn.pdf")

    print('done...')
    return training_predict, testing_predict, future_predictions


if __name__ == '__main__':
    warnings.filterwarnings("ignore")
    data_set_frame = read_csv('currency_prediction_data_set.csv', header=0, index_col=0, squeeze=True)
    column_headers = str([cur[4:] for cur in data_set_frame.columns.values.tolist()])
    currency = input('Enter any one of ' + column_headers + ' currencies\n').strip()
    rnn_model(currency)  # setting the entry point
