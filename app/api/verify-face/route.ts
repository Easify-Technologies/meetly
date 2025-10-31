import axios from "axios";
import FormData from "form-data";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const form = await req.formData();
    const userImage = form.get("user_image") as File;

    if (!userImage) {
      return NextResponse.json({ error: "Missing user_image" }, { status: 400 });
    }

    // Convert File → Buffer
    const arrayBuffer = await userImage.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Prepare form data for DiDit API
    const faceForm = new FormData();
    faceForm.append("user_image", buffer, {
      filename: userImage.name || "user.jpg",
      contentType: userImage.type || "image/jpeg",
    });
    faceForm.append("ref_image", "https://your-bucket.com/id_photo.jpg");
    faceForm.append("rotate_image", "true");
    faceForm.append("face_match_score_decline_threshold", "40");

    // Send to DiDit API
    const response = await axios.post(
      "https://verification.didit.me/v2/face-match/",
      faceForm,
      {
        headers: {
          ...faceForm.getHeaders(),
          "x-api-key": process.env.DIDIT_FACE_KEY!,
        },
        maxBodyLength: Infinity,
      }
    );

    const { status, score } = response.data.face_match;
    if (status === "Approved" && score > 80) {
      return NextResponse.json({ verified: true, message: "Face ID verified!" });
    } else {
      return NextResponse.json({ verified: false, message: "Verification failed." });
    }
  } catch (err: any) {
    console.error("Face match error:", err.response?.data || err.message);
    return NextResponse.json(
      { error: err.response?.data || err.message },
      { status: 500 }
    );
  }
}
