const config = {
  OAuthURL: 'https://login.microsoftonline.com/common/oauth2/v2.0',
  graphURL: 'https://graph.microsoft.com/v1.0/me/drive/root',
  redisURL: 'rediss://default:694891fefb294811a55a5e44fb7111ff@apn1-legible-dane-34555.upstash.io:34555',
  // use cloudflare workers KV
  key_name: 'box',
  account_identifier: '5a55831d04fb710f29a8743ae1736d8b', // 在你的 Workers页面中的 Account ID
  namespaces_identifier: '6126968a09be406fa34b1e77ef17cf77', // KV 中创建时的 ID
  x_auth_email: 'zenyet1998@gmail.com', // Cloudflare 账号
  x_auth_key: '', // 默认不用这个, 权限太高
  x_bearer: 'Bearer 68TUtfdTNKRJYxyEU5mrmh05epNEWG8o50c-s-ce', //在 Cloudflare 自定义的 API token 可以自定义权限，比较安全
  redirect_url: '',
  lockedFolder: 'pwd'
};

export default config;