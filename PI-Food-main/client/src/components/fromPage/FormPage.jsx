import React, { useEffect, useState } from 'react'
import { getDiets } from '../../redux/actions'
import { useDispatch, useSelector } from 'react-redux'
import validation from './validation'
import { Link } from 'react-router-dom'
import axios from 'axios'
import style from './formPage.module.css'




export default function Forms() {

const diets = useSelector(state => state.diets)
const dispatch = useDispatch()

useEffect(()=>{
  dispatch(getDiets())
},[dispatch])

const [newRecipe, setNewRecipe] = useState({
  name: '',
  summary: '',
  healthscore: '',
  steps: '',
  image: '',
  diets: []
})
    
const [error, setError] = useState({
  name: '',
  summary: '',
  healthscore: '',
  steps: '',
  image: '',
  diets
})

const handleChange = (e)=>{
  setNewRecipe({
    ...newRecipe,
    [e.target.name] : e.target.value,
  })
  setError(validation({
    ...newRecipe,
    [e.target.name] : e.target.value
  }))
}

const isFieldEmpty = (fieldName) => {
  return newRecipe[fieldName].trim() === ''; 
}

const handleChecked = (e) =>{
  if (e.target.checked){
    setNewRecipe({
      ...newRecipe,
      diets : [...newRecipe.diets, e.target.value]
    })}
  else{
    setNewRecipe({
      ...newRecipe,
      diets: newRecipe.diets.filter(x => x !== e.target.value)
    })
  }
}

const handleSubmit = (e) =>{
  e.preventDefault()
  axios.post('http://localhost:3001/recipes', newRecipe)
  .then(res => alert('Recipe created succesfully!'))
  .catch(err => alert("Recipe not crated, try again"))
  setNewRecipe({
    name: '',
    summary: '',
    healthscore: '',
    steps: '',
    image: '',
    diets: []
  })
}

  return (

    <div className={style.divBody}>
      
      <div className={style.divForms}>
          <h1>CREATE YOUR RECIPE</h1>
        
          <div className={style.divInputname}>
            <label className={style.labelForms} htmlFor="name">Name: </label>
            <input className={`${style.inputForms} ${isFieldEmpty('name') && style.inputFormsEmpty}`} value={newRecipe.name} type="text" name='name' onChange={handleChange} />
          </div>
          <div>
            {error.name && <span className={style.spanInputError}>{error.name}</span>}
          </div>

          <div className={style.divInputForms}>
            <label className={style.labelForms} htmlFor="summary">Summary: </label>
            <input className={`${style.inputForms} ${isFieldEmpty('name') && style.inputFormsEmpty}`} value={newRecipe.summary} type="text" name='summary' onChange={handleChange}/>
          </div>
          <div>
            {error.summary && <span className={style.spanInputError}>{error.summary}</span>}
          </div>

          <div className={style.divInputForms}>
            <label className={style.labelForms} htmlFor="healthscore">Healthscore: </label>
            <input className={`${style.inputForms} ${isFieldEmpty('name') && style.inputFormsEmpty}`} value={newRecipe.healthscore} type="number" name='healthscore' onChange={handleChange}/>
          </div>
          <div>
            {error.healthscore && <span className={style.spanInputError}>{error.healthscore}</span>}
          </div>

          <div className={style.divInputForms}>
            <label className={style.labelForms} htmlFor="steps">Steps: </label>
            <input className={`${style.inputForms} ${isFieldEmpty('name') && style.inputFormsEmpty}`} value={newRecipe.steps} type="text" name='steps' onChange={handleChange}/>
          </div>
          <div>
            {error.steps && <span className={style.spanInputError}>{error.steps}</span>}
          </div>

          <div className={style.divInputForms}>
            <label className={style.labelForms} htmlFor="image">Image: </label>
            <input className={`${style.inputForms} ${isFieldEmpty('name') && style.inputFormsEmpty}`} value={newRecipe.image} type="text" name='image' onChange={handleChange}/>
          </div>
          <div>
            {error.image && <span className={style.spanInputError}>{error.image}</span>}
          </div>
        

        <h2 className={style.h2Forms}>Choose your diets..</h2>
          <div className={style.divmappingAndOthersForms}>
            <div className={style.divMappingDietsForms}>
              {
                diets.length >= 1 ?
                diets?.map((elem, index) =>
                (
                  <label htmlFor= 'diets' key={index}>
                      <input type= 'checkbox' name= 'diets' value={elem} key= {index} onChange={handleChecked} />
                      {elem}
                    </label>
                  ))
                  : undefined
              }
            </div>
              {newRecipe.diets.length === 0 && (<span className={style.spanInputError}>Select at least one diet</span>)}


            <div className={style.divButtonAndImgForms}>
              {
                newRecipe.name !== '' && newRecipe.summary !== '' && newRecipe.healthscore !== '' && newRecipe.image !== '' && newRecipe.image !== '' && newRecipe.diets.length >= 1
                ? <button className={style.buttonSubmitForm} type='submit' onClick={(e) => handleSubmit(e)}>Submit</button> 
                :<button disabled className={style.buttonSubmitForm}>Submit</button> 
              }
            </div>

          </div>
            <div className={style.divImgFormsToHome}> 
              <Link to='/home'><button className={style.buttonSubmitForm}>HOME</button></Link> 
            </div>

      </div>

          

    </div>
  )
}