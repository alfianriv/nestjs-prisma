import { Injectable } from '@nestjs/common';

@Injectable()
export class HandleService {
    response(code: Number, message: String,  data: any){
        return {
            meta:{
                code: code,
                msg: message
            },
            data
        }    
    }
}
