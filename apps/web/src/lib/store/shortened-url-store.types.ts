import { ShortenedUrlEntity } from "@/app/actions/entities/shortened-url.entity";

export interface ShortenedUrlStoreProps {
    urls: ShortenedUrlEntity[];
    addUrl: (newUrl: ShortenedUrlEntity) => void;
    removeUrl: (hash: string) => void;
}