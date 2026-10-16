import sys
from PIL import Image
import numpy as np

def get_average_hex_color(image_path: str) -> str:
    """
    Calculates the average color of an image and returns it as a HEX string.
    """
    try:
        # Open the image and convert it to RGB mode
        with Image.open(image_path) as img:
            img = img.convert('RGB')

            # Convert image data to a NumPy array
            img_np = np.array(img)

            # Calculate the mean across all pixels for Red, Green, and Blue channels
            avg_color_per_channel = np.mean(img_np, axis=(0, 1))

            # Round the float values and convert to integers
            r, g, b = np.round(avg_color_per_channel).astype(int)

            # Format as a hex string
            hex_color = f"#{r:02x}{g:02x}{b:02x}"
            return hex_color

    except FileNotFoundError:
        print(f"Error: The file at '{image_path}' was not found.")
        sys.exit(1)
    except Exception as e:
        print(f"Error processing image: {e}")
        sys.exit(1)

if __name__ == "__main__":
    # Check if image path is provided via command-line argument
    if len(sys.argv) > 1:
        file_path = sys.argv[1]
    else:
        # Default fallback / user prompt
        file_path = input("Enter path to image file: ").strip()

    hex_val = get_average_hex_color(file_path)
    print(f"Average Color: {hex_val.upper()}")