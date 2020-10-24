import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

import {TOKEN} from '~/storage/constants';

const api = axios.create({
  baseURL: 'http://127.0.0.1:3333/',
  // headers: {
  //     "Content-Type": "multipart/form-data",
  // }
});

// api.defaults.headers.post['Content-Type'] = 'multipart/form-data';

api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem(TOKEN);

  if (token) {
    config.headers.Accept = 'application/json';
    config.headers.Authorization = 'Bearer ' + token;
  }
  // config.headers['Content-Type'] = 'multipart/form-data';
  // config.headers.contentType = 'application/x-www-form-urlencoded';

  return config;
});

// api.interceptors.response.use(async response => {
//     console.log("Resposta da API", response)
//     return response;

// }, async error => {
//     console.log("ERRO---<>", error)
//     const { config, response: { status } } = error;
//     console.log("---------------->", config)
//     let isRefreshing = false;
//     const originalRequest = config;
//     console.log("Resposta da API", error.response)
//     switch (status) {
//         case 400:
//             // TODO Mesangem de erro de requisição inválida
//             // console.log("AQUI", error.response)
//             // Criando uma nova promise para tentativa de refresh token
//             return await new Promise((resolve, reject) => {
//                 resolve(error.response)
//                 // reject(error.response)
//             });
//         case 401:
//             if (!isRefreshing) {
//                 isRefreshing = true;

//                 // Se retornar 401 é porque o usuário nao está autenticado.
//                 // Então é feito uma requisição para o refresh token com o ultimo token utilizado
//                 // await api.post('/refresh')
//                 //     .then((newToken: any) => {
//                 //         if ((newToken != undefined || newToken != null) &&
//                 //             (newToken.data.token != null || newToken.data.token != undefined)) {
//                 //             isRefreshing = false;
//                 //             login(newToken.data.token);
//                 //             onRrefreshed(newToken);
//                 //         }
//                 //         else {
//                 //             window.location.href = '/unauthorized';
//                 //             logout();
//                 //         }
//                 //     });

//             }

//             return await retryOriginalRequest;
//         case 400:
//         case 404:
//         case 422:
//         case 500:
//             if (originalRequest.url != "https://cronos.vizzarconsultoria.com/api/login" ||
//                 originalRequest.url != "https://cronos.vizzarconsultoria.com/api/user") { }
//             else if (!isRefreshing) {
//                 isRefreshing = true;

//                 // Atualizamos o login para evitar de cair a sessão com token na blacklist.
//                 // await api.post('/refresh')
//                 //     .then((newToken: any) => {
//                 //         if ((newToken != undefined || newToken != null) &&
//                 //             (newToken.data.token != null || newToken.data.token != undefined)) {
//                 //             isRefreshing = false;
//                 //             login(newToken.data.token);
//                 //         }
//                 //         else {
//                 //             window.location.href = '/unauthorized';
//                 //             logout();
//                 //         }
//                 //     });
//             }

//             return await new Promise((resolve, reject) => {
//                 resolve(error.response)
//                 reject(error.response)
//             });
//         default:
//             // TODO Mensagem de falha interna seguida de logout
//             // Toastr('error', 'Falha interna', 'Acesso negado devido à um erro interno.')
//             // logout();
//             return Promise.reject(error);
//     }
// });

export default api;
