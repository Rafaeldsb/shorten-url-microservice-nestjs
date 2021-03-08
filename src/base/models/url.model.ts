export class Url {
  public code: string;
  public originalUrl: string;
  public shortenedUrl: string;
  public expiration: string;

  constructor(options: Url) {
    this.code = options.code;
    this.originalUrl = options.originalUrl;
    this.shortenedUrl = options.shortenedUrl;
    this.expiration = options.expiration;
  }
}
