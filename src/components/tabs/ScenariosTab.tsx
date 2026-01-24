import { useCallback } from 'react';
import { ScenarioExplorer } from '../index';
import { useUrlState } from '../../hooks/useUrlState';

export function ScenariosTab() {
    const { getStateFromUrl, setUrlState } = useUrlState();
    const urlState = getStateFromUrl();

    const handleStateChange = useCallback((state: { region: string; onFarm: number; elevator: number; regulatory: number }) => {
        setUrlState({
            ...urlState,
            tab: 'scenarios',
            region: state.region,
            onFarm: state.onFarm,
            elevator: state.elevator,
            regulatory: state.regulatory,
        });
    }, [urlState, setUrlState]);

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <ScenarioExplorer
                initialRegion={urlState.region}
                initialOnFarm={urlState.onFarm}
                initialElevator={urlState.elevator}
                initialRegulatory={urlState.regulatory}
                onStateChange={handleStateChange}
            />
        </div>
    );
}
