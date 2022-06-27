import { useSetRecoilState, useResetRecoilState, useRecoilState } from 'recoil';

import { companyAtom } from '../_state/company.js';
import { useFetchWrapper } from '../_helpers/fetch-wrapper.js'

export function useActions() {
  const fetchWrapper = useFetchWrapper();
  const [company, setCompany] = useRecoilState(companyAtom);

  const get = () => {
    return fetchWrapper.get('http://localhost:9000/api/company').then(setCompany)
  }

  return {get}
}