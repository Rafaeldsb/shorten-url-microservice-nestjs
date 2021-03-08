import { Url } from '@base/models/url.model';
import { urlClientSymbol } from '@microservice/client.module';
import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Request, Response } from 'express';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { CreateUrlRequest, CreateUrlResponse } from './models/create.model';

@Controller('/')
export class UrlController {
  constructor(
    @Inject(urlClientSymbol)
    private readonly client: ClientProxy,
  ) {}

  @Post()
  create(
    @Body() data: CreateUrlRequest,
    @Req() req: Request,
  ): Observable<CreateUrlResponse> {
    return this.client
      .send({ cmd: 'shorten_url' }, { url: data.url, basePath: req.hostname })
      .pipe(
        map((url: Url) => ({
          newUrl: url.shortenedUrl,
        })),
      );
  }

  @Get(':code')
  redirect(@Param('code') code: string, @Res() res: Response) {
    return this.client.send({ cmd: 'get_shortened_url' }, { code }).pipe(
      tap((url: Url) => {
        if (!url) return res.sendStatus(404);
        res.redirect(url.originalUrl, 301);
      }),
    );
  }
}
