import { Injectable } from '@nestjs/common';

@Injectable()
export class UrlHelper {
  public addProtocolIfNotExists(url: string, protocol = 'http'): string {
    if (!/^(?:f|ht)tps?:\/\//.test(url)) {
      return `${protocol}://${url}`;
    }
    return url;
  }
}
