import { Inject } from '@nestjs/common';

export const InjectDrizzle = (configTag = 'default') => {
  return Inject(configTag);
};