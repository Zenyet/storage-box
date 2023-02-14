export default function useDownload(downloadURL: string) {
  const anchor: HTMLAnchorElement = document.createElement('a');
  anchor.href = downloadURL;
  anchor.click();
}