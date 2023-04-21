import matplotlib.pyplot as plt

# a is the instance value and b the population value
# axis name is just the name of the value we are comparing, for instance GDP
# filepath is the output path of the png image of the graph
def compare_floats_bar(a, b, community_name, average_name, axis_name, filepath):
    plt.switch_backend('Agg') 
    if axis_name == 'nri': b = int(b)
    diff = abs(a - b)
    _, ax = plt.subplots()
    # Create a bar chart with two bars, one for "Instance" and one for "Population".
    ax.bar([community_name, average_name],
            [a, b],
            color=["#003f5c", "#ffa600"],
            width=0.6,
            edgecolor="black",
            linewidth=1.5,
            label=[community_name, average_name])

    # Set the title of the plot to display the difference between the two values.
    ax.set_title("Difference: {:.2f}".format(diff), fontsize=16)
    ax.set_ylabel(axis_name, fontsize=12)
    ax.tick_params(axis='both', which='major', labelsize=12)

    # Add a grid to the plot to make it easier to read the values.
    ax.grid(axis='y', linestyle='--', alpha=0.7)

    plt.tight_layout()
    plt.savefig(filepath)

def compare_floats_pie(a, b, community_name, average_name, axis_name, filepath):
    plt.switch_backend('Agg') 
    diff = abs(a - b)
    _, ax = plt.subplots()

    # Create a pie chart with two slices, one for "Instance" and one for "Population".
    slices = [a, b]
    labels = [community_name, average_name]
    colors = ["#003f5c", "#ffa600"]
    ax.pie(slices,
           labels=labels,
           colors=colors,
           startangle=90,
           wedgeprops={'edgecolor': 'black', 'linewidth': 1.5},
           autopct='%1.1f%%')

    # Set the title of the plot to display the difference between the two values.
    ax.set_title("Difference: {:.2f}".format(diff), fontsize=16)

    # Set the label for the x-axis to be blank and the label for the y-axis to be `axis_name`
    # ax.set_xlabel('')
    ax.set_xlabel(community_name + ' ' + axis_name, fontsize=12)

    plt.tight_layout()
    plt.savefig(filepath)