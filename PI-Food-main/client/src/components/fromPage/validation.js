export default function Validation(newRecipe){ 
    let regex =  /^[a-zA-Z\s]*$/;
    let regex2 = new RegExp(
        '^(https?:\\/\\/)?' + // protocol
          '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
          '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
          '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
          '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
          '(\\#[-a-z\\d_]*)?$', // fragment locator
        'i'
    );
    let error = {}
    //validar name
    if (newRecipe.name === '') {
        error.name = 'Name is required'
    }

    if(regex.test(newRecipe.name)){
        error.name = 'The recipe name must not have any numerical characters'
    }

    //validar summary
    if (newRecipe.summary === '') {
        error.summary = 'Summary is required'
    }

    //validar healthscore
    if (newRecipe.healthscore === '') {
        error.healthscore = 'Healthscore is required'
    }

    //validar steps
    if (newRecipe.steps === '') {
        error.steps = 'Steps is required'
    }

    //validar image
    if (newRecipe.image === '') {
        error.image = 'Image is required'
    }

    if(!regex2.test(newRecipe.image)){
        error.image = 'You must provide an URL'
    }

    return error;
}