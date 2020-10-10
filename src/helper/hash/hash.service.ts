import { Injectable } from '@nestjs/common';
import {hashSync, compareSync} from 'bcrypt'

@Injectable()
export class HashService {
    crypt(password){
        return hashSync(password, 10)
    }

    compare(password, passwordHashed){
        return compareSync(password, passwordHashed)
    }
}
