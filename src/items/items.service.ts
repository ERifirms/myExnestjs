import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from './item.entity';
import { Repository } from 'typeorm';
import { CreateItemDto } from './dtos/create-item.dto';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item) private itemsRepository: Repository<Item>,
  ) {}

  find() {
    return this.itemsRepository.find();
  }

  create(item: CreateItemDto) {
    const newItem = this.itemsRepository.create(item);
    return this.itemsRepository.save(newItem);
  }

  findOneBy(id: number) {
    return this.itemsRepository.findOneBy({ id });
  }

  async update(id: number, attrs: Partial<Item>) {
    const user = await this.findOneBy(id);
    if (!user) {
      throw new Error('User Not Found');
    }

    Object.assign(user, attrs);
    return this.itemsRepository.save(user);
  }

  async remove(id: number) {
    const user = await this.findOneBy(id);
    if (!user) {
      throw new Error('User not found');
    }

    return this.itemsRepository.remove(user);
  }
}
