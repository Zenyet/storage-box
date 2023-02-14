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
  }
}

export interface RespType {
  '@odata.context': string,
  'value': ItemType[]
}

export interface AuthType {
  token_type: string | 'Bearer',
  scope: string,
  expires_in: number,
  ext_expires_in: number,
  access_token: string,
  refresh_token: string
}