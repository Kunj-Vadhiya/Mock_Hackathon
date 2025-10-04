import { type NextRequest, NextResponse } from "next/server"

// Backend API URL
const BACKEND_API_URL = process.env.BACKEND_API_URL || "http://localhost:8000"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate input
    const { subjectArea, title, abstract, accPercentFrom, accPercentTo, openAccess } = body

    if (!subjectArea || !title || !abstract) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Prepare request for Python backend
    const backendRequest = {
      subjectArea,
      title,
      abstract,
      accPercentFrom: Number.parseInt(accPercentFrom) || 0,
      accPercentTo: Number.parseInt(accPercentTo) || 100,
      openAccess: openAccess === true || openAccess === "true", // Convert to boolean
    }

    console.log("Sending to backend:", JSON.stringify(backendRequest, null, 2))

    // Call Python FastAPI backend
    const backendResponse = await fetch(`${BACKEND_API_URL}/api/recommend`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(backendRequest),
    })

    if (!backendResponse.ok) {
      const errorData = await backendResponse.json().catch(() => ({ detail: "Unknown error" }))
      console.error("Backend error:", errorData)
      throw new Error(errorData.detail || "Backend request failed")
    }

    const backendData = await backendResponse.json()

    console.log("Received from backend:", {
      success: backendData.success,
      recommendationCount: backendData.recommendations?.length,
      processingTime: backendData.processingTime,
    })

    // Return backend response to frontend
    return NextResponse.json({
      success: backendData.success,
      inputData: backendData.inputData,
      recommendations: backendData.recommendations,
      processingTime: backendData.processingTime,
    })
  } catch (error) {
    console.error("Error processing recommendation:", error)
    return NextResponse.json(
      {
        error: "Failed to process recommendation",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    )
  }
}
