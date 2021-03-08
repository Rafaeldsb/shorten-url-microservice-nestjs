import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Url {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public code: string;

  @Column()
  originalUrl: string;

  @Column()
  shortenedUrl: string;

  @Column()
  expiration: string;
}
