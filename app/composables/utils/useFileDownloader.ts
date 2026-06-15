export const useFileDownloader = () => {
  const downloadFile = (url: string, filename: string) => {
    const link = document.createElement('a')
    link.href = url
    link.download = filename || 'download'
    link.click()
  }

  return {
    downloadFile
  }
}
