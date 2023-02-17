export interface ItemType {
  createdDateTime: string,
  eTag: string,
  id: string,
  lastModifiedDateTime: string,
  name: string,
  cTag: string,
  size: number,
  parentReference: string,
  folder?: { childCount: number };
  '@microsoft.graph.downloadUrl'?: string,
  file?: {
    mimeType: string,
    hashes: {
      quickXorHash: string
    }
  },
  thumbnail?: ThumbType
}

export interface RespType {
  '@odata.context': string,
  'value': ItemType[]
}

export interface ThumbType {
  height: number,
  width: number,
  url: string
}

export interface AuthType {
  token_type: string | 'Bearer',
  scope: string,
  expires_in: number,
  ext_expires_in: number,
  access_token: string,
  refresh_token: string
}

export interface Store {
  client_id?: string,
  client_secret?: string,
  redirect_uri?: string,
  refresh_token?: string,
  access_token?: string,
  expire?: string,
  ac_before?: number,
  rf_before?: number,
  grant_type?: 'refresh_token' | 'authorization_code'
}

export interface PreviewConfig {
  show: boolean,
  left?: string,
  top?: string,
  url?: string,
  filename?: string,
  extension?: string
}