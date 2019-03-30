export default class FileInformation {

  constructor(private _url: string){}

  public get extension() {
    return this._url.split(/\#|\?/)[0].split('.').pop().trim()
  }

  public get fileName() {
    return this._url.split('.').slice(0, -1).join('.')
  }

  public get fileNameWithoutSizeInfo() {
    return this.fileName.split('@').slice(0, 1).join('@')
  }
}
