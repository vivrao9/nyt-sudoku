# functions we need
# from numpy import array
from ast import literal_eval
from numpy import array, where

# create a function that converts a sudoku grid
# to a sparse matrix with 1s and 0s, where 1
# indicates the cell came pre-filled
# generated using ChatGPT
def convert_to_binary(grid) -> array:
    """
    Takes a NumPy array as input and returns an array with 1s and 0s based on the input array's value.
    """

    # convert the input string to a NumPy array
    if isinstance(grid, str):
        arr = array(literal_eval(grid))

    elif isinstance(grid, list):
        arr = array(grid)

    return where(arr != 0, 1, 0)
