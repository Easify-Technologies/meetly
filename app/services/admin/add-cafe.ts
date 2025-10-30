export async function addCafes(data: {
  name: string;
  address: string;
  locationId: string;
  imageUrl: File;
}) {
  try {
    const formData = new FormData();
    
    formData.append("name", data.name);
    formData.append("address", data.address);
    formData.append("locationId", data.locationId);
    formData.append("imageUrl", data.imageUrl);

    const res = await fetch("/api/cafe", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || "Failed to add cafe");
    }

    const result = await res.json();
    return result;
  } catch (error) {
    console.error("Error uploading cafe:", error);
    throw error;
  }
}
