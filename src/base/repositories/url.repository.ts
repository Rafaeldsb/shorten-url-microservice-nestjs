import { Url } from '@base/models/url.model';

export const urlRepositorySymbol = Symbol.for('URL_REPOSITORY');

export interface UrlRepository {
  add(item: Url): Promise<Url>;

  getByCode(code: string): Promise<Url | null>;

  existsByCode(code: string): Promise<boolean>;
}
