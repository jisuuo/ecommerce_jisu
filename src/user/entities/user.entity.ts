import { BeforeInsert, Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { BaseEntity } from '../../common/base.entity';
import * as bcrypt from 'bcryptjs';
import { InternalServerErrorException } from '@nestjs/common';
import { Role } from './role.enum';
import { Provider } from './provider.enum';
<<<<<<< HEAD
// import * as gravatar from 'gravatar';
import { Exclude } from 'class-transformer';
import { AddressEntity } from './address.entity';
import { LocalFile } from '../../local-file/entities/local-file.entity';
=======
import { Exclude } from 'class-transformer';
import { AddressEntity } from './address.entity';
import * as gravatar from 'gravatar';
>>>>>>> jisu

@Entity()
export class User extends BaseEntity {
  @Column()
  public username: string;

  @Column({
    unique: true,
  })
  public email: string;

  @Column({
    nullable: true,
  })
  // response 데이터 표시 제외 항목 설정
  @Exclude()
  public password?: string;

  // RefreshToken RDB에 담기
  // 1. 로그인 시 RDB에 넣기
  // 2. refreshToken 해시 RDB애서 해싱값과 비교 (with RefreshAPI)
  // 3. 로그아웃 시 RDB에서 삭제
  @Column({
    nullable: true,
  })
  @Exclude()
  public refreshToken?: string;

  @Column({
    default: false,
  })
  @Exclude()
  public isEmailVerify: boolean;

  @Column({
    type: 'enum',
    enum: Role,
    array: true,
    default: [Role.USER],
  })
  public roles: Role[];

  @Column({
    type: 'enum',
    enum: Provider,
    default: Provider.LOCAL,
  })
  public provider: Provider;

  // @JoinColumn({ name: 'profileImg' })
  // @OneToOne(() => LocalFile, {
  //   nullable: true,
  // })
  // public avatar?: LocalFile;

  @JoinColumn({ name: 'profileImg' })
  @OneToOne(() => LocalFile, {
    nullable: true,
  })
  public avatar?: LocalFile;

  @Column({
    nullable: true,
  })
  public profileImg?: string;

  @OneToOne(() => AddressEntity, {
    eager: true,
    cascade: true,
  })
  @JoinColumn()
  public address: AddressEntity;

  @BeforeInsert()
  async beforeSaveFunction(): Promise<void> {
    try {
      if (this.provider !== Provider.LOCAL) {
        return;
      }
      // 프로필 이미지 자동생성
      // this.profileImg = gravatar.url(this.email, {
      //   s: '200',
      //   r: 'pg',
      //   d: 'mm',
      //   protocol: 'https',
      // });
      // 패스워드 암호화
      const saltValue = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, saltValue);
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException();
    }
  }

  async checkPassword(aPassword: string): Promise<boolean> {
    try {
      return await bcrypt.compare(aPassword, this.password);
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException();
    }
  }
}
