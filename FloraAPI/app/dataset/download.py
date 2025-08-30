
import kagglehub

# Download latest version
path = kagglehub.dataset_download("marquis03/plants-classification")

print("Path to dataset files:", path)