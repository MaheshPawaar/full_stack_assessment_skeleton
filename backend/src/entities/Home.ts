import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { UserHome } from './UserHome'; 

@Entity()
export class Home {
  @PrimaryColumn({ type: 'varchar' })
  street_address!:string;

  @Column({ type: 'varchar' })
  state!: string;

  @Column({ type: 'varchar' })
  zip!: string;

  @Column({ type: 'float' })
  sqft!: number;

  @Column({ type: 'int' })
  beds!: number;

  @Column({ type: 'int' })
  baths!: number;

  @Column({ type: 'float' })
  list_price!: number;

  @OneToMany(() => UserHome, userHome => userHome.home)
  userHomes!: UserHome[];
}
