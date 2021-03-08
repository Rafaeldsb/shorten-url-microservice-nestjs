import { ClientsModule, MicroserviceOptions, Transport } from '@nestjs/microservices';

export const urlClientSymbol = Symbol.for('URL_CLIENT');

export const appOptions: MicroserviceOptions = {
  transport: Transport.TCP,
  options: {
    port: 4000,
  },
} as const;

export const urlClient = ClientsModule.register([
  {
    name: urlClientSymbol,
    transport: appOptions.transport,
    options: appOptions.options,
  },
]);
