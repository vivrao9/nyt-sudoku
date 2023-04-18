def get_row_col(num):
    '''
   Last edited: 4/15/2023
   Define a function that, given a data-cell value, returns the exact row and
   column where that data-cell is located within the sudoku grid.

    Parameters
    ----------
    num : TYPE
        DESCRIPTION.

    Returns
    -------
    TYPE
        tuple of integers of the form (row, column)

    '''
	return ( num // 9, num % 9 )
