import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Movie } from './entites/movie.entity';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepo: Repository<Movie>,
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
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
      return await this.movieRepo.save(movieData);
    }
  }
}
