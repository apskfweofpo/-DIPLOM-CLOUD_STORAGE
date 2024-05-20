import { SetMetadata } from '@nestjs/common';
import { ROLES } from 'src/core/users/constrants/roles.enum';

export const HasRoles = (...roles: ROLES[]) => SetMetadata('roles', roles);
