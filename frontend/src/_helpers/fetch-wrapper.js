import { useRecoilState } from 'recoil';

export function useFetchWrapper() {
  const request = (method) => {
    return (url, body) => {
      const requestOptions = {
        method,
        headers: authHeader(url)
      };
      if (body) {
        console.log(body)
        requestOptions.headers['Content-Type'] = 'application/json';
        requestOptions.body = JSON.stringify(body);
      }
      return fetch(url, requestOptions).then(handleResponse)
    }
  }

  const handleResponse = (response) => {
    return response.text().then(text => {
        console.log(text)
        const data = text && JSON.parse(text);
        console.log("dat:", data)
        if (!response.ok) {
            if ([401, 403].includes(response.status) ) { // && auth?.token) {
                // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
                // localStorage.removeItem('user');
                // setAuth(null);
                // history.push('/account/login');
            }
            const error = (data && data.message) || response.statusText;
            // alertActions.error(error);
            return Promise.reject(error);
        }

        return data;
    });
  }

  const authHeader = (url) => {
    return {}
  }

  return {
    get: request('GET'),
    post: request('POST'),
    put: request('PUT'),
    delete: request('DELETE'),
  }
  
  
}