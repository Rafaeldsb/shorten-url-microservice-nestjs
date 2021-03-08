import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { IHandler } from '@base/handler.base';
import { Url } from '@base/models/url.model';
import { from, Observable, of } from 'rxjs';
import {
  UrlRepository,
  urlRepositorySymbol,
} from '@base/repositories/url.repository';
import { GetUrl } from './get-shortened-url.model';
import { switchMap } from 'rxjs/operators';
import { Cache } from 'cache-manager';

@Injectable()
export class GetShortenedUrlHandler implements IHandler<GetUrl, Url> {
  constructor(
    @Inject(CACHE_MANAGER)
    private readonly cache: Cache,
    @Inject(urlRepositorySymbol)
    private readonly urlRepository: UrlRepository,
  ) {}

  execute(data: GetUrl): Observable<Url> {
    return from(this.cache.get(data.code)).pipe(
      switchMap((url: Url) => {
        if (!url) {
          return from(this.urlRepository.getByCode(data.code));
        }
        return of(url);
      }),
    );
  }
}
