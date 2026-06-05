import { NextRequest, NextResponse } from "next/server";

const CMS_API_URL =
  process.env.CMS_API_URL ??
  process.env.NEXT_PUBLIC_CMS_API_URL ??
  "https://cms.networkeandp.com/php/api.php";

const CMS_METHODS = new Set(["GET", "POST", "PUT", "PATCH", "DELETE"]);

async function proxyRequest(request: NextRequest) {
  const targetUrl = new URL(CMS_API_URL);

  request.nextUrl.searchParams.forEach((value, key) => {
    targetUrl.searchParams.set(key, value);
  });

  const headers = new Headers();
  const contentType = request.headers.get("content-type");
  if (contentType) {
    headers.set("content-type", contentType);
  }

  const authorization = request.headers.get("authorization");
  if (authorization) {
    headers.set("authorization", authorization);
  }

  const init: RequestInit = {
    method: request.method,
    headers,
    cache: "no-store",
  };

  if (request.method !== "GET" && request.method !== "HEAD") {
    const body = await request.text();
    if (body) {
      init.body = body;
    }
  }

  const upstreamResponse = await fetch(targetUrl, init);
  const body = await upstreamResponse.text();

  return new NextResponse(body, {
    status: upstreamResponse.status,
    headers: {
      "content-type":
        upstreamResponse.headers.get("content-type") ?? "application/json",
    },
  });
}

export async function GET(request: NextRequest) {
  return proxyRequest(request);
}

export async function POST(request: NextRequest) {
  return proxyRequest(request);
}

export async function PUT(request: NextRequest) {
  return proxyRequest(request);
}

export async function PATCH(request: NextRequest) {
  return proxyRequest(request);
}

export async function DELETE(request: NextRequest) {
  return proxyRequest(request);
}

export function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      Allow: Array.from(CMS_METHODS).join(", "),
    },
  });
}
