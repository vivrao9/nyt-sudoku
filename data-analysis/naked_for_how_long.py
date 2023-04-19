def naked_for_how_long(doks_order, puzzle, solution):
    # create copies of the variables so I don't accidentally
    # update the DataFrame
    # https://stackoverflow.com/questions/60643279/how-to-avoid-unintentional-changing-a-global-variable-when-using-it-as-a-local-v
    doks_order = doks_order.copy()
    puzzle = puzzle.copy()
    solution = solution.copy()

    # print how many steps it took to fill out the puzzle
    # this is simply out of curiosity
    print(len(doks_order))

    # generate an empty dictionary with each cell index
    # being a key. For now, each value will be 0.
    # {
    #   0: 0,
    #   1: 0,
    #   2: 0,
    #   ...
    #   80: 0,
    # }
    # the value of the dictionary indicates how many steps/turns
    # after that cell first became a naked single was it filled
    # out
    # in other words, this could be a proxy for how well I'm
    # keep track of naked singles, or how well I'm monitoring
    # a particular section of the grid
    for_how_long = {i: 0 for i in range(81)}

    # creating a list to see how many naked singles are available
    # after every step
    num_naked_singles = []

    for step in range(len(doks_order)):
        # first get all cells that are naked singles at that step
        candidates_from_latest_step = get_candidates(puzzle)

        # update dictionary
        for candidate in candidates_from_latest_step:
            for_how_long[candidate] += 1

        num_naked_singles.append(len(candidates_from_latest_step))

        # update puzzle with solution
        puzzle[doks_order[step]] = solution[doks_order[step]]

    return for_how_long, num_naked_singles
