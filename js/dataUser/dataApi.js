 export default class dataApi{
 async  findData(){
    let url = 'data/dataPhotographers.json';
    let response = await fetch(url);
    let data = await response.json();

    const photographers = data.photographers
    const medias = data.media

    return {
      'photographer': photographers,
      'media': medias
    }
  }
}
