import React, { useEffect, useState } from 'react';
import { Paper, Grid, Typography, Button, ButtonGroup } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import LoadingSpinner from "../../components/Common/LoadingSpinner"
import FollowCategoryCard from "../../components/Profile/CategoryCard/FollowCategoryCard";
import SubCategoryCard from "../../components/Profile/SubCategoriesCard"
import Colors from "../../static/_colors";
import { getAllCategories } from "./action"

const CategoriesPage = () => {
    const classes = useStyles();
    const [categories, setCategories] = useState([]);
    const [subCategories , setSubCategories] = useState(null)
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getAllCategories()
            .then((res) => {
                console.log("res", res)
                setCategories(res.data.data ? res.data.data.all_categories : []);
                setIsLoading(false)
            })
            .catch((err) => {
                console.log("err", err);
                setIsLoading(false)
            })
    }, [])

    const handleShowSubCategory = (value) => {
        console.log('SubCategory value' , value);
        setSubCategories(value)
    }

    if (isLoading) {
        return (
            <LoadingSpinner
                loading={isLoading}
                text="Fetching Categories..."
                size="large"
            />
        )
    } else {
        return (
            <>
                <Paper elevation={0} className={classes.container}>
                    <Grid container spacing={2}>
                        {categories.length > 0 ? categories.map((category, index) => {
                            return (
                                <Grid key={index} item lg={4} md={4} sm={6} xs={12}>
                                    <FollowCategoryCard category={category} showSubCategory={(value) => handleShowSubCategory(value)} />
                                </Grid>
                            )
                        })
                            :
                            <Typography variant="h5">No Catogories Found!</Typography>
                        }
                    </Grid>
                </Paper>

                <Paper elevation={0} className={classes.container}>
                {subCategories && subCategories.length > 0 ?
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
                    </Grid>
                    :
                    <Typography className={classes.center}>No sub categories availible </Typography>
                }
                </Paper>
            </>
        );
    }
}

const useStyles = makeStyles((theme) => ({
    container: {
        background: Colors.white,
        border: '1px solid rgba(38, 38, 38, 0.12)',
        borderRadius: 8,
        margin: '8px 0 8px 0',
        padding: "1em"
    },
    seperator: {
        // backgroundColor: 'rgba(38, 38, 38, 0.12)',
        width: '100%',
        height: 1,
        margin: "1em 0 1em"
    },
    buttons: {
        margin: theme.spacing(1, 0, 1, 0),
        fontSize: '1rem',
        borderRadius: '8px 0px 0px 8px',
    },
    tabSelected: {
        fontWeight: 400
    },
    tabselected: {
        fontWeight: 600
    },
})
)

export default CategoriesPage;
