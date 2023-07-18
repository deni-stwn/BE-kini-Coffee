import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class contacts {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  phone_number: string

  @Column()
  email: string

  @Column()
  username_instagram: string

  @Column()
  youtube_channel: string
  
}