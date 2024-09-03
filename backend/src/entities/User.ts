import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('user')
export class User {
  @PrimaryColumn({ type: 'varchar', length: 100 })
  username!: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  email!: string; // Optional column
}
