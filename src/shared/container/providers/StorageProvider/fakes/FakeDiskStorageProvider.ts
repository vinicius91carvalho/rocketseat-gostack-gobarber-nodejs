import IStorageProvider from '../models/IStorageProvider';

export default class FakeStorageProvider implements IStorageProvider {
    private storage: string[] = [];

    saveFile(file: string): Promise<string> {
        this.storage.push(file);
        return new Promise<string>(resolve => resolve(file));
    }

    deleteFile(file: string): Promise<void> {
        const findIndex = this.storage.findIndex(storageFile => storageFile === file);
        this.storage.splice(findIndex, 1);
        return new Promise<void>(resolve => resolve());
    }
}
