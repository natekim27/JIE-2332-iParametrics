import matplotlib.pyplot as plt

# a is the instance value and b the population value
# axis name is just the name of the value we are comparing, for instance GDP
# filepath is the output path of the png image of the graph
def compare_floats_bar(a, b, axis_name, filepath):
    diff = abs(a - b)
    fig, ax = plt.subplots()

    # Create a bar chart with two bars, one for "Instance" and one for "Population".
    ax.bar(["Instance", "Population"],
            [a, b],
            color=["#003f5c", "#ffa600"],
            width=0.6,
            edgecolor="black",
            linewidth=1.5,
            label=["Instance", "Population"])
   
    # Set the title of the plot to display the difference between the two values.
    ax.set_title("Difference: {:.2f}".format(diff), fontsize=16)
    ax.set_ylabel(axis_name, fontsize=12)
    ax.tick_params(axis='both', which='major', labelsize=12)
   
    # Add a grid to the plot to make it easier to read the values.
    ax.grid(axis='y', linestyle='--', alpha=0.7)
   
    plt.tight_layout()
    plt.savefig(filepath)
    plt.show()

compare_floats_bar(50.0, 55.0, 'Population', 'my_histogram.png')