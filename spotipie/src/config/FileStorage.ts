export default class FileStorage {

  constructor(private storage: Storage){
    this.storage.setItem('file', 'false');
  }

  setItem() {
    this.storage.setItem('file','true');
  }

  deleteAll() {
    this.storage.clear();
  }

  isFileUpload() {
    console.log(" this.storage.getItem('file') : "+  this.storage.getItem('file'));
    return this.storage.getItem('file') === 'true';
  }
}