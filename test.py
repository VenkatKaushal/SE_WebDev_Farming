# Load model directly
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM

tokenizer = AutoTokenizer.from_pretrained("mrSoul7766/AgriQBot")
model = AutoModelForSeq2SeqLM.from_pretrained("mrSoul7766/AgriQBot")

# Set maximum generation length
max_length = 256

# Generate response with question as input
input_ids = tokenizer.encode("Q: How can I increase the yield of my potato crop?", return_tensors="pt")
output_ids = model.generate(input_ids, max_length=max_length)

# input_ids = tokenizer.encode("Q: How do I need to grow a crop?", return_tensors="pt")
# output_ids = model.generate(input_ids, max_length=max_length)

# Decode response
response = tokenizer.decode(output_ids[0], skip_special_tokens=True)
print(response)