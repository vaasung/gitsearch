import { Injectable }  from '@angular/core'
import { Http, Headers }  from '@angular/http'
import 'rxjs/add/operator/map'

import { environment }  from '../../environments/environment'

@Injectable()
export class GitService {

    private query: string
    private API_URL: string = environment.GIT_API_URL
    private CLIENT_ID: string = environment.GIT_CLIENT_ID
    private CLIENT_SEC: string = environment.GIT_CLIENT_SECRET
    // private GIT_USER_URL: string = this.API_URL + this.API_KEY + '&q='
    private GIT_USER_URL: string = this.API_URL

    constructor( private _http: Http ){}

    getGitUser( query ){
        return this._http.get( this.GIT_USER_URL + query + '?client_id=' + this.CLIENT_ID + '&client_secret=' + this.CLIENT_SEC ).map( res => res.json() )
        // return this._http.get( this.GIT_USER_URL + query + this.perPage  ).map( res => res.json() )
    }
    getGitUserRepo( url ){
        return this._http.get( url ).map( res => res.json() )
    }
    getGitLan( url ){
        return this._http.get( url ).map( res => res.json() )
    }

}