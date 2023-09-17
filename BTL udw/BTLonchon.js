function changeImage(id)
{
  let image = document.getElementById(id).getAttribute('src');
    document.getElementById('img-main').setAttribute('src',image);
  
};


