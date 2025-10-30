export class AuthUtils {
    static getBcryptSaltRounds(): number {
        const rounds = process.env.BCRYPT_SALT_ROUNDS;
        return rounds ? parseInt(rounds, 10) : 10;
    }
}