import style from './homePage.module.css';
import React from 'react';
import Card from '../card/Card'
import Navs from '../navBar/Navbar'
import Pagination from '../pagination/Pagination';
import { Link } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { useEffect,useState } from 'react';
import {filterDiet,
    getAllRecipes,
    getDiets,
    orderAsc,  
    orderDesc,
    healtScAsc,
    healtScDes,
    getApi} from '../../redux/actions';


function Home(){

    const dispatch = useDispatch();
    const allRecipes = useSelector((state)=>state.recipes)
    const diets = useSelector((state) => state.diets)
    const [/* ordered */, setOrdered] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [elementsPerPage, /* setElementsPerPage */] = useState(9)
    
    const indexOfLastElement = currentPage * elementsPerPage
    const indexOfFirstElement = indexOfLastElement - elementsPerPage
    const currentElements = allRecipes.slice(indexOfFirstElement, indexOfLastElement)
    
    const paginationButtonNext = (e) => {
        e.preventDefault();
        setCurrentPage(currentPage + 1);
    };
    
    const paginationButtonPrev = (e) => {
        e.preventDefault();
        setCurrentPage(currentPage - 1);
    };

    const handlePageCh = (pageNumber) => {
        setCurrentPage(pageNumber)
    }
    
    useEffect(()=>{
        dispatch(getAllRecipes())
        dispatch(getDiets())
    },[dispatch])

    const handleDiets = (e) =>{
        e.preventDefault()
        dispatch(filterDiet(e.target.value))
        setOrdered(`order ${e.target.value}`)
    }
    
    const handleSort = (e) =>{
        e.preventDefault()
        e.target.value === 'Asc'
        ? dispatch(orderAsc(e.target.value))
        : dispatch(orderDesc(e.target.value))
        setOrdered(`order ${e.target.value}`)
    }

    const handleHealtSc = (e)=>{
        e.preventDefault()
        e.target.value === 'hsasc'
        ? dispatch(healtScAsc(e.target.value))
        : dispatch(healtScDes(e.target.value))
        setOrdered(`order ${e.target.value}`)
        console.log(healtScAsc());
    }
    
    const handleApi = (e) =>{
        e.preventDefault()
        dispatch(getApi(e.target.value))
        setOrdered(`order ${e.target.value}`)
    }

    return(
        <div className={style.homeContainer}>
            <Navs/>
            <div className={style.fromButton}>
                <Link to='/from'>
                    <button className={style.buttonsForm} >Form</button>
                </Link>
            </div>

            <div className={style.orderButtons}>
                <div className={style.alfabeticOrder}>
                    <button className={style.buttonsForm} value='Asc' onClick={(e)=> handleSort(e)}>A-Z</button>
                    <button className={style.buttonsForm} value='Desc' onClick={(e)=> handleSort(e)}>Z-A</button>
                </div>

                <div className={style.healtScOrder}>
                    <button className={style.buttonsForm} value='hsasc' onClick={(e)=> handleHealtSc(e)}>Healthier</button>
                    <button className={style.buttonsForm} value='hsdesc' onClick={(e)=> handleHealtSc(e)}>less Healthy</button>
                </div>

                <div className={style.dataApiorDb}>
                    <button className={style.buttonsForm} value='api' onClick={(e)=> handleApi(e)}>Api</button>
                    <button className={style.buttonsForm} value='db' onClick={(e)=> handleApi(e)}>Db</button>
                </div>
            </div>

            <div className={style.homeSelector}>
                <select
                onChange={(e)=> handleDiets(e)}
                className='dietas' >
                    <option value='All'>All recipes</option>
                    {
                        diets?.map((e, index)=>(
                            <option value={e} key={index}>
                                {e}
                            </option>
                        ))
                    }
                </select>    
            </div>

            <div className={style.paginationHome}>
                <div className={style.buttonPrevHome}>
                    {
                        currentPage === 1 ? (<span></span>) : (<button className='' onClick={e=> paginationButtonPrev(e)}>Prev</button>)
                    }
                </div>

                <div>
                    <Pagination
                    currentPage={currentPage}
                    elementsPerPage={elementsPerPage}
                    totalElements={allRecipes.length}
                    onPageChange={handlePageCh}
                    />
                </div>
                
                <div>
                    {
                        Math.ceil(allRecipes.length / elementsPerPage) > currentPage ? (
                            <button className='prevbuton' onClick={e => paginationButtonNext(e)}>next</button>
                        ):(<span></span>)
                        
                    }
                </div>
            </div>

            <div className={style.cardsHome}>
                {
                    currentElements?.length >= 1 ? (
                        allRecipes.length=== 0 ? (
                            <h1>recipe not found</h1>
                        ) : (
                            currentElements.map((e, index) =>(
                                <Card
                                    key={index}
                                    id={e.id}
                                    name={e.name}
                                    image={e.image}
                                    diets={e.diets}
                                    healthscore={e.healthscore}
                                />
                            ))
                        )
                    ): undefined
                }
            </div>

        </div>
    )

    


}

export default Home