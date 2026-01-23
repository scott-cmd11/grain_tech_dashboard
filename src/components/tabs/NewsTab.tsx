import { NewsFeed } from '../index';

export function NewsTab() {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col gap-3">
                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Industry <span className="text-gold-accent">Updates</span>
                </h1>
                <p className="text-gray-600 dark:text-gray-400 max-w-2xl text-base">
                    Stay informed with the latest news, regulations, and technological breakthroughs in the Global Grain Inspection industry.
                </p>
            </div>

            <NewsFeed />
        </div>
    );
}
