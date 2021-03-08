import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { IHandler } from '@base/handler.base';
import { Url } from '@base/models/url.model';
import { from, Observable } from 'rxjs';
import { UrlRepository, urlRepositorySymbol } from '@base/repositories/url.repository';
import { StringHelper } from '@microservice/helpers/string.helper';
import { UrlHelper } from '@microservice/helpers/url.helper';
import { CreateUrl } from './shorten-url.model';
import { switchMap } from 'rxjs/operators';
import { Cache } from 'cache-manager';

@Injectable()
export class ShortenUrlHandler implements IHandler<CreateUrl, Url> {
  constructor(
    @Inject(CACHE_MANAGER)
    private readonly cache: Cache,
    @Inject(urlRepositorySymbol)
    private readonly urlRepository: UrlRepository,
    private readonly stringHelper: StringHelper,
    private readonly urlHelper: UrlHelper,
  ) {}

  execute(data: CreateUrl): Observable<Url> {
    return from(this.create(data)).pipe(
      switchMap(async (url) => {
        await this.urlRepository.add(url);
        await this.cache.set(url.code, url);
        return url;
      }),
    );
  }

  public async create(data: CreateUrl): Promise<Url> {
    const code = await this.generateUniqueCode();
    const shortenedUrl = this.generateShortenedUrl(data, code);

    const originalUrl = this.urlHelper.addProtocolIfNotExists(data.url);

    const url = new Url({
      originalUrl,
      code,
      shortenedUrl,
      expiration: new Date().toISOString(),
    });
    return url;
  }

  private async generateUniqueCode(): Promise<string> {
    let code: string;

    do {
      code = this.stringHelper.generateRandomCode(5, 10);
    } while (await this.urlRepository.existsByCode(code));

    return code;
  }

  private generateShortenedUrl(data: CreateUrl, code: string): string {
    return `https://${data.basePath}/${code}`;
  }
}
