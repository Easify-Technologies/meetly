export async function addLocation(data: {
  city: string;
  country: string;
  imageUrl: File;
}) {
  try {
    const formData = new FormData();
    
    formData.append("city", data.city);
    formData.append("country", data.country);
    formData.append("imageUrl", data.imageUrl);

    const res = await fetch("/api/locations", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || "Failed to add location");
    }

    const result = await res.json();
    return result;
  } catch (error) {
    console.error("Error uploading location:", error);
    throw error;
  }
}
