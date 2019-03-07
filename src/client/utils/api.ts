import * as fetch from 'isomorphic-fetch';

export let AccessToken: string = localStorage.getItem('token') || null;
export let Author: any = {
    authorid: localStorage.getItem('authorid') || null,
    role: localStorage.getItem('role') || null
};

export const json = async <T = any>(uri: string, method: string = 'GET', body?: {}) => {

    let headers: any = {
        'Content-type': 'application/json'
    };

    if(AccessToken) {
        headers['Authorization'] = `Bearer ${AccessToken}`;
    }

    try {
        let result = await fetch(uri, {
            method,
            headers,
            body: JSON.stringify(body)
        });
        if(result.ok) {
            return <T>(await result.json());
        } else {
            return false;
        }
    } catch (e) {
        console.log(e);
        throw e;
    }

};

export const SetAccessToken = (token: string, author: {} = { authorid: undefined, role: 'guest'}) => {
    AccessToken = token;
    Author = author;

    localStorage.setItem('token', token);
    localStorage.setItem('authorid', Author.authorid);
    localStorage.setItem('role', Author.role);
};