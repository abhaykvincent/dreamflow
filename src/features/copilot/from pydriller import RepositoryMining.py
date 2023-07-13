from pydriller import RepositoryMining

# Path to your repository
repo_path = '/path/to/your/repository'

# Prepare lists to hold our parsed data
commits = []
authors = []
dates = []
messages = []
insertions = []
deletions = []
files = []

# Mine the repository
for commit in RepositoryMining(repo_path).traverse_commits():
    for modification in commit.modifications:
        commits.append(commit.hash)
        authors.append(commit.author.name)
        dates.append(commit.author_date)
        messages.append(commit.msg)
        insertions.append(modification.added)
        deletions.append(modification.removed)
        files.append(modification.filename)

# Create a DataFrame from our parsed data
df = pd.DataFrame({
    'commit': commits,
    'author': authors,
    'date': dates,
    'message': messages,
    'insertions': insertions,
    'deletions': deletions,
    'file': files
})

# Calculate code churn
df['churn'] = df['insertions'] + df['deletions']

df.head()
