import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';


@Entity()
export  class User {

    @PrimaryGeneratedColumn()
     id!: number;

    @Column()
    firstName!: string;

    @Column()
    lastName!: string;

    school!: string;
    @Column()
    email!: string;
    @Column()
    password!: string;
    @Column()
    age!: number;
    @Column()
    gender!: string;

    @Column()
    language!: string;

    @Column()
    username!: string;

    @Column()
    passed!: number;

    @Column()
    failed!: number;


}