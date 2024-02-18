import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Movie } from './entites/movie.entity';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { Cron, CronExpression } from '@nestjs/schedule';
import { EmailService } from '../email/email.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepo: Repository<Movie>,
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
    private readonly emailService: EmailService,
    @Inject(CACHE_MANAGER) private cacheManger: Cache,
  ) {}

  async registerMovies() {
    const { data, status } = await this.httpService
      .get(this.configService.get('TMDB_URL'), {
        headers: {
          Authorization: this.configService.get('TMDB_KEY'),
        },
      })
      .toPromise();
    if (status === 200) {
      const datas = data.results;
      const movieData = [];
      datas?.map((data) =>
        movieData.push({
          language: data['original_language'],
          title: data['title'],
          overview: data['overview'],
          popularity: data['popularity'],
          poster: data['poster_path'],
          release: data['release_date'],
        }),
      );
      await this.cacheManger.del('movies');
      return await this.movieRepo.save(movieData);
    }
  }

  async getAllMovies() {
    // const redisData = await this.cacheManger.get('movies');
    // if (redisData) {
    //   console.log(redisData.length);
    //   return redisData;
    // }
    console.log('--------------------');
    const movies = await this.movieRepo.find();
    await this.cacheManger.set('movies', movies);

    console.log(movies.length);
    return movies;
  }

  // @Cron(CronExpression.EVERY_10_SECONDS)
  // async handleCron() {
  //   console.log('++++++++++++++++++');
  //   await this.emailService.sendMail({
  //     to: 'wltn203@naver.com',
  //     subject: '스케줄링 인증',
  //     text: '스케줄링 인증',
  //   });
  // }
}
