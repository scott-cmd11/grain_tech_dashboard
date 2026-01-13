import rawIntel from '../src/data/raw_intel.json';

export const config = {
  runtime: 'edge',
};

export default async function handler() {
  try {
    // Return the data directly from the JSON file
    return new Response(JSON.stringify(rawIntel), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        // Cache for 1 hour since this is static "Scout" data
        'Cache-Control': 's-maxage=3600',
      },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Failed to load news data', articles: [] }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
