import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Reviews } from './entities/reviews.entity';
import { Repository } from 'typeorm';
import { CreateReviewDto } from './dto/create-review.dto';
import { ProductsService } from '../products/products.service';
import { UpdateReviewDto } from './dto/update-review.dto';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Reviews)
    private readonly reviewRepo: Repository<Reviews>,
    private readonly productsService: ProductsService,
  ) {}

  // review 작성 api
  async createReview(createReviewDto: CreateReviewDto) {
    const product = await this.productsService.getProductById(
      createReviewDto.id,
    );
    const newReview = this.reviewRepo.create({
      product: product,
      title: createReviewDto.title,
      desc: createReviewDto.desc,
    });

    await this.reviewRepo.save(newReview);
    return newReview;
  }

  // review 전체 조회 api
  async getAllReviews() {
    return await this.reviewRepo.find();
  }

  // 특정 review 조회 api
  async getReview(id: string) {
    const review = await this.reviewRepo.findOneBy({ id });
    if (!review) {
      throw new NotFoundException('리뷰를 찾을 수 없습니다.');
    }
    return review;
  }

  // 특정 review 수정
  async updateReview(id: string, updateReviewDto: UpdateReviewDto) {
    await this.reviewRepo.update(id, updateReviewDto);
    const updateReview = await this.reviewRepo.findOneBy({ id });
    return updateReview;
  }

  async deleteReview(id: string) {
    await this.reviewRepo.delete(id);
    return 'Delete Success';
  }
}
