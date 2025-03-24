import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const hfResponse = await fetch(
      "https://api-inference.huggingface.co/models/tiiuae/falcon-7b-instruct",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_HF_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    console.log("🛠 Hugging Face API Response Status:", hfResponse.status);
    
    if (!hfResponse.ok) {
      const error = await hfResponse.text();
      return NextResponse.json({ error }, { status: hfResponse.status });
    }

    const result = await hfResponse.json();
    console.log("🌍 Hugging Face API Response:", result);

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("❌ AI Model Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
