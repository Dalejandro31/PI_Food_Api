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
    const [elementsPerPage, /* setElementsPerPage */] = useState(12)
    const [checkboxes, setCheckboxes] = useState({
        alphabetical: false,
        reverseAlphabetical: false,
        healthier: false,
        lessHealthy: false,
        api: false,
        db: false,
      });
    
    const indexOfLastElement = currentPage * elementsPerPage
    const indexOfFirstElement = indexOfLastElement - elementsPerPage
    const currentElements = allRecipes.slice(indexOfFirstElement, indexOfLastElement)

    const updateCheckbox = (name, value) => {
        setCheckboxes((prevCheckboxes) => ({
          ...prevCheckboxes,
          [name]: value,
        }));
      };
    
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
    useEffect(() => {
        // Sorting A-Z or Z-A
        if (checkboxes.alphabetical) {
          dispatch(orderAsc("Asc"));
        } else if (checkboxes.reverseAlphabetical) {
          dispatch(orderDesc("Desc"));
        }
    
        // Sorting healthier or less healthy
        if (checkboxes.healthier) {
          dispatch(healtScAsc("hsasc"));
        } else if (checkboxes.lessHealthy) {
          dispatch(healtScDes("hsdesc"));
        }
    
        // Getting data from API or DB
        if (checkboxes.api) {
          dispatch(getApi("api"));
        } else if (checkboxes.db) {
          dispatch(getApi("db"));
        }
      }, [dispatch, checkboxes]);

    
    useEffect(()=>{
        dispatch(getAllRecipes())
        dispatch(getDiets())
    },[dispatch])

    const handleDiets = (e) =>{
        e.preventDefault()
        dispatch(filterDiet(e.target.value))
        setOrdered(`order ${e.target.value}`)
    }
    
    // const handleSort = (e) =>{
    //     e.preventDefault()
    //     e.target.value === 'Asc'
    //     ? dispatch(orderAsc(e.target.value))
    //     : dispatch(orderDesc(e.target.value))
    //     setOrdered(`order ${e.target.value}`)
    // }

    // const handleHealtSc = (e)=>{
    //     e.preventDefault()
    //     e.target.value === 'hsasc'
    //     ? dispatch(healtScAsc(e.target.value))
    //     : dispatch(healtScDes(e.target.value))
    //     setOrdered(`order ${e.target.value}`)
    //     console.log(healtScAsc());
    // }
    
    // const handleApi = (e) =>{
    //     e.preventDefault()
    //     dispatch(getApi(e.target.value))
    //     setOrdered(`order ${e.target.value}`)
    // }

    return(
        <div className={style.homeContainer}>
            <Navs/>

            <div className={style.homeSelector}>
                <select
                onChange={(e)=> handleDiets(e)}
                className={style.selector} >
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
                    

            <div className={style.homeContainer2}>
                <div className={style.sideBar}>
                    <h2> Organize Your Recipes </h2>
                    <div className={style.alphabeticOrder}>
                        <label className={style.labelOrder}>
                        <input
                            type="checkbox"
                            checked={checkboxes.alphabetical}
                            onChange={(e) => updateCheckbox("alphabetical", e.target.checked)}
                        />
                            A-Z
                        </label>
                        
                        <label className={style.labelOrder}>
                        <input
                            type="checkbox"
                            checked={checkboxes.reverseAlphabetical}
                            onChange={(e) => updateCheckbox("reverseAlphabetical", e.target.checked)}
                        />
                            Z-A
                        </label>
                    </div>
                    <div className={style.alphabeticOrder}>
                        <label className={style.labelOrder}>
                        <input
                            type="checkbox"
                            checked={checkboxes.healthier}
                            onChange={(e) => updateCheckbox("healthier", e.target.checked)}
                        />
                            Healthier
                        </label>
                        <label className={style.labelOrder}>
                        <input
                            type="checkbox"
                            checked={checkboxes.lessHealthy}
                            onChange={(e) => updateCheckbox("lessHealthy", e.target.checked)}
                        />
                            Less Healthy
                        </label>
                    </div>
                    {/* <div className={style.alphabeticOrder}>
                        <label className={style.labelOrder}>
                        <input
                            type="checkbox"
                            checked={checkboxes.api}
                            onChange={(e) => updateCheckbox("api", e.target.checked)}
                        />
                            API
                        </label>
                        <label className={style.labelOrder}>
                        <input
                            type="checkbox"
                            checked={checkboxes.db}
                            onChange={(e) => updateCheckbox("db", e.target.checked)}
                        />
                            DB
                        </label>
                    </div> */}
                </div>
                <div className={style.divCards}>
                    
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
                
                
            </div>
            <div className={style.paginationHome}>
                    <div className={style.buttonPrevHome}>
                        {
                            currentPage === 1 ? (<span></span>) : (<button className={style.buttonPagination} onClick={e=> paginationButtonPrev(e)}>  {"<<"}  </button>)
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
                                <button className={style.buttonPagination} onClick={e => paginationButtonNext(e)}> {">>"} </button>
                            ):(<span></span>)
                            
                        }
                    </div>
                </div>
        </div>
    )
}

export default Home