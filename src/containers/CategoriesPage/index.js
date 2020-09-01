import React, { useEffect, useState } from 'react';
import { Paper, Grid, Typography, Button, ButtonGroup } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import LoadingSpinner from "../../components/Common/LoadingSpinner"
import FollowCategoryCard from "../../components/Profile/CategoryCard/FollowCategoryCard";
import SubCategoryCard from "../../components/Profile/SubCategoriesCard"
import Colors from "../../static/_colors";
import { getAllCategories, getFollowedCategories } from "./action"
import { connect } from 'react-redux';

const CategoriesPage = (props) => {
    const classes = useStyles();
    const { user } = props;
    const [activeTab, setActiveTab] = useState(1);
    const [categories, setCategories] = useState([]);
    const [followedcategories, setFollowedCategories] = useState([]);
    const [subCategories , setSubCategories] = useState(null)
    const [isLoading, setIsLoading] = useState(true);
    console.log(props)

    useEffect(() => {
        if(!!user) {
            let params = {};
            params.user_id = user.id;
            getFollowedCategories(params)
            .then((res) => {
                console.log("res", res)
                setFollowedCategories(res.data.data ? res.data.data.user_followings.user_category_followings : []);
                setIsLoading(false)
            })
            .catch((err) => {
                console.log("err", err);
                setIsLoading(false)
            })
        }
    }, [user])

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

    const onTabChangeHandler = (selected) => {
        setActiveTab(selected);
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
                <ButtonGroup fullWidth size='large'>
                    <Button onClick={() => onTabChangeHandler(1)}>
                        <Typography className={activeTab === 1 ? classes.tabselected : classes.tab}>All</Typography>
                    </Button>
                    <Button onClick={() => onTabChangeHandler(2)}>
                        <Typography className={activeTab === 2 ? classes.tabselected : classes.tab}>Your</Typography>
                    </Button>
                </ButtonGroup>

                {activeTab === 1 ? (
                    <>
                    <Paper elevation={0} className={classes.container}>
                    <Grid container spacing={2}>
                        {categories.length > 0 ? categories.map((category, index) => {
                            return (
                                <Grid key={index} item lg={4} md={4} sm={6} xs={12}>
                                    <FollowCategoryCard category={category} showSubCategory={(value) => handleShowSubCategory(value)} hideFollowIcon={false} />
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
                )
                : (
                    <>
                    <Paper elevation={0} className={classes.container}>
                    <Grid container spacing={2}>
                        {followedcategories.length > 0 ? followedcategories.map((category, index) => {
                            return (
                                <Grid key={index} item lg={4} md={4} sm={6} xs={12}>
                                    <FollowCategoryCard category={category} showSubCategory={(value) => handleShowSubCategory(value)} hideFollowIcon={true} />
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
                )
                }
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

function mapStateToProps(state) {
    return {
        user: state.user,
    };
}
export default connect(mapStateToProps)(CategoriesPage);