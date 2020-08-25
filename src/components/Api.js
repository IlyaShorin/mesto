export class Api{
  constructor({baseUrl, headers}){
    this._baseUrl = baseUrl;
    this._headers = headers;
  }
  getInitialCards(){
    return fetch(`${this._baseUrl}/cards`,{
      headers: this._headers
    })
    .then(res=> res.json())
  }
  getUserInfo(){
    return fetch(`${this._baseUrl}/users/me`,{
      headers:this._headers
    })
    .then(res=> res.json())
  }
  updateUserInfo(obj){
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      body: JSON.stringify({
        name: obj.name,
        about: obj.title
      }),
      headers:this._headers
    }).then(res=> res.json());
  }
  addNewCard(obj){
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      body: JSON.stringify({
        name: obj.name,
        link: obj.link
      }),
      headers:this._headers
    }).then(res => res.json())
  }
  likeCard(id){
    return fetch(`${this._baseUrl}/cards/likes/${id}`, {
      method: 'PUT',
      headers:this._headers
    }).then(res => res.json())
  }
  unLikeCard(id){
    return fetch(`${this._baseUrl}/cards/likes/${id}`, {
      method: 'DELETE',
      headers:this._headers
    }).then(res => res.json())
  }
  deleteCard(id){
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers:this._headers
    }).then(res => res.json())
  }
  updateAvatar(obj){
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      body: JSON.stringify({
        avatar: obj,
      }),
      headers:this._headers
    }).then(res=> res.json());
  }
}

