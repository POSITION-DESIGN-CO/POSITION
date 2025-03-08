import { getProjects, getProjectsByCategory } from "@/lib/contentful"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const category = searchParams.get("category")

  try {
    const data = category ? await getProjectsByCategory(category) : await getProjects()

    return NextResponse.json(data)
  } catch (error) {
    console.error("Error in API route:", error)
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 })
  }
}

