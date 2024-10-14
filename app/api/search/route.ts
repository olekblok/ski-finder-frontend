import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  // Construct the request options
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  };

  // Fetch data from the Flask backend
  const flaskResponse = await fetch('http://127.0.0.1:5000', requestOptions);

  // Check if the request was successful
  if (!flaskResponse.ok) {
    return NextResponse.json({ error: 'Failed to fetch data from backend' }, { status: 500 });
  }

  const results = await flaskResponse.json();

  // Return the data received from Flask to the frontend
  return NextResponse.json(results);
}
