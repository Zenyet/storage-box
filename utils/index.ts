import RequestInit = NodeJS.RequestInit;

export async function request<T>(url: string, extended: RequestInit): Promise<T> {
  return await (await fetch(url, {
    method: extended.method ?? 'GET',
    ...extended,
  })).json().catch(err => {
    console.log('@Oops, request doesnt work!', err);
  });
}

export function matches(extension: string, type: 'image' | 'video' | 'markdown' | 'audio'): boolean {
  const imgExtensions: Array<string> = ['jpg', 'jpeg', 'webp', 'png', 'bmp', 'gif', 'svg', 'avif', 'exif'];
  const videoExtensions: Array<string> = ['mp4', 'mkv', 'mpeg', 'flv'];
  if (type === 'image') {
    return imgExtensions.includes(extension);
  }
  if(type === 'video') {
    return videoExtensions.includes(extension);
  }
  return false
}
