import React , {useState , useEffect} from "react";
import { Typography, Grid } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import CategoryCard from "../CategoryCard";
import { connect } from 'react-redux';
import SubCategoryCard from '../SubCategoriesCard'
import {getUserCategories} from './actions'
import LoadingSpinner from "../../Common/LoadingSpinner"

const Categories = [ 
{
    name : 'Sports',
    count : 10,
    subcategories : [{name : 'Volley Ball' , imageUrl : '' , count : 10} , {name : 'Basket Ball' , imageUrl : '' , count : 10} , {name : 'Foot Ball' , imageUrl : '' , count : 10} , {name : 'Volley Ball' , imageUrl : '' , count : 10}],
}, 
{
    name : 'Art',
    count : 20,
    subcategories : [{name : 'Music' , imageUrl : '' , count : 10} , {name : 'Volley Ball' , imageUrl : '' , count : 10} , {name : 'Volley Ball' , imageUrl : '' , count : 10} , {name : 'Volley Ball' , imageUrl : '' , count : 10}],
}, 
{
    name : 'Photography',
    count : 15,
    subcategories : [{name : 'EventShoots' , imageUrl : '' , count : 10} , {name : 'Volley Ball' , imageUrl : '' , count : 10} , {name : 'Volley Ball' , imageUrl : '' , count : 10} , {name : 'Volley Ball' , imageUrl : '' , count : 10}],
}, 
{
    name : 'Fitnes',
    count : 30,
    subcategories : [{name : 'Gym' , imageUrl : '' , count : 10} , {name : 'Volley Ball' , imageUrl : '' , count : 10} , {name : 'Volley Ball' , imageUrl : '' , count : 10} , {name : 'Volley Ball' , imageUrl : '' , count : 10}],
}, 

]

const FooterLinks = (props) => {
    const { user} = props;
    const classes = useStyles();
    const [isLoading, setIsLoading] = useState()
    const [categories , setCategories] = useState()
    const [selectedCategory , setSelectedCategory] = useState(null)
    const [subCategories , setSubCategories] = useState(null)

    useEffect(() =>{
        if(!!user){
            let params = {};
            params.user_id = user.id;
            setIsLoading(true);
            getUserCategories(params)
            .then((res) => {
                setIsLoading(false);
                if(res.data && res.data.data){
                setCategories(res.data.data.user_followings ? res.data.data.user_followings.user_category_followings : [])
                }
            })
            .catch((err) =>{ 
                setIsLoading(false);
                console.log(err)
            })
        }
    } , [user])

    const handleShowSubCategory = (value) => {
        console.log('SubCategory value' , value);
        setSubCategories(value)
    }

    return (
        <>
        {
            isLoading && (
                <LoadingSpinner
                    loading={isLoading}
                    text="Fetching Categories..."
                    size="large"
                />
            )
        }
            <Grid container spacing={2} className='space-4'>
                {!!categories && categories.length > 0 && (
                    categories.map((category, index) => {
                    return (
                        <Grid key={index} item lg={4} md={4} sm={6} xs={12}>
                            <CategoryCard
                                isSelected={selectedCategory === null ? true : selectedCategory === category.name ? true :  false}
                                category = {category}
                                showSubCategory = {(value) => handleShowSubCategory(value)}
                                selectedCategoryCallback={(value) => setSelectedCategory(value)}
                            />
                        </Grid>
                    )
                })
            )}
            </Grid>
            {   subCategories && subCategories.length > 0 ?
                <Grid container className={classes.subCategoryMain}>
                {subCategories.map((subCategory, index) => {
                    return (
                        <Grid key={index} item lg={4} md={4} sm={6} xs={12}>
                            <SubCategoryCard
                                isSelected={true}
                                subCategory = {subCategory}
                            />
                        </Grid>
                    )
                })}
            </Grid> :
            !!subCategories ?
            <Grid container spacing={2} className={classes.subCategoryMain}>
                <Typography className={classes.center}>No sub categories availible </Typography>
            </Grid>
            :
            null
            }

            <Grid className={classes.moreText}>
                <Typography variant="h5" gutterBottom>More Lists!</Typography>
                <Typography variant="body1" gutterBottom>Create Lists, Challenges and share your opnion on existing lists to add more categories</Typography>
            </Grid>
        </>
    )

}

const useStyles = makeStyles((theme) => ({
    moreText: {
        margin: theme.spacing(6, 0, 6, 0),
        textAlign: 'center'
    },
    subCategoryMain : {
        border : '1px solid rgba(38, 38, 38, 0.12)',
        padding: 10,
        borderRadius: '10px',
    },
    center : {
        textAlign : 'center',
    },
    row : {
        display : 'flex',
        textAlign : 'center',
        justifyContent: 'middle',
        padding : '2rem',
        fontSize : '1rem',
        fontWeight : '600',
        
    },
})
)


function mapStateToProps(state) {
    return {
        user: state.user,
    };
}
export default connect(mapStateToProps)(FooterLinks);

// export default connect(FooterLinks);