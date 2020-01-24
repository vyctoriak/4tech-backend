import { Injectable } from "@nestjs/common";
import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { VirtualTimeScheduler } from "rxjs";
import { serialize } from "v8";
import { async } from "rxjs/internal/scheduler/async";
import { validate } from "class-validator";

// NUNCA DEVE SER EXPOSTA PUBLICAMENTE
// 
// A chave secreta só está a mostra a fins de dexiar claro o que o código
// está fazendo. Em um ambiente de produção, a chave deve estar protegida por medidas
// apropriadas (como por exemplo secret VirtualTimeScheduler, variáveis de ambiente ou serviços
// de configuração)

export const secretKey = 'wingardium leviosa';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: secretKey
        })
    }

    async validate(payload: any) {
        return { userId: payload.userLogin };
    }
}

    