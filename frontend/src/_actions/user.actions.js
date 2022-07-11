import { useRecoilState } from 'recoil';

import { userAtom } from '../_state/user.js';
import { useFetchWrapper } from '../_helpers/fetch-wrapper.js';

export function useActions() {
  const fetchWrapper = useFetchWrapper();
  const [user, setUser] = useRecoilState(userAtom);

  const get = () => {
    return fetchWrapper.get('http://localhost:9000/api/user').then(setUser);
  };

  return { get };
}
