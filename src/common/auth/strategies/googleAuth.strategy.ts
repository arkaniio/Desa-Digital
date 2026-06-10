import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, StrategyOptions } from 'passport-google-oauth20';
import { AuthService } from '../../../auth/auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(
    Strategy,
    'google',
) {
    constructor(private authService: AuthService) {

        let google_client_id: string | undefined = process.env.GOOGLE_CLIENT_ID
        let google_client_secret: string | undefined = process.env.GOOGLE_SECRET_KEY

        let google_client_id_extract: string = google_client_id ?? ""
        let google_client_secret_extract: string = google_client_secret ?? ""

        const options: StrategyOptions = {
            clientID: google_client_id_extract,
            clientSecret: google_client_secret_extract,
            callbackURL:
                'http://localhost:3000/api/auth/google/callback',
            scope: ['email', 'profile'],
        }

        super(options)
    }

    async validate(
        accessToken: string,
        refreshToken: string,
        profile: any,
    ): Promise<any> {

        return this.authService.validateOrCreate(profile)

    }
}