import {NextResponse} from "next/server";

export function GET() {
	const payload = {
		status: "healthy",
		timestamp: Date.now(),
	}
	return NextResponse.json(payload)
}