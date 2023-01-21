import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

def plot_grid(level):
    df = pd.read_csv('Desktop/Programming/Miscellaneous/sudoku/' + level + '.csv', header=0)
    df = df.drop_duplicates()
    matrix = df.puzzle.apply(lambda x: np.matrix(x)).sum().reshape(9,9) / 9
    viz=plt.imshow(matrix, cmap="YlGnBu")
    viz=plt.tick_params(
        axis='both',          # changes apply to the x-axis
        which='both',      # both major and minor ticks are affected
        bottom=False,      # ticks along the bottom edge are off
        top=False,
        left=False,         # ticks along the top edge are off
        labelbottom=False) # labels along the bottom edge are off
    viz=plt.axis('off')
    viz=plt.vlines(2.5, ymin=-0.5, ymax=8.5)
    viz=plt.vlines(5.5, ymin=-0.5, ymax=8.5)
    viz=plt.hlines(2.5, xmin=-0.5, xmax=8.5)
    viz=plt.hlines(5.5, xmin=-0.5, xmax=8.5)
    return viz
    
easy_viz=plot_grid("easy")
# med_viz=plot_grid("medium")
# hard_viz=plot_grid("hard")

# fig, (ax1, ax2, ax3) = plt.subplots(1, 3)
ax1.plot(easy_viz)
# ax2.plot(med_viz)
# ax3.plot(hard_viz)