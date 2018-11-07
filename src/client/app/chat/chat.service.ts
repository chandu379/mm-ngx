import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Headers, Http, Response, RequestOptions,ResponseContentType } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { UserDetails } from '../shared/database/user-details';
import { Message } from '../shared/database/message';
import { Group } from '../shared/database/group';
import { DoctorDetails } from '../shared/database/doctor-details';
import { SecurityService } from '../shared/services/security.service';

@Injectable()
export class ChatService {
    private headers = new Headers();
    private options = new RequestOptions({ headers: this.headers }); // Create a request option
    private url = 'http://35.226.156.161:3000';
    private user: UserDetails;
    private group: Group;

    constructor(private router: Router, private http: Http, private securityService: SecurityService) {
    }

    /** GET users from the server */
    getUsers(): Promise<UserDetails[]> {
        const uri = `${this.url}/users`;
        let headers = new Headers();
        headers.append('Authorization', `${this.securityService.key} ${this.securityService.getToken()}`);
        return this.http.get(uri, {headers: headers})
            .toPromise()
            .then(res => res.json())
            .catch(this.handleError);
    }

    /**
     * GET userById from the server
     */
    getUserById(id: number): Observable<UserDetails> {
        const uri = `${this.url}/users/${id}`;
        let headers = new Headers();
        headers.append('Authorization', `${this.securityService.key} ${this.securityService.getToken()}`);
        return this.http.get(uri, {headers: headers})
            .map(res => res.json() as UserDetails)
            .catch(this.handleError);
    }

    /** GET groups from the server */
    getGroups(userId: number): Observable<Group[]> {
        let headers = new Headers();
        headers.append('Authorization', `${this.securityService.key} ${this.securityService.getToken()}`);
        const uri = `${this.url}/groups/users/${userId}`;
        return this.http.get(uri, {headers: headers})
            .map(res => res.json())
            .catch(this.handleError);
    }

    setGroup(group: any) {
        this.group = group;
    }

    getGroup() {
        return this.group;
    }

    /** GET messages from the server */
    getMessages(userId: number, groupId: number, offset: number, size: number): Observable<Message[]> {
        const uri = `${this.url}/messages/users/${userId}/groups/${groupId}?offset=${offset}&size=${size}`;
        let headers = new Headers();
        headers.append('Authorization', `${this.securityService.key} ${this.securityService.getToken()}`);
        return this.http.get(uri, {headers: headers})
            .map(res => res.json())
            .catch(this.handleError);
    }

    /**
     * create new group using bot or doctor
     */
    createGroupAuto(newGroup: Group, receiverId: number): Observable<Group> {
        const url = `${this.url}/groups/${receiverId}`;
        let headers = new Headers();
        headers.append('Authorization', `${this.securityService.key} ${this.securityService.getToken()}`);
        return this.http
            .post(url, newGroup, {headers: headers})
            .map(response => response.json())
            .catch(this.handleError);
    }

    /**
     * create new group manually using bot or doctor
     */
    createGroupManual(newGroup: Group, receiverId: number, doctorId: number): Observable<Group> {
        const url = `${this.url}/groups/${receiverId}/${doctorId}`;
        let headers = new Headers();
        headers.append('Authorization', `${this.securityService.key} ${this.securityService.getToken()}`);
        return this.http
            .post(url, newGroup, {headers: headers})
            .map(response => response.json())
            .catch(this.handleError);
    }

    /**
     * get doctors
     */
    getDoctors(receiverId: number): Observable<DoctorDetails[]> {
        const url = `${this.url}/doctors`;
        let headers = new Headers();
        headers.append('Authorization', `${this.securityService.key} ${this.securityService.getToken()}`);
        return this.http
            .get(url, {headers: headers})
            .map(res => res.json())
            .catch(this.handleError);
    }

    uploadFile(files: FileList): Observable<any> {
        const uri = `${this.url}/file`;
        let headers = new Headers();
        headers.append('Authorization', `${this.securityService.key} ${this.securityService.getToken()}`);
        let formData = new FormData();
        Array.from(files).forEach(f => {
            formData.append('file', f);
        });
        return this.http.post(uri, formData, {headers: headers})
            .map((res: Response) => res)
            .catch(this.handleError);
    }

    downloadFile(file: string): Observable<any> {
        const uri = `${this.url}/file/${file}`;
        let headers = new Headers();
        headers.append('Authorization', `${this.securityService.key} ${this.securityService.getToken()}`);
        return this.http.get(uri, {
            responseType: ResponseContentType.Blob,
            headers: headers
        })
            .map((res: Response) => {
                const blob = new Blob([res.blob()]);
                const reader = new FileReader();
                reader.readAsDataURL(blob);
                return reader;
            })
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<UserDetails> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }

}

