import Hashids from "hashids";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class HashingService {
    private readonly hashids: Hashids;
  constructor(
    private readonly configService: ConfigService) {
        const salt = this.configService.getOrThrow<string>('HASH_SALT');
        const minLength = parseInt(this.configService.getOrThrow<string>('HASH_MIN_LENGTH'), 10);

        this.hashids = new Hashids(salt, minLength);
    }

  public encode(num: number): string {
    return this.hashids.encode(num);
  }
}
