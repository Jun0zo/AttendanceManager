import { useRecoilState } from 'recoil';

import { userAtom } from '../_state/user.js';
import { useFetchWrapper } from '../_helpers/fetch-wrapper.js';

export function useActions() {
  const fetchWrapper = useFetchWrapper();
  const [user, setUser] = useRecoilState(userAtom);

  const get = (company) => {
    company = company ? company : -1;
    let url = `http://localhost:9000/api/user?company=${company}`;
    return fetchWrapper.get(url).then(setUser);
  };

  return { get };
}
