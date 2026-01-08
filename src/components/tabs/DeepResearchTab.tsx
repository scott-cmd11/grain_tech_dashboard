import { FileText, Globe, Shield, Info } from 'lucide-react';

export function DeepResearchTab() {
    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Header Section */}
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-8">
                <div className="max-w-4xl mx-auto">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                            <FileText className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Global Regulatory Architectures in the Grain Trade</h1>
                            <p className="text-lg text-gray-600 dark:text-gray-400 mt-1">
                                An Exhaustive Analysis of International Standards and National Enforcement Protocols
                            </p>
                        </div>
                    </div>

                    <div className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 space-y-6 leading-relaxed">
                        <p className="text-xl font-light leading-relaxed border-l-4 border-blue-500 pl-6 py-2 italic text-gray-600 dark:text-gray-400">
                            The global trade in cereal grains, oilseeds, and pulses represents the most significant component of international agricultural commerce, serving as the fundamental guarantor of global food security.
                        </p>

                        <p>
                            As the most traded crop category in the world, wheat alone commands a sophisticated regulatory environment that must balance the competing interests of sovereign food sovereignty, producer profitability, and consumer safety. In the marketing years of 2024/25 and 2025/26, the global grain economy has reached unprecedented levels of production and complexity, with total grains output forecast at a record 2,430 million metric tons.
                        </p>

                        <p>
                            This massive movement of biological material across borders is governed by a multi-layered regulatory architecture that spans from the high-level legal frameworks of the World Trade Organization (WTO) to the granular, science-based grading standards of national agencies such as the United States’ Federal Grain Inspection Service (FGIS) and the Canadian Grain Commission (CGC).
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
                {/* Navigation Sidebar (Sticky) */}
                <div className="lg:col-span-1 hidden lg:block">
                    <div className="sticky top-24 space-y-4">
                        <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">Contents</h3>
                        <nav className="space-y-1">
                            {[
                                { label: 'International Framework', id: 'framework' },
                                { label: 'Market Statistics', id: 'stats' },
                                { label: 'North America', id: 'north-america' },
                                { label: 'European Union', id: 'eu' },
                                { label: 'Black Sea', id: 'black-sea' },
                                { label: 'Asia (China/India)', id: 'asia' },
                                { label: 'South America', id: 'south-america' },
                                { label: 'Oceania', id: 'oceania' },
                                { label: 'Middle East', id: 'middle-east' },
                                { label: 'Key Takeaways', id: 'takeaways' },
                            ].map((item) => (
                                <a
                                    key={item.id}
                                    href={`#${item.id}`}
                                    className="block px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors border-l-2 border-transparent hover:border-blue-500"
                                >
                                    {item.label}
                                </a>
                            ))}
                        </nav>
                    </div>
                </div>

                {/* Article Content */}
                <div className="lg:col-span-3 space-y-12">

                    {/* Section: International Framework */}
                    <section id="framework" className="scroll-mt-24">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                            <Globe className="w-6 h-6 text-blue-500" />
                            The International Institutional Framework
                        </h2>
                        <div className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
                            <p>
                                The regulation of grain trade begins at the supranational level, where three primary entities define the international "rules of the road":
                            </p>
                            <ul className="list-disc pl-5 mt-4 space-y-2 marker:text-blue-500">
                                <li><strong>World Trade Organization (WTO):</strong> Establishes the legal framework through the Agreement on Agriculture (AoA), focusing on market access, domestic support reduction, and the elimination of export subsidies.</li>
                                <li><strong>International Grains Council (IGC):</strong> Oversees the Grains Trade Convention to foster cooperation and market transparency, providing vital data like the Grains and Oilseeds Index (GOI).</li>
                                <li><strong>Codex Alimentarius Commission:</strong> Sets scientific safety standards (e.g., Maximum Residue Limits for pesticides) that serve as the benchmark for national regulations under the WTO SPS Agreement.</li>
                            </ul>
                        </div>
                    </section>

                    {/* Section: Market Statistics */}
                    <section id="stats" className="scroll-mt-24">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                            Global Grain Market Statistics (2024-2026)
                        </h2>
                        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm">
                            <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
                                <h3 className="font-semibold text-gray-900 dark:text-white">Table 1: Global Wheat Production and Export Leaders (2024/2025)</h3>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm text-left">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                        <tr>
                                            <th className="px-6 py-3">Country</th>
                                            <th className="px-6 py-3">Production (MMT)</th>
                                            <th className="px-6 py-3">Global Share (%)</th>
                                            <th className="px-6 py-3">Export Volume (MMT)</th>
                                            <th className="px-6 py-3">Global Export Share (%)</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                        <tr className="bg-white dark:bg-gray-800">
                                            <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">China</td>
                                            <td className="px-6 py-4">140.1</td>
                                            <td className="px-6 py-4">18%</td>
                                            <td className="px-6 py-4">-</td>
                                            <td className="px-6 py-4">-</td>
                                        </tr>
                                        <tr className="bg-gray-50 dark:bg-gray-900/30">
                                            <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">European Union</td>
                                            <td className="px-6 py-4">122.12</td>
                                            <td className="px-6 py-4">15%</td>
                                            <td className="px-6 py-4">13.47</td>
                                            <td className="px-6 py-4">6.7%</td>
                                        </tr>
                                        <tr className="bg-white dark:bg-gray-800">
                                            <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">India</td>
                                            <td className="px-6 py-4">113.29</td>
                                            <td className="px-6 py-4">14%</td>
                                            <td className="px-6 py-4">-</td>
                                            <td className="px-6 py-4">-</td>
                                        </tr>
                                        <tr className="bg-blue-50 dark:bg-blue-900/10">
                                            <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">Russia</td>
                                            <td className="px-6 py-4">81.6</td>
                                            <td className="px-6 py-4">10%</td>
                                            <td className="px-6 py-4 font-bold text-blue-600">46.0</td>
                                            <td className="px-6 py-4 font-bold text-blue-600">16%</td>
                                        </tr>
                                        <tr className="bg-white dark:bg-gray-800">
                                            <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">United States</td>
                                            <td className="px-6 py-4">53.65</td>
                                            <td className="px-6 py-4">7%</td>
                                            <td className="px-6 py-4">17.94</td>
                                            <td className="px-6 py-4">10.4%</td>
                                        </tr>
                                        <tr className="bg-gray-50 dark:bg-gray-900/30">
                                            <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">Canada</td>
                                            <td className="px-6 py-4">34.96</td>
                                            <td className="px-6 py-4">4%</td>
                                            <td className="px-6 py-4">25.57</td>
                                            <td className="px-6 py-4">15%</td>
                                        </tr>
                                        <tr className="bg-white dark:bg-gray-800">
                                            <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">Australia</td>
                                            <td className="px-6 py-4">34.11</td>
                                            <td className="px-6 py-4">4%</td>
                                            <td className="px-6 py-4">29.29</td>
                                            <td className="px-6 py-4">15.8%</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <p className="text-sm text-gray-500 mt-2">Source: Straits Research, 2024/25 data.</p>
                    </section>

                    {/* Section: North American Regulatory Architectures */}
                    <section id="north-america" className="scroll-mt-24">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                            <Shield className="w-6 h-6 text-green-600" />
                            North American Regulatory Architectures
                        </h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">United States (USDA FGIS)</h3>
                                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                                    The Federal Grain Inspection Service (FGIS) manages a mandatory national inspection and weighing system for exports, ensuring international buyers receive what they purchased.
                                </p>
                                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                                    <li className="flex items-start gap-2">
                                        <span className="text-green-500 mt-1">●</span>
                                        <span><strong>Public-Private Partnership:</strong> FGIS supervises authorized agencies.</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-green-500 mt-1">●</span>
                                        <span><strong>Phytosanitary:</strong> Regulated by APHIS via PCIT system.</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Canada (CGC)</h3>
                                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                                    The Canadian Grain Commission (CGC) maintains the "Official Grain Grading Guide" and focuses on maintaining the high-quality brand of Canadian wheat (e.g., CWRS).
                                </p>
                                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                                    <li className="flex items-start gap-2">
                                        <span className="text-red-500 mt-1">●</span>
                                        <span><strong>Science-Based Standards:</strong> Regulates grading factors like Ergot and Sclerotinia.</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-red-500 mt-1">●</span>
                                        <span><strong>Producer Protection:</strong> "Final Quality Determination" service for grade disputes.</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Section: European Union */}
                    <section id="eu" className="scroll-mt-24">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                            European Union: Trade & Customs
                        </h2>
                        <div className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
                            <p>
                                The EU system relies on Tariff Rate Quotas (TRQs) and import licensing managed by DG AGRI. A significant shift occurred in June 2025 regarding trade with Ukraine:
                            </p>
                            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 border-l-4 border-yellow-400 rounded-r-lg my-4">
                                <h4 className="font-bold text-yellow-800 dark:text-yellow-200 m-0">2025 Ukraine TRQ Reinstatement</h4>
                                <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1 m-0">
                                    The EU reintroduced specific volume limits: 1,000,000 tons for wheat and 650,000 tons for maize, with steep out-of-quota tariffs (€95/ton) to stabilize the internal market.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Section: Black Sea Geopolitics */}
                    <section id="black-sea" className="scroll-mt-24">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                            Black Sea Geopolitics: Russia & Ukraine
                        </h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-white dark:bg-gray-800 p-5 rounded-lg border border-gray-200 dark:border-gray-700">
                                <h3 className="font-bold text-gray-900 dark:text-white">Russia (Rosselkhoznadzor)</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                                    Known for rigorous and sometimes political enforcement of phytosanitary standards. Recently used restrictions on clean wheat imports from Kazakhstan as a lever. Requires extensive documentation in Russian.
                                </p>
                            </div>
                            <div className="bg-white dark:bg-gray-800 p-5 rounded-lg border border-gray-200 dark:border-gray-700">
                                <h3 className="font-bold text-gray-900 dark:text-white">Ukraine (SSUFSCP)</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                                    Implemented Decree 1481 in late 2024 to set up voluntary export licensing/quotas for shipments to EU neighbors (Poland, Hungary, etc.) to prevent trade tension.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Section: Asia */}
                    <section id="asia" className="scroll-mt-24">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                            Asia: Import & Export Barriers
                        </h2>
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                    <span className="text-red-600">🇨🇳</span> China: GACC & CIFER
                                </h3>
                                <p className="text-gray-700 dark:text-gray-300 mt-2">
                                    All foreign food manufacturers must register via the <strong>CIFER single-window system</strong> (Decrees 248 & 249). "High-risk" categories like grains require recommendation from the exporter's local authority (e.g., USDA) and facility audits.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                    <span className="text-orange-500">🇮🇳</span> India: APEDA & Export bans
                                </h3>
                                <p className="text-gray-700 dark:text-gray-300 mt-2">
                                    Managed by DGFT and APEDA. Frequently imposes export bans on rice/wheat to control domestic inflation. Strict "Khapra Beetle" protocols for exports to sensitive markets like the USA.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Section: Strategic Takeaways */}
                    <section id="takeaways" className="scroll-mt-24">
                        <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-8 border border-indigo-100 dark:border-indigo-800">
                            <h2 className="text-2xl font-bold text-indigo-900 dark:text-indigo-200 mb-6 flex items-center gap-2">
                                <Info className="w-6 h-6" />
                                Strategic Takeaways for Market Participants
                            </h2>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="bg-white dark:bg-gray-900 p-5 rounded-lg shadow-sm">
                                    <h4 className="font-bold text-indigo-700 dark:text-indigo-400 mb-2">1. Digital Compliance</h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        Compliance is now digital and real-time (CIFER, LORI). Exporters must master these portals to survive.
                                    </p>
                                </div>
                                <div className="bg-white dark:bg-gray-900 p-5 rounded-lg shadow-sm">
                                    <h4 className="font-bold text-indigo-700 dark:text-indigo-400 mb-2">2. Strategic Diversification</h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        Importers like Egypt are shifting to direct commercial purchases, diversifying origins beyond traditional tenders.
                                    </p>
                                </div>
                                <div className="bg-white dark:bg-gray-900 p-5 rounded-lg shadow-sm">
                                    <h4 className="font-bold text-indigo-700 dark:text-indigo-400 mb-2">3. Geopolitical Standards</h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        Phytosanitary rules are increasingly used as tools of statecraft (e.g., Russia vs. Kazakhstan).
                                    </p>
                                </div>
                                <div className="bg-white dark:bg-gray-900 p-5 rounded-lg shadow-sm">
                                    <h4 className="font-bold text-indigo-700 dark:text-indigo-400 mb-2">4. Quality Integrity</h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        North American grading standards (FGIS/CGC) remain the global "common language" for high-value trade.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Works Cited */}
                    <section className="border-t border-gray-200 dark:border-gray-800 pt-8 mt-12">
                        <h3 className="text-lg font-bold text-gray-500 uppercase tracking-wider mb-4">References & Works Cited</h3>
                        <div className="text-xs text-gray-500 dark:text-gray-400 space-y-2 font-mono h-48 overflow-y-auto pr-4">
                            <p>1. Top 10 Wheat-Producing Countries in 2024/25 - Straits Research</p>
                            <p>2. International Grains Council (IGC) - https://www.igc.int/</p>
                            <p>3. Official Grain Inspection & Weighing System - USDA AMS</p>
                            <p>4. Canadian Grain Commission - https://www.grainscanada.gc.ca/</p>
                            <p>5. The WTO and EU Agriculture - European Commission</p>
                            <p>6. WTO Agreement on Agriculture - UNCTAD</p>
                            <p>44. GACC Registration China Guide (2025) - FDI China</p>
                            <p>58. Exporting plants and plant products - Australian DAFF</p>
                            <p>62. How Egypt is rewiring its wheat supply chain - Miller Magazine</p>
                            <p>(Full list available in original report data)</p>
                        </div>
                    </section>

                </div>
            </div>
        </div>
    );
}
