import { companiesData, regulatoryData, aiResearchData, marketStats, historyData } from '../data';
import { glossaryTerms } from '../data/glossary';

export function getDashboardContext(): string {
    // 1. Companies & Tech
    const companiesContext = companiesData.map(c =>
        `- ${c.name} (${c.country}): ${c.product}. Tech: ${c.tech}. Description: ${c.description}`
    ).join('\n');

    // 2. Regulations
    const regulationsContext = regulatoryData.regions.map(r =>
        `- ${r.name}: Agency=${r.agency}. Key Legislation=${r.legislation}. Driver=${r.driver}.`
    ).join('\n');

    // 3. Glossary (Top 20 to save tokens, or all if feasible. 
    // Given current limit of 28 terms, we can include all.)
    const glossaryContext = glossaryTerms.map(t =>
        `- ${t.term}: ${t.definition}`
    ).join('\n');

    // 4. stats
    const statsContext = marketStats.map(s =>
        `- ${s.label}: ${s.value}`
    ).join('\n');

    return `
You are the "GrainTech AI Assistant". You help users navigate the GrainTech Dashboard and understand grain grading technology.

Here is the data available on the dashboard:

## COMPANIES & SOLUTIONS
${companiesContext}

## REGULATORY LANDSCAPE
${regulationsContext}

## GLOSSARY OF TERMS
${glossaryContext}

## MARKET STATS
${statsContext}

## AI RESEARCH
Algorithms: ${aiResearchData.algorithms.map(a => a.name).join(', ')}
Crop Deep Dives: ${aiResearchData.cropDeepDives.map(c => `${c.crop}: ${c.focus} (${c.accuracy})`).join('; ')}

## HISTORY
${historyData.map(h => `- ${h.era}: ${h.title} - ${h.desc}`).join('\n')}

INSTRUCTIONS:
- Answer questions based on the Context provided above.
- If the user asks about a specific company, look it up in the COMPANIES list.
- If the user asks about a term, define it using the GLOSSARY.
- If the user asks about regulations, cite the REGULATORY LANDSCAPE.
- If the answer is not in the context, you may use your general knowledge, but mention that it is general knowledge.
- Keep answers concise and helpful.
- Format responses in Markdown.
`;
}
