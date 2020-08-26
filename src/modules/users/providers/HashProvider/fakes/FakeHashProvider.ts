import IHashProvider from '../models/IHashProvider';

class FakeHashProvider implements IHashProvider {
    public async compareHash(payload: string, hashed: string): Promise<boolean> {
        return new Promise(resolve => resolve(payload === hashed));
    }

    public async generateHash(payload: string): Promise<string> {
        return new Promise(resolve => resolve(payload));
    }
}

export default FakeHashProvider;
