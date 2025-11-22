import { NextResponse } from "next/server";
import { guandiLots } from "./guandi_lots";

// Force dynamic rendering - no caching
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  // Randomly select a lot with better randomization
  const randomIndex = Math.floor(Math.random() * guandiLots.length);
  const selectedLot = guandiLots[randomIndex];

  // Mock AI interpretation (in a real app, this would call an LLM API)
  const aiInterpretation = `
    大师解签：
    
    此签为${selectedLot.number}号签，名为"${selectedLot.title}"。
    
    【诗曰】：${selectedLot.poem_text.replace(/\n/g, " ")}
    
    【诗意】：${selectedLot.poem_meaning}
    
    【解曰】：${selectedLot.explanation}
    
    【大师点拨】：
    ${selectedLot.detailed_explanation.comprehensive}
    
    此签核心在于"${selectedLot.detailed_explanation.essence}"。
    建议您${selectedLot.detailed_explanation.advice}
  `;

  return NextResponse.json(
    {
      ...selectedLot,
      ai_interpretation: aiInterpretation,
    },
    {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    }
  );
}
