import {HttpException, HttpService, HttpStatus, Injectable} from '@nestjs/common';
import {Observable} from "rxjs";
import {AxiosResponse} from "axios";

@Injectable()
export class AddressService {
    private base = "https://api.mapbox.com/geocoding/v5/mapbox.places/";
    
    constructor(private readonly httpService: HttpService) {}
    
    find(address: string): Promise<AxiosResponse<any> | void> {
        const formattedAddress = encodeURI(address)
        const accessToken = "pk.eyJ1IjoiY2FtaWxvbHVjZW5hODgiLCJhIjoiY2ttOW53bzA1MHBwYjJ2cGh5bGlzZTg3NyJ9.dkqgRDzzVGmkKBXg0p-YlA"
        const url = this.base + formattedAddress + '.json?access_token=' + accessToken
        return this.httpService.get(url).toPromise().then(response => {
            return response.data.features[0]
        }).catch(err => {
            throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
        });
    }
}
