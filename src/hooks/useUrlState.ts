import { useCallback } from 'react';

interface UrlState {
  tab?: string;
  techStack?: boolean;
  filtersOpen?: boolean;
  companiesOpen?: boolean;
  search?: string;
  type?: string;
  country?: string;
  sort?: string;
  page?: number;
  company?: number;
  collection?: string;
  // Scenario Explorer parameters
  region?: string;
  onFarm?: number;
  elevator?: number;
  regulatory?: number;
}

export function useUrlState() {
  const getStateFromUrl = useCallback((): UrlState => {
    const params = new URLSearchParams(window.location.search);
    const state: UrlState = {};

    const tab = params.get('tab');
    if (tab) state.tab = tab;

    const techStack = params.get('techStack');
    if (techStack) state.techStack = techStack === '1' || techStack === 'true' || techStack === 'open';

    const filters = params.get('filters');
    if (filters) state.filtersOpen = !(filters === '0' || filters === 'false' || filters === 'closed');

    const companies = params.get('companies');
    if (companies) state.companiesOpen = !(companies === '0' || companies === 'false' || companies === 'closed');

    const search = params.get('search');
    if (search) state.search = search;

    const type = params.get('type');
    if (type) state.type = type;

    const country = params.get('country');
    if (country) state.country = country;

    const sort = params.get('sort');
    if (sort) state.sort = sort;

    const page = params.get('page');
    if (page) state.page = parseInt(page, 10);

    const company = params.get('company');
    if (company) state.company = parseInt(company, 10);

    const collection = params.get('collection');
    if (collection) state.collection = collection;

    // Scenario parameters
    const region = params.get('region');
    if (region) state.region = region;

    const onFarm = params.get('onFarm');
    if (onFarm) state.onFarm = parseInt(onFarm, 10);

    const elevator = params.get('elevator');
    if (elevator) state.elevator = parseInt(elevator, 10);

    const regulatory = params.get('regulatory');
    if (regulatory) state.regulatory = parseInt(regulatory, 10);

    return state;
  }, []);

  const setUrlState = useCallback((state: UrlState) => {
    const params = new URLSearchParams();

    if (state.tab && state.tab !== 'landscape') params.set('tab', state.tab);
    if (state.techStack) params.set('techStack', '1');
    if (state.filtersOpen === false) params.set('filters', '0');
    if (state.companiesOpen === false) params.set('companies', '0');
    if (state.search) params.set('search', state.search);
    if (state.type && state.type !== 'All') params.set('type', state.type);
    if (state.country && state.country !== 'All') params.set('country', state.country);
    if (state.sort && state.sort !== 'name') params.set('sort', state.sort);
    if (state.page && state.page > 1) params.set('page', state.page.toString());
    if (state.company) params.set('company', state.company.toString());
    if (state.collection) params.set('collection', state.collection);
    // Scenario parameters
    if (state.region && state.region !== 'Global') params.set('region', state.region);
    if (state.onFarm !== undefined && state.onFarm > 0) params.set('onFarm', state.onFarm.toString());
    if (state.elevator !== undefined && state.elevator > 0) params.set('elevator', state.elevator.toString());
    if (state.regulatory !== undefined && state.regulatory > 0) params.set('regulatory', state.regulatory.toString());

    const queryString = params.toString();
    const newUrl = queryString
      ? `${window.location.pathname}?${queryString}`
      : window.location.pathname;

    window.history.replaceState({}, '', newUrl);
  }, []);

  const getShareableUrl = useCallback((state: UrlState): string => {
    const params = new URLSearchParams();

    if (state.tab && state.tab !== 'landscape') params.set('tab', state.tab);
    if (state.techStack) params.set('techStack', '1');
    if (state.filtersOpen === false) params.set('filters', '0');
    if (state.companiesOpen === false) params.set('companies', '0');
    if (state.search) params.set('search', state.search);
    if (state.type && state.type !== 'All') params.set('type', state.type);
    if (state.country && state.country !== 'All') params.set('country', state.country);
    if (state.sort && state.sort !== 'name') params.set('sort', state.sort);
    if (state.company) params.set('company', state.company.toString());
    // Scenario parameters
    if (state.region && state.region !== 'Global') params.set('region', state.region);
    if (state.onFarm !== undefined && state.onFarm > 0) params.set('onFarm', state.onFarm.toString());
    if (state.elevator !== undefined && state.elevator > 0) params.set('elevator', state.elevator.toString());
    if (state.regulatory !== undefined && state.regulatory > 0) params.set('regulatory', state.regulatory.toString());

    const queryString = params.toString();
    return queryString
      ? `${window.location.origin}${window.location.pathname}?${queryString}`
      : `${window.location.origin}${window.location.pathname}`;
  }, []);

  const copyShareableUrl = useCallback(async (state: UrlState): Promise<boolean> => {
    const url = getShareableUrl(state);
    try {
      await navigator.clipboard.writeText(url);
      return true;
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = url;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        document.body.removeChild(textArea);
        return true;
      } catch {
        document.body.removeChild(textArea);
        return false;
      }
    }
  }, [getShareableUrl]);

  return {
    getStateFromUrl,
    setUrlState,
    getShareableUrl,
    copyShareableUrl,
  };
}

export default useUrlState;
