import {Injectable} from '@angular/core';
import {Http, Request, Response, Headers, RequestOptionsArgs, RequestMethod, URLSearchParams} from "@angular/http";
import {Router} from '@angular/router';
import {RequestArgs} from "@angular/http/src/interfaces";

@Injectable()
export class HttpRestApiHelper {
    private _requestOptionsArgs: RequestOptionsArgs = {};

    constructor(private _http: Http, private router: Router) {}

     get(url: string, args?: RequestOptionsArgs | Headers, requestBody?: any): Promise<any> {
        this.prepareRequestOptionsArgs(args);

        this._requestOptionsArgs.search = requestBody ? this.appendURLSearchParams(requestBody) : null;

        return this._http.get(url, this._requestOptionsArgs).toPromise()
            .then((res: Response) => this.extractData(res))
            .catch((err: Response) => console.log("error :" + err));
    }

      appendURLSearchParams(requestBody: any): URLSearchParams {
        let searparams: URLSearchParams = new URLSearchParams();
        for (var property in requestBody) {
            if (requestBody.hasOwnProperty(property)) {
                searparams.set(property, requestBody[property]);
            }
        }
        return searparams;
    }

      private prepareRequestOptionsArgs(args?: RequestOptionsArgs | Headers) {
        this._requestOptionsArgs = this.createRequestOptionsArgs();
        if (args) {
            if (args instanceof Headers) {
                this.mergerheaders(args);
            } else {
                this._requestOptionsArgs = args;
            }
        }
    }

    private mergerheaders(headers: Headers) {
        headers.keys().forEach(header => {
            this._requestOptionsArgs.headers.set(header, headers.get(header));
        });
    }

      private createRequestOptionsArgs(): RequestOptionsArgs {
        let requestOptionsArgs: RequestOptionsArgs = {};

        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        headers.append('Accept', 'application/json');

        requestOptionsArgs.headers = headers;
        return requestOptionsArgs;
    }

    private extractData(res: Response) {
        return res.text() === "" ? res : res.json();
    }
}