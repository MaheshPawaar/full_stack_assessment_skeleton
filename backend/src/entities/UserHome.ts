import { Entity,  ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { User } from './User'; 
import { Home } from './Home'; 

@Entity('user_home_new')
export class UserHome {
  @PrimaryColumn({ type: 'varchar' })
  username!: string;

  @PrimaryColumn({ type: 'varchar' })
  street_address!: string; 

  @ManyToOne(() => User, user => user.username!, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'username', referencedColumnName: 'username' })
  user!: User;

  @ManyToOne(() => Home, home => home.userHomes, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'street_address', referencedColumnName: 'street_address' })
  home!: Home;
}
