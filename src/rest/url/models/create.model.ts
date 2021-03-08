import { IsUrl } from 'class-validator';

export class CreateUrlRequest {
  @IsUrl()
  public url: string;
}

export class CreateUrlResponse {
  public newUrl: string;
}
