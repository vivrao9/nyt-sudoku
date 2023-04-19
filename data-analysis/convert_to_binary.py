# create a function that converts a sudokue grid
# to a sparse matrix with 1s and 0s, where 1
# indicates the cell came pre-filled
# generated using ChatGPT
def convert_to_binary(grid) -> list:
    """
    Takes a NumPy array as input and returns an array with 1s and 0s based on the input array's value.
    """

     # Convert the input string to a NumPy array
    if isinstance(grid, str):
        arr = np.array(literal_eval(grid))

        return np.where(arr != 0, 1, 0)
