import { Url } from '@base/models/url.model';
import { Url as UrlModel } from '@infrastructure/postgres/models/url.model';
import { UrlRepository } from '@base/repositories/url.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UrlRepositoryPostgres implements UrlRepository {
  constructor(
    @InjectRepository(UrlModel)
    private urlRepository: Repository<UrlModel>,
  ) {}

  public add(item: Url): Promise<Url> {
    const url = this.urlRepository.create(item);
    return this.urlRepository.save(url);
  }
  public getByCode(code: string): Promise<Url> {
    return this.urlRepository.findOne({ where: { code } });
  }
  public existsByCode(code: string): Promise<boolean> {
    return this.urlRepository
      .count({ where: { code } })
      .then((count) => count > 0);
  }
}
