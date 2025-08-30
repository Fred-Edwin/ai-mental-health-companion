import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const SessionConfigSchema = z.object({
  type: z.literal('realtime'),
  model: z.literal('gpt-realtime')
});

const OpenAIClientSecretRequestSchema = z.object({
  session: SessionConfigSchema
});

// Update schema based on actual OpenAI API response structure
const OpenAIClientSecretResponseSchema = z.object({
  client_secret: z.object({
    value: z.string(),
    expires_at: z.number().optional()
  }).optional()
}).or(z.object({
  // Alternative structure - direct value
  value: z.string(),
  expires_at: z.number().optional()
}));

type OpenAIClientSecretResponse = z.infer<typeof OpenAIClientSecretResponseSchema>;

export async function POST(_request: NextRequest) {
  try {
    // Validate environment variable
    const openaiApiKey = process.env.OPENAI_API_KEY;
    if (!openaiApiKey) {
      return NextResponse.json(
        { error: 'OpenAI API key not configured' },
        { status: 500 }
      );
    }

    // Prepare the request payload with session configuration
    const requestPayload = {
      session: {
        type: 'realtime' as const,
        model: 'gpt-realtime' as const
      }
    };

    // Validate the payload using Zod
    const validatedPayload = OpenAIClientSecretRequestSchema.parse(requestPayload);

    // Make request to OpenAI API
    const response = await fetch('https://api.openai.com/v1/realtime/client_secrets', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(validatedPayload),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('OpenAI API Error:', errorData);
      
      return NextResponse.json(
        { 
          error: 'Failed to generate ephemeral client secret',
          details: response.status === 401 ? 'Invalid API key' : 'API request failed'
        },
        { status: response.status === 401 ? 401 : 500 }
      );
    }

    const data = await response.json();
    
    // Log the actual response structure for debugging
    console.log('OpenAI API Response:', JSON.stringify(data, null, 2));
    
    // Handle the response based on documentation: response contains client_secret.value
    let clientSecret: string;
    let expiresAt: number;
    
    if (data.client_secret?.value) {
      // Expected structure: { client_secret: { value: string, expires_at?: number } }
      clientSecret = data.client_secret.value;
      expiresAt = data.client_secret.expires_at || Date.now() + (60 * 60 * 1000);
    } else if (data.value) {
      // Alternative structure: { value: string, expires_at?: number }
      clientSecret = data.value;
      expiresAt = data.expires_at || Date.now() + (60 * 60 * 1000);
    } else {
      // Unexpected structure - log and throw error
      console.error('Unexpected OpenAI API response structure:', data);
      throw new Error('Invalid response format from OpenAI API');
    }

    // Return the client secret data
    return NextResponse.json({
      client_secret: clientSecret,
      expires_at: expiresAt
    });

  } catch (error) {
    console.error('Ephemeral client secret generation error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request format', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Only allow POST requests
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}

export async function PUT() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}

export async function DELETE() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}